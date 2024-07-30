import styles from './About.module.css'
import React, { useState, useCallback, Suspense } from 'react'
import Transition from '../../components/Transition/Transition'
import { useTranslation } from 'react-i18next'
import About_img from '/imgs/about.webp'
import { motion } from 'framer-motion'
import LazyLoad from 'react-lazyload'

const ParticlesB = React.lazy(() => import('../../components/Particles/ParticlesB'));


const About = () => {
  const { t } = useTranslation()

  const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`
  const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`

  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const setIsLoadedCallback = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.about}>
      <Suspense fallback={<div>Loading...</div>}>
        <ParticlesB />
      </Suspense>
        <div className={styles.container_img}>
          <LazyLoad once>
            <motion.div
              initial={false}
              animate={
                isLoaded && isInView
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
              onViewportEnter={() => setIsInView(true)}
            >
              <img
                src={About_img}
                alt="about_img"
                onLoad={setIsLoadedCallback}
                width="100%"
                height="auto"
                loading="eager"
              />
            </motion.div>
          </LazyLoad>
        </div>

        <div>
          <motion.div
            className={styles.about_content}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <h2>
              <span>//</span>
              {t('about.title')}
              <span>Hudson Kennedy</span>
            </h2>

            <p>{t('about.text')}</p>
          </motion.div>
        </div>
      </section>
    </Transition>
  )
}

export default About
