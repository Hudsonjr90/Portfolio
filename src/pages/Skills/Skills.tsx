import styles from './Skills.module.css'
import { motion } from 'framer-motion'
import Transition from '../../components/Transition'
import { iconComponents, mainIcons } from '../../data/iconsServer'
import WordCloud from '../../components/WordCloud'
import {
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'react-i18next'
import ProgressBar from 'react-customizable-progressbar'
import CountUp from 'react-countup'
import Particles from 'react-tsparticles'
import { Engine, IOptions } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { useTheme } from '../../context/ThemeContext'
import { LuSearch } from 'react-icons/lu'
import { FaCloudMeatball, FaSearch } from 'react-icons/fa'

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

const Skills = () => {
  const { t } = useTranslation()

  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine)
    return Promise.resolve()
  }, [])

  const { mainColor } = useTheme()

  const particlesConfig: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: mainColor,
      },
      shape: {
        type: 'polygon',
        stroke: {
          width: 0,
          color: mainColor,
        },
        polygon: {
          sides: 3,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4.872463273808071,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 4,
        direction: 'top-right',
        random: false,
        straight: true,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  }

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

  const handleCategoryChange = (category: SetStateAction<string>) => {
    setSelectedCategory(category)
    setCurrentPage(0)
  }

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
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
    setSearchTerm('')
  }

  const visibleIcons = useMemo(() => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredIcons.slice(startIndex, endIndex)
  }, [currentPage, itemsPerPage, filteredIcons])

  const toggleCloud = () => {
    setShowCloud(!showCloud)
  }

  return (
    <Transition onAnimationComplete={() => {}}>
      <Particles options={particlesConfig} init={particlesInit} />
      <section className={styles.skills}>
        <h2 className={styles.heading}>
          <span>//</span> {t('skills.title')}
          <span>{t('skills.text')}</span>
        </h2>
        <button className={styles.toggle} onClick={toggleCloud}>
          {showCloud ? (
            <FaSearch className={styles.show_cloud} />
          ) : (
            <FaCloudMeatball className={styles.show_cloud} />
          )}
        </button>
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
                <LuSearch />
              </motion.div>
            </motion.div>
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
                    <span className={styles.icon_description}>{icon.name}</span>
                    <ProgressBar
                      radius={65}
                      strokeWidth={4}
                      strokeColor="var(--main_color)"
                      trackStrokeWidth={9}
                      trackStrokeColor="var(--second_bg_color)"
                      pointerRadius={9}
                      pointerStrokeWidth={8}
                      pointerStrokeColor="var(--main_color)"
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
