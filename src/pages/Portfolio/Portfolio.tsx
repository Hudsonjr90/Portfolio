import { useState, useEffect } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import Transition from '../../components/Transition/Transition'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'
import styles from './Portfolio.module.css'
import portfolioServer from '../../data/portfolioServer'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticlesB from '../../components/Particles/ParticlesB'


const Portfolio = () => {
  const { t } = useTranslation()
  const [currentItems, setCurrentItems] = useState(portfolioServer.slice(0, 3))
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [transitionCompleted, setTransitionCompleted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth
      if (width <= 768) {
        setItemsPerPage(1)
      } else if (width > 768 && width <= 1550) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)

    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(portfolioServer.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(portfolioServer.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % portfolioServer.length
    setItemOffset(newOffset)
    setCurrentPage(event.selected)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setItemOffset((prevOffset) => {
          let newOffset = prevOffset + itemsPerPage
          let newPage = currentPage + 1

          if (newOffset >= portfolioServer.length) {
            newOffset = 0
            newPage = 0
          }

          setCurrentPage(newPage)
          return newOffset
        })
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [isPaused, currentPage, itemsPerPage])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)



  return (
    <Transition onAnimationComplete={() => setTransitionCompleted(true)}>
      {transitionCompleted && (
        <section className={styles.portfolio}>
          <ParticlesB />
          <h2 className={styles.heading}>
            <span>//</span> {t('projects.title')}{' '}
            <span>{t('projects.text')}</span>
          </h2>

          <motion.div
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={styles.portfolio_grid}
          >
            {currentItems.map((item) => (
              <Card
                key={item.id}
                className={styles.card}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="300"
                  image={item.image}
                />
                <CardContent className={styles.cardContent}>
                  {t(`projects.data.${item.id}.description`)}
                </CardContent>
                <CardContent className={styles.cardContent}>
                  <li className={styles.tech_title}>
                    {t('projects.subtitle')}
                  </li>
                  {item.technologies.map((tech, index) => (
                    <li className={styles.tech_list} key={index}>
                      {tech}
                    </li>
                  ))}
                </CardContent>
                <CardActions className={styles.cardActions}>
                  <Button className={styles.links}>
                    <NavLink
                      to={item.linkDeploy || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Deploy
                    </NavLink>
                  </Button>
                  <Button className={styles.links}>
                    <NavLink
                      to={item.linkRepository || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Code
                    </NavLink>
                  </Button>
                </CardActions>
              </Card>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: '80%' }}
            animate={{ opacity: 1, y: '0%' }}
            transition={{
              duration: 2,
              delay: 0.3,
              ease: [0.3, 0, 0.2, 1],
            }}
          >
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={0}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              activeClassName={styles.activePage}
              forcePage={currentPage}
            />
          </motion.div>
        </section>
      )}
    </Transition>
  )
}

export default Portfolio
