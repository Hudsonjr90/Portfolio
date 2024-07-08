import { SetStateAction, useEffect, useState } from "react"
import styles from "./Testimonials.module.css"
import Transition from "../../components/Transition/Transition"
import { motion, AnimatePresence } from "framer-motion"
import ReactPaginate from "react-paginate"
import { useTranslation } from "react-i18next"
import { wrap } from "popmotion"
import imagesServer from "../../data/imageServer"
import testimonialServer from "../../data/testimonialsServer"
import ParticlesB from "../../components/Particles/ParticlesB"


const Testimonials = () => {
  const { t } = useTranslation()
 

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  const [currentPage, setCurrentPage] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isFlipped, setFlipped] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handlePageClick = (data: { selected: SetStateAction<number> }) => {
    setCurrentPage(data.selected)
  }

  const pageCount = Math.ceil(testimonialServer.length / 1)
  const imageIndex = wrap(
    0,
    windowWidth > 768 ? imagesServer.desktop.length : imagesServer.mobile.length,
    currentPage
  )

  const handleMouseEnter = () => {
    setFlipped(true)
  }

  const handleMouseLeave = () => {
    setFlipped(false)
  }

  const autoChangePage = () => {
    if (!isFlipped) {
      const nextPage = (currentPage + 1) % pageCount
      setCurrentPage(nextPage)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(autoChangePage, 5000)

    return () => clearInterval(intervalId)
  }, [currentPage, pageCount, isFlipped])



  return (
    <Transition onAnimationComplete={() => {}}>
      <ParticlesB />
      <section className={styles.testimonials}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("testimonials.title")}
          <span>{t("testimonials.text")}</span>
        </h2>
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{
            duration: 2,
            delay: 0.7,
            ease: [0.2, 0, 0.2, 1],
          }}
          className={`${styles.slider_container} ${
            isFlipped ? styles.flipped : ""
          }`}
        >
          <AnimatePresence initial={false}>
            <motion.div
              className={styles.flipContent}
              key={`${currentPage}-${testimonialServer[imageIndex].id}`}
              onMouseLeave={handleMouseLeave}
            >
              <h3>{testimonialServer[imageIndex].title}</h3>
              <p>{t(`testimonials.cards.${imageIndex}.text`)}</p>
            </motion.div>
            <motion.img
              key={`${currentPage}-${testimonialServer[imageIndex].id}-img`}
              src={
                windowWidth > 768
                  ? imagesServer.desktop[imageIndex]
                  : imagesServer.mobile[imageIndex]
              }
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`${styles.imgCard} ${
                isFlipped ? styles.flipAnimation : ""
              }`}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              onMouseEnter={handleMouseEnter}
            />
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: "80%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 2,
            delay: 0.3,
            ease: [0.3, 0, 0.2, 1],
          }}
        >
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            onPageChange={({ selected: selectedPage }) => {
              handlePageClick({ selected: selectedPage })
            }}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
            forcePage={currentPage}
          />
        </motion.div>
      </section>
    </Transition>
  )
}

export default Testimonials
