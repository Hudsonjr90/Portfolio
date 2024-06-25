// CSS
import styles from './Home.module.css'
// REACT ROUTER DOM
import { NavLink } from 'react-router-dom'
// COMPONENTS
import Transition from '../../components/Transition'
import { Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Typewriter from 'typewriter-effect'
import { saveAs } from 'file-saver'
import resumeServer from '../../data/resumeServer'
// REACT ICONS
import {
  FaCircleArrowDown,
  FaCircleXmark,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa6'
import { useMediaQuery } from 'react-responsive'
import HomeDesktopImage from '/imgs/my.png'
import HomeMobileImage from '/imgs/my-mobile.png'
import ParticlesBackground from '../../components/ParticlesBackground'
import { motion } from 'framer-motion'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const Home = () => {
  const { t, i18n } = useTranslation()

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  const imageUrl = isMobile ? HomeMobileImage : HomeDesktopImage

  const [showModal, setShowModal] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = () => {
      let images: string[] = []
      let pdfPath: string | null = null
      switch (i18n.language) {
        case 'pt':
          images = resumeServer.br
          pdfPath = '/cv/HudsonKennedy-BR.pdf'
          break
        case 'en':
          images = resumeServer.us
          pdfPath = '/cv/HudsonKennedy-US.pdf'
          break
        case 'fr':
          images = resumeServer.fr
          pdfPath = '/cv/HudsonKennedy-FR.pdf'
          break
        case 'it':
          images = resumeServer.it
          pdfPath = '/cv/HudsonKennedy-IT.pdf'
          break
        case 'es':
          images = resumeServer.es
          pdfPath = '/cv/HudsonKennedy-ES.pdf'
          break
        default:
          break
      }
      setSelectedImages(images)
      setSelectedPdf(pdfPath)
    }

    loadContent()
  }, [i18n.language])

  const handleDownload = () => {
    if (selectedPdf) {
      const fileName = selectedPdf.split('/').pop()?.replace('.pdf', '')
      if (fileName) {
        fetch(selectedPdf)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${fileName}.pdf`)
          })
          .catch((error) => {
            console.error('Error downloading PDF:', error)
          })
        setShowModal(false)
      }
    }
  }

  const [typedStrings, setTypedStrings] = useState<string[]>([])

  useEffect(() => {
    const strings = [
      t('home.function1'),
      t('home.function2'),
      t('home.function3'),
      t('home.function4'),
    ]
    setTypedStrings(strings)
  }, [t])

  return (
    <>
      <Transition onAnimationComplete={() => {}}>
        <section className={styles.home}>
          <div className={styles.home_content}>
            <ParticlesBackground />

            <h3 className={styles.first_h3}>
              <motion.div
                initial={{ opacity: 0, x: '80%' }}
                animate={{ opacity: 1, x: '0%', rotate: 360 }}
                transition={{
                  type: 'spring',
                  duration: 2,
                  delay: 0.3,
                  ease: [0.3, 0, 0.2, 1],
                }}
              >
                {t('home.title')} <span>Commit</span>
              </motion.div>
            </h3>

            <h1 className={styles.text_reveal}>
              <span>Hudson Kennedy</span>
              <span aria-hidden="true">Hudson Kennedy</span>
            </h1>

            <motion.div
              animate={{ x: [30, 150, 10], opacity: 1, scale: 1 }}
              transition={{
                duration: 3,
                delay: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}
              className={styles.transparent_text}
            >
              <Typewriter
                options={{
                  strings: typedStrings,
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 30,
                }}
              />
            </motion.div>

            <div className={styles.social_media}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 3,
                  delay: 1.2,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: 'spring',
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="https://api.whatsapp.com/send?phone=5521969609121"
                  className={styles.whatsapp}
                  target="_blank"
                  data-tooltip-id="whatsapp"
                >
                  <FaWhatsapp />
                </NavLink>
                <Tooltip
                  id="whatsapp"
                  place="top"
                  content="Whatsapp"
                  style={{ backgroundColor: '#25d366', color: '#fff' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 3,
                  delay: 1.5,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: 'spring',
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="mailto:hudsonhugo90@gmail.com?body=Olá Hudson, podemos conversar?&subject=Contato pelo Portfólio"
                  className={styles.email}
                  target="_blank"
                  data-tooltip-id="email"
                >
                  <FaEnvelope />
                </NavLink>
                <Tooltip
                  id="email"
                  place="top"
                  content="Email"
                  style={{ backgroundColor: '#ee0a0a', color: '#fff' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.7,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: 'spring',
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="https://www.linkedin.com/in/hudsonkennedyjr"
                  className={styles.linkedin}
                  target="_blank"
                  data-tooltip-id="linkedin"
                >
                  <FaLinkedinIn />
                </NavLink>
                <Tooltip
                  id="linkedin"
                  place="top"
                  content="LinkedIn"
                  style={{ backgroundColor: '#2867b2', color: '#fff' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 3,
                  delay: 1.9,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: 'spring',
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="https://github.com/Hudsonjr90"
                  className={styles.github}
                  target="_blank"
                  data-tooltip-id="github"
                  data-tooltip-variant="dark"
                >
                  <FaGithub />
                </NavLink>
                <Tooltip
                  id="github"
                  place="top"
                  content="Github"
                  style={{ backgroundColor: '#181717', color: '#fff' }}
                />
              </motion.div>
            </div>

            <div className={styles.btn_box}>
              <button
                className={styles.btn}
                onClick={() => {
                  setShowModal(true)
                }}
              >
                {t('home.resume')}
              </button>
            </div>
          </div>

          <motion.div
            className={styles.home_img}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            whileHover={{ scale: 1.2 }}
            transition={{
              duration: 2,
              delay: 0.7,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <img src={imageUrl} alt="home_img" />
          </motion.div>
        </section>
        <motion.div
          className={styles.footer}
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: '0%' }}
          transition={{
            duration: 2,
            delay: 0.7,
            ease: [0.2, 0, 0.2, 1],
          }}
        >
          Copyright© 2024 H.K DEV{' '}
        </motion.div>
      </Transition>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className={styles.modal_container}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.modal_title}>
            <FaCircleArrowDown
              className={styles.down_button}
              onClick={handleDownload}
              data-tooltip-id="down_btn"
            />
            <FaCircleXmark
              className={styles.close_button}
              data-tooltip-id="close_btn"
              onClick={() => {
                setShowModal(false)
              }}
            />
            <Tooltip id="down_btn" place="left" content={t('home.download')} />
            <Tooltip id="close_btn" place="right" content={t('home.close')} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_content}>
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Currículo ${i18n.language} - Slide ${index + 1}`}
            />
          ))}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Home
