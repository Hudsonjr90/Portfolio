import React from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft, FaArrowRight, FaHeart, FaRegClock, FaRegHeart } from 'react-icons/fa'
import Transition from '../../components/Transition/Transition'
import { BlogPost } from '../../hooks/useBlogPosts'
import styles from './BlogDetail.module.css'

const FAVORITES_STORAGE_KEY = 'blog-favorites-v1'
const BLOG_POST_CACHE_KEY = 'blog-post-cache-v1'

const readFavoriteIds = () => {
  try {
    const cachedValue = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!cachedValue) {
      return [] as string[]
    }

    const parsedIds = JSON.parse(cachedValue) as string[]
    return Array.isArray(parsedIds) ? parsedIds : []
  } catch {
    return [] as string[]
  }
}

const writeFavoriteIds = (ids: string[]) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // ignore storage write errors
  }
}

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

const BlogDetail = () => {
  const { t, i18n } = useTranslation()
  const { state } = useLocation()
  const { postId } = useParams()

  const postFromState = (state as { post?: BlogPost } | null)?.post
  const cachedPosts = readCachedPosts()
  const fallbackPost = cachedPosts.find((post) => post.id === decodeURIComponent(postId || ''))
  const post = postFromState || fallbackPost

  const locale = i18n.language === 'pt' ? 'pt-BR' : i18n.language
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>(() => readFavoriteIds())

  const isFavorite = post ? favoriteIds.includes(post.id) : false

  const toggleFavorite = (nextPostId: string) => {
    setFavoriteIds((previousIds) => {
      const nextIds = previousIds.includes(nextPostId)
        ? previousIds.filter((id) => id !== nextPostId)
        : [...previousIds, nextPostId]

      writeFavoriteIds(nextIds)
      return nextIds
    })
  }

  const formatDate = (dateValue: string) => {
    const parsedDate = new Date(dateValue)
    if (Number.isNaN(parsedDate.getTime())) {
      return dateValue
    }

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(parsedDate)
  }

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.blogDetail}>
        <div className={styles.inner}>
          <NavLink to="/blog" className={styles.backLink}>
            <FaArrowLeft />
            {t('blog.backToList')}
          </NavLink>

          {!post ? (
            <div className={styles.notFoundBox}>
              <h2>{t('blog.detailNotFoundTitle')}</h2>
              <p>{t('blog.detailNotFoundText')}</p>
            </div>
          ) : (
            <article className={styles.card}>
              <div className={styles.headerRow}>
                <span className={styles.sourcePill}>
                  {post.source === 'google-news'
                    ? t('blog.sourceGoogle')
                    : post.source === 'hacker-news'
                      ? t('blog.sourceHackerNews')
                      : t('blog.fallbackBadge')}
                </span>
                <button
                  className={styles.favoriteButton}
                  onClick={() => toggleFavorite(post.id)}
                  aria-label={isFavorite ? t('blog.removeFavorite') : t('blog.addFavorite')}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <h1>{post.title}</h1>

              <p className={styles.metaRow}>
                <span>{t('blog.publishedAt', { date: formatDate(post.publishedAt) })}</span>
                <span className={styles.readTime}><FaRegClock /> {t('blog.readTime', { minutes: post.readingTimeMinutes })}</span>
              </p>

              <p className={styles.excerpt}>{post.excerpt}</p>

              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={`${post.id}-${tag}`}>{tag}</span>
                ))}
              </div>

              <div className={styles.actions}>
                <NavLink to="/blog" className={styles.secondaryButton}>
                  {t('blog.backToList')}
                </NavLink>

                {post.url ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.primaryButton}
                  >
                    {t('blog.readArticle')}
                    <FaArrowRight />
                  </a>
                ) : (
                  <span className={styles.disabledButton}>{t('blog.comingSoon')}</span>
                )}
              </div>
            </article>
          )}
        </div>
      </section>
    </Transition>
  )
}

export default BlogDetail
