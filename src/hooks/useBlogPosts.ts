import { useEffect, useMemo, useState } from 'react'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  readingTimeMinutes: number
  tags: string[]
  url?: string
  coverImage?: string
  source: 'google-news' | 'hacker-news' | 'fallback'
}

interface GoogleNewsItem {
  title: string
  link: string
  description: string
  pubDate: string
  image?: string
}

interface GoogleNewsResponse {
  items: GoogleNewsItem[]
}

interface HackerNewsItem {
  id: number
  title: string
  time: number
  url?: string
  by?: string
}

const GOOGLE_NEWS_ENDPOINT = import.meta.env.VITE_GOOGLE_NEWS_ENDPOINT?.trim() || '/api/google-news-rss'
const HN_NEW_STORIES_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/newstories.json'
const HN_ITEM_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/item'
const DEFAULT_GOOGLE_QUERY = 'tecnologia OR desenvolvimento OR software OR IA OR programacao'
const DEFAULT_GOOGLE_LIMIT = 14
const DEFAULT_HN_LIMIT = 12
const BLOG_POST_CACHE_KEY = 'blog-post-cache-v1'

const sanitizeExcerpt = (value: string) => value.replace(/\s+/g, ' ').trim()
const normalizeTag = (value: string) => value.trim().toLowerCase()

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const decodeEntities = (value: string) => {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

const slugFromHost = (urlValue: string) => {
  try {
    const host = new URL(urlValue).hostname.replace(/^www\./, '')
    return host.split('.')[0]
  } catch {
    return 'news'
  }
}

const buildHostFavicon = (urlValue?: string) => {
  if (!urlValue) {
    return undefined
  }

  try {
    const host = new URL(urlValue).hostname
    return `https://www.google.com/s2/favicons?sz=256&domain=${host}`
  } catch {
    return undefined
  }
}

const safeLimit = (value: string | undefined, fallback: number) => {
  const parsedValue = Number(value)
  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallback
  }

  return Math.min(30, Math.max(3, Math.floor(parsedValue)))
}

export const useBlogPosts = () => {
  const googleQuery = import.meta.env.VITE_GOOGLE_NEWS_QUERY?.trim() || DEFAULT_GOOGLE_QUERY
  const googleLimit = safeLimit(import.meta.env.VITE_GOOGLE_NEWS_LIMIT, DEFAULT_GOOGLE_LIMIT)
  const hackerNewsLimit = safeLimit(import.meta.env.VITE_HN_LIMIT, DEFAULT_HN_LIMIT)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const readCachedPosts = () => {
    try {
      const cachedValue = localStorage.getItem(BLOG_POST_CACHE_KEY)
      if (!cachedValue) {
        return [] as BlogPost[]
      }

      const parsedPosts = JSON.parse(cachedValue) as BlogPost[]
      return Array.isArray(parsedPosts) ? parsedPosts : []
    } catch {
      return [] as BlogPost[]
    }
  }

  const writeCachedPosts = (nextPosts: BlogPost[]) => {
    try {
      localStorage.setItem(BLOG_POST_CACHE_KEY, JSON.stringify(nextPosts))
    } catch {
      // ignore cache write errors
    }
  }

  const fetchGoogleNews = async (signal: AbortSignal) => {
    const endpointWithQuery = `${GOOGLE_NEWS_ENDPOINT}?q=${encodeURIComponent(googleQuery)}&limit=${googleLimit}`
    const response = await fetch(endpointWithQuery, { signal })

    if (!response.ok) {
      throw new Error(`Google News feed unavailable (${response.status})`)
    }

    const payload = (await response.json()) as GoogleNewsResponse
    return (payload.items || []).map((item, index) => {
      const cleanExcerpt = sanitizeExcerpt(decodeEntities(stripHtml(item.description || item.title || '')))
      const sourceHostTag = slugFromHost(item.link)

      return {
        id: `gn-${index}-${item.link}`,
        title: decodeEntities(item.title),
        excerpt: cleanExcerpt || decodeEntities(item.title),
        publishedAt: item.pubDate,
        readingTimeMinutes: 4,
        tags: ['google-news', 'tech', sourceHostTag].map(normalizeTag),
        url: item.link,
        coverImage: item.image || buildHostFavicon(item.link),
        source: 'google-news' as const,
      }
    })
  }

  const fetchHackerNews = async (signal: AbortSignal) => {
    const response = await fetch(HN_NEW_STORIES_ENDPOINT, { signal })

    if (!response.ok) {
      throw new Error(`Hacker News feed unavailable (${response.status})`)
    }

    const storyIds = (await response.json()) as number[]
    const selectedStoryIds = storyIds.slice(0, hackerNewsLimit)

    const storyResponses = await Promise.all(
      selectedStoryIds.map(async (storyId) => {
        const storyResponse = await fetch(`${HN_ITEM_ENDPOINT}/${storyId}.json`, { signal })
        if (!storyResponse.ok) {
          return null
        }
        return (await storyResponse.json()) as HackerNewsItem
      }),
    )

    return storyResponses
      .filter((story): story is HackerNewsItem => Boolean(story && story.title))
      .map((story) => ({
        id: `hn-${story.id}`,
        title: story.title,
        excerpt: story.by
          ? `Discussed on Hacker News by ${story.by}.`
          : 'Fresh technical discussion from Hacker News.',
        publishedAt: new Date(story.time * 1000).toISOString(),
        readingTimeMinutes: 3,
        tags: ['hacker-news', 'dev', 'startup'],
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        coverImage: buildHostFavicon(story.url),
        source: 'hacker-news' as const,
      }))
  }

  useEffect(() => {
    const controller = new AbortController()

    const loadPosts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [googleNewsResult, hackerNewsResult] = await Promise.allSettled([
          fetchGoogleNews(controller.signal),
          fetchHackerNews(controller.signal),
        ])

        const googleNewsPosts = googleNewsResult.status === 'fulfilled' ? googleNewsResult.value : []
        const hackerNewsPosts = hackerNewsResult.status === 'fulfilled' ? hackerNewsResult.value : []

        const mergedPosts = [...googleNewsPosts, ...hackerNewsPosts]
          .sort((firstPost, secondPost) => {
            return new Date(secondPost.publishedAt).getTime() - new Date(firstPost.publishedAt).getTime()
          })

        if (mergedPosts.length > 0) {
          setPosts(mergedPosts)
          writeCachedPosts(mergedPosts)
        } else {
          const cachedPosts = readCachedPosts()
          setPosts(cachedPosts)
          setError('Both feeds are unavailable right now. Showing fallback content if available.')
        }

        if (googleNewsResult.status === 'rejected' || hackerNewsResult.status === 'rejected') {
          setError('One of the live feeds is unavailable. Showing available live data.')
        }
      } catch (loadError) {
        if (controller.signal.aborted) {
          return
        }

        const cachedPosts = readCachedPosts()
        setPosts(cachedPosts)
        setError(loadError instanceof Error ? loadError.message : 'Unknown blog feed error')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadPosts()

    return () => controller.abort()
  }, [googleLimit, googleQuery, hackerNewsLimit])

  const feedTags = useMemo(() => {
    return ['google-news', 'hacker-news', ...googleQuery.split(/\s+OR\s+|\s+/i).filter((tag) => tag.length > 2)]
      .map(normalizeTag)
      .filter((value, index, list) => list.indexOf(value) === index)
      .slice(0, 8)
  }, [googleQuery])

  const feedLabel = 'Google News RSS + Hacker News API'

  return {
    posts,
    isLoading,
    error,
    feedTags,
    feedLabel,
    isLiveFeedEnabled: true,
  }
}