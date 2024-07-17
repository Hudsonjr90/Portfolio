import React, { useState, useEffect, useMemo } from 'react'
import styles from './Skills.module.css'
import { motion } from 'framer-motion'
import Transition from '../../components/Transition/Transition'
import { iconComponents, mainIcons } from '../../data/iconsServer'
import WordCloud from '../../components/WordCloud/WordCloud'
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'react-i18next'
import ProgressBar from "../../components/Progressbar/ProgressBar"
import CountUp from 'react-countup'
import { FaSearch } from 'react-icons/fa'
import { GiSunCloud } from 'react-icons/gi'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import IconButton from '@mui/material/IconButton'
import { ThemeProvider } from '@mui/material/styles'
import ParticlesB from '../../components/Particles/ParticlesB'
import { cloudTheme, searchTheme, useTheme } from '../../context/ThemeContext'



const Skills = () => {
  const { t } = useTranslation()

  const { mainColor } = useTheme()

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [showCloud, setShowCloud] = useState(false)
  const [noResults, setNoResults] = useState(false)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(0)
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value)
    setCurrentPage(0)
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [selectedCategory])

  const filteredIcons = useMemo(() => {
    return mainIcons.filter((icon) => {
      const categoryMatch =
        selectedCategory === 'all' ||
        icon.category.toLowerCase() === selectedCategory.toLowerCase()
      const searchTermMatch = icon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      return categoryMatch && searchTermMatch
    })
  }, [mainIcons, selectedCategory, searchTerm])

  useEffect(() => {
    setNoResults(filteredIcons.length === 0)
  }, [filteredIcons])

  const [itemsPerPage, setItemsPerPage] = useState(14)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(14)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage)

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  const visibleIcons = useMemo(() => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredIcons.slice(startIndex, endIndex)
  }, [currentPage, itemsPerPage, filteredIcons])

  const toggleCloud = () => {
    setShowCloud(!showCloud)
  }

  useEffect(() => {
    if (filteredIcons.length > 0 && searchTerm === '') {
      const interval = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
      }, 7000)

      return () => clearInterval(interval)
    }
  }, [filteredIcons.length, totalPages, searchTerm])

  return (
    <Transition onAnimationComplete={() => {}}>
      <ParticlesB />
      <section className={styles.skills}>
        <h2 className={styles.heading}>
          <span>//</span> {t('skills.title')}
          <span>{t('skills.text')}</span>
        </h2>
        <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            transition={{
              duration: 2.5,
              delay: 0.3,
              ease: [0.3, 0, 0.2, 1],
            }}
            className={styles.toggle}
            onClick={toggleCloud}
          >
            {showCloud ? (
              <ThemeProvider theme={searchTheme}>
                <Tooltip
                  TransitionComponent={Zoom}
                  title={t('skills.searchable')}
                  placement="top"
                  arrow
                >
                  <IconButton className={styles.show_search}>
                    <FaSearch />
                  </IconButton>
                </Tooltip>
              </ThemeProvider>
            ) : (
              <ThemeProvider theme={cloudTheme}>
                <Tooltip
                  TransitionComponent={Zoom}
                  title={t('skills.cloudWord')}
                  placement="top"
                  arrow
                >
                  <IconButton className={styles.show_cloud}>
                    <GiSunCloud />
                  </IconButton>
                </Tooltip>
              </ThemeProvider>
            )}
        </motion.div>

        {showCloud ? (
          <WordCloud />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: '0%' }}
              transition={{
                duration: 2.5,
                delay: 0.3,
                ease: [0.3, 0, 0.2, 1],
              }}
              className={styles.filters}
            >
              <select
                value={selectedCategory}
                onChange={(e) => {
                  handleCategoryChange(e.target.value)
                }}
              >
                <option value="all">All</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="tools">Tools</option>
                <option value="deploy">Deploy</option>
                <option value="design">Design</option>
              </select>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder={t('skills.search')}
              />
              <motion.div className={styles.icon_search}>
                <FaSearch />
              </motion.div>
            </motion.div>
            {visibleIcons.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '0%' }}
                transition={{
                  duration: 2.5,
                  delay: 0.3,
                  ease: [0.3, 0, 0.2, 1],
                }}
                className={styles.no_results}
              >
                {noResults && <p>{t('skills.noResults')}</p>}
              </motion.div>
            ) : (
              <motion.div
                className={styles.icons_container}
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {visibleIcons.map((icon) => {
                  const IconComponent = iconComponents[icon.name]
                  return (
                    <motion.div
                      key={icon.id}
                      variants={container}
                      className={styles.box_icon}
                    >
                      <span className={styles.icon_description}>
                        {icon.name}
                      </span>
                      <ProgressBar
                        radius={65}
                        strokeWidth={4}
                        strokeColor={mainColor}
                        trackStrokeWidth={9}
                        trackStrokeColor="var(--second_bg_color)"
                        pointerRadius={9}
                        pointerStrokeWidth={8}
                        pointerStrokeColor={mainColor}
                        progress={icon.percentage}
                        initialAnimation={true}
                        transition="2.5s ease 0.5s"
                        trackTransition="0s ease"
                      >
                        <div className={styles.icon_wrapper}>
                          {IconComponent && (
                            <IconComponent className={styles.icon} />
                          )}
                        </div>
                        <div className={styles.indicator}>
                          <CountUp
                            start={0}
                            end={icon.percentage}
                            duration={2.5}
                            suffix={'%'}
                          />
                        </div>
                      </ProgressBar>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: '0%' }}
              transition={{
                duration: 2.5,
                delay: 0.3,
                ease: [0.3, 0, 0.2, 1],
              }}
            >
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={0}
                onPageChange={({ selected: selectedPage }) => {
                  handlePageClick({ selected: selectedPage })
                }}
                containerClassName={styles.pagination}
                activeClassName={styles.activePage}
                previousLabel={'<<'}
                nextLabel={'>>'}
                forcePage={currentPage}
              />
            </motion.div>
          </>
        )}
      </section>
    </Transition>
  )
}

export default Skills
