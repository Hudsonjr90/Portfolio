import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaHeart, FaRegClock, FaRegHeart, FaRss, FaSearch } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import Transition from '../../components/Transition/Transition'
import { BlogPost, useBlogPosts } from '../../hooks/useBlogPosts'
import styles from './Blog.module.css'

const ParticlesB = React.lazy(() => import('../../components/Particles/ParticlesB'))

interface FallbackBlogPost {
  id: string
  title: string
  excerpt: string
  tags: string[]
  publishedAt: string
  readingTimeMinutes: number
}

const FAVORITES_STORAGE_KEY = 'blog-favorites-v1'

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

const createSkeletonItems = (count: number) => {
  return Array.from({ length: count }, (_, index) => index)
}

const Blog = () => {
  const { t, i18n } = useTranslation()
  const { posts, isLoading, error, feedLabel } = useBlogPosts()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTag, setActiveTag] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const fallbackPosts = useMemo(() => {
    const localizedPosts = t('blog.fallbackPosts', { returnObjects: true })
    if (!Array.isArray(localizedPosts)) {
      return []
    }

    return localizedPosts.map((post, index) => {
      const typedPost = post as FallbackBlogPost
      return {
        id: typedPost.id || `fallback-${index + 1}`,
        title: typedPost.title,
        excerpt: typedPost.excerpt,
        tags: typedPost.tags || [],
        publishedAt: typedPost.publishedAt,
        readingTimeMinutes: typedPost.readingTimeMinutes,
        source: 'fallback' as const,
      }
    })
  }, [t])

  const displayedPosts = useMemo<BlogPost[]>(() => {
    if (posts.length > 0) {
      return posts
    }

    return fallbackPosts
  }, [fallbackPosts, posts])

  const locale = i18n.language === 'pt' ? 'pt-BR' : i18n.language
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  useEffect(() => {
    setFavoriteIds(readFavoriteIds())
  }, [])

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth

      if (width <= 720) {
        setItemsPerPage(3)
        return
      }

      if (width <= 1200) {
        setItemsPerPage(4)
        return
      }

      setItemsPerPage(6)
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()

    displayedPosts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag))
    })

    return ['all', ...Array.from(tagSet).sort((firstTag, secondTag) => firstTag.localeCompare(secondTag))]
  }, [displayedPosts])

  const filteredPosts = useMemo(() => {
    return displayedPosts.filter((post) => {
      const matchesFavorite = activeTag !== 'favorites' || favoriteIds.includes(post.id)
      const matchesTag = activeTag === 'all' || post.tags.includes(activeTag)
      const matchesSearch = normalizedSearchTerm.length === 0
        || [post.title, post.excerpt, post.tags.join(' ')].join(' ').toLowerCase().includes(normalizedSearchTerm)

      return matchesFavorite && matchesTag && matchesSearch
    })
  }, [activeTag, displayedPosts, favoriteIds, normalizedSearchTerm])

  useEffect(() => {
    setCurrentPage(0)
  }, [activeTag, normalizedSearchTerm, itemsPerPage])

  const pageCount = Math.ceil(filteredPosts.length / itemsPerPage)
  const paginatedPosts = useMemo(() => {
    const startIndex = currentPage * itemsPerPage
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, filteredPosts, itemsPerPage])

  const statusTone = posts.length > 0 ? 'live' : error ? 'fallback' : 'setup'
  const statusText = isLoading
    ? t('blog.loading')
    : posts.length > 0
      ? t('blog.liveStatus', { source: feedLabel })
      : error
        ? t('blog.error')
        : t('blog.empty')

  const toggleFavorite = (postId: string) => {
    setFavoriteIds((previousIds) => {
      const nextIds = previousIds.includes(postId)
        ? previousIds.filter((id) => id !== postId)
        : [...previousIds, postId]

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
      <section className={styles.blog} data-tour="blog-feed">
        <Suspense fallback={<div>{t('home.loading')}</div>}>
          <ParticlesB />
        </Suspense>

        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.heroCopy}>
            <span className={`${styles.statusBadge} ${styles[statusTone]}`}>
              <FaRss />
              {statusText}
            </span>
            <p className={styles.eyebrow}>{t('blog.eyebrow')}</p>
            <h2 className={styles.heading}>
              {t('blog.title')} <span>{t('blog.text')}</span>
            </h2>
            <p className={styles.intro}>{t('blog.intro')}</p>
          </div>
        </motion.div>

        <div className={styles.controls}>
          <label className={styles.searchBox}>
            <FaSearch />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t('blog.searchPlaceholder')}
              aria-label={t('blog.searchPlaceholder')}
            />
          </label>

          <div className={styles.filtersBlock}>
            <p className={styles.filtersLabel}>{t('blog.browseByTag')}</p>
            <div className={styles.filterChips}>
              <button
                className={`${styles.filterChip} ${activeTag === 'favorites' ? styles.filterChipActive : ''}`}
                onClick={() => setActiveTag('favorites')}
              >
                {t('blog.favoriteOnly')}
              </button>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  className={`${styles.filterChip} ${activeTag === tag ? styles.filterChipActive : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag === 'all' ? t('blog.allTags') : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resultsHeader}>
          <p>{t('blog.resultsSummary', { count: filteredPosts.length })}</p>
          {(activeTag !== 'all' || normalizedSearchTerm) && (
            <button
              className={styles.clearFiltersButton}
              onClick={() => {
                setActiveTag('all')
                setSearchTerm('')
              }}
            >
              {t('blog.clearFilters')}
            </button>
          )}
        </div>

        {isLoading ? (
          <div className={styles.grid}>
            {createSkeletonItems(itemsPerPage).map((item) => (
              <article key={`skeleton-${item}`} className={`${styles.card} ${styles.skeletonCard}`}>
                <div className={`${styles.cover} ${styles.skeletonBlock}`}></div>
                <div className={styles.content}>
                  <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}></div>
                  <div className={`${styles.skeletonLine} ${styles.skeletonLineTitle}`}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}></div>
                </div>
              </article>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>{t('blog.noResultsTitle')}</h3>
            <p>{t('blog.noResultsText')}</p>
          </div>
        ) : (
          <>
            <div className={styles.grid} data-tour="blog-grid">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease: 'easeOut' }}
                >
                  <div
                    className={styles.cover}
                    style={post.coverImage ? { backgroundImage: `linear-gradient(180deg, rgba(var(--bg_color_rgb), 0.08), rgba(var(--bg_color_rgb), 0.85)), url(${post.coverImage})` } : undefined}
                  >
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
                      aria-label={favoriteIds.includes(post.id) ? t('blog.removeFavorite') : t('blog.addFavorite')}
                    >
                      {favoriteIds.includes(post.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  <div className={styles.content}>
                    <p className={styles.metaRow}>
                      <span>{t('blog.publishedAt', { date: formatDate(post.publishedAt) })}</span>
                      <span className={styles.readTime}><FaRegClock /> {t('blog.readTime', { minutes: post.readingTimeMinutes })}</span>
                    </p>

                    <h3>{post.title}</h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    <div className={styles.tags}>
                      {post.tags.map((tag) => (
                        <button
                          key={`${post.id}-${tag}`}
                          className={styles.tagButton}
                          onClick={() => setActiveTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className={styles.cardActions}>
                      <NavLink
                        to={`/blog/${encodeURIComponent(post.id)}`}
                        state={{ post }}
                        className={styles.linkButton}
                      >
                        {t('blog.readDetails')}
                      </NavLink>
                      {post.url ? (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={`${styles.linkButton} ${styles.secondaryButton}`}
                        >
                          {t('blog.readArticle')}
                          <FaArrowRight />
                        </a>
                      ) : (
                        <span className={`${styles.linkButton} ${styles.disabledButton}`}>{t('blog.comingSoon')}</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {pageCount > 1 && (
              <div className={styles.paginationWrap} data-tour="blog-pagination">
                <ReactPaginate
                  previousLabel={<FaChevronLeft />}
                  nextLabel={<FaChevronRight />}
                  pageCount={pageCount}
                  onPageChange={(event) => setCurrentPage(event.selected)}
                  forcePage={currentPage}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  breakLabel="..."
                  containerClassName={styles.pagination}
                  pageClassName={styles.paginationItem}
                  previousClassName={styles.paginationItem}
                  nextClassName={styles.paginationItem}
                  activeClassName={styles.paginationActive}
                  disabledClassName={styles.paginationDisabled}
                />
              </div>
            )}
          </>
        )}

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
        >
          <div>
            <p className={styles.ctaEyebrow}>{t('blog.ctaEyebrow')}</p>
            <h3>{t('blog.ctaTitle')}</h3>
            <p>{t('blog.ctaText')}</p>
          </div>

          <NavLink to="/contact" className={styles.ctaButton}>
            {t('blog.ctaButton')}
          </NavLink>
        </motion.div>
      </section>
    </Transition>
  )
}

export default Blog