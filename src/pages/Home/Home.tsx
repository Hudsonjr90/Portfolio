import styles from './Home.module.css'
import { NavLink } from 'react-router-dom'
import Transition from '../../components/Transition/Transition'
import { Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Typewriter from 'typewriter-effect'
import { saveAs } from 'file-saver'
import resumeServer from '../../data/resumeServer'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import {
  whatsappTheme,
  emailTheme,
  linkedinTheme,
  githubTheme,
  modalTheme,
} from '../../context/ThemeContext'
import { ThemeProvider } from '@mui/material/styles'
import {
  WhatsApp,
  LinkedIn,
  Email,
  GitHub,
  FileDownload,
  Close,
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { useMediaQuery } from 'react-responsive'
import HomeDesktopImage from '/imgs/my.webp'
import HomeMobileImage from '/imgs/my-mobile.webp'
import { motion } from 'framer-motion'
import ParticlesA from '../../components/Particles/ParticlesA'

const Home = () => {
  const { t, i18n } = useTranslation()

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

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
            <ParticlesA />

            <motion.div
              animate={{ y: [30, 150, 10], opacity: 1, scale: 1 }}
              transition={{
                duration: 3,
                delay: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
            >
              <h1 className={styles.text_reveal}>Hudson Kennedy</h1>
            </motion.div>

            <motion.div
              animate={{ x: [30, 150, 10], opacity: 1, scale: 1 }}
              transition={{
                duration: 3,
                delay: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
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
              <ThemeProvider theme={whatsappTheme}>
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
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Whatsapp"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <WhatsApp sx={{ color: '#fff', fontSize: 22 }} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>

              <ThemeProvider theme={emailTheme}>
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
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Email"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <Email sx={{ color: '#fff', fontSize: 22 }} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>

              <ThemeProvider theme={linkedinTheme}>
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
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Linkedin"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <LinkedIn sx={{ color: '#fff', fontSize: 22 }} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>

              <ThemeProvider theme={githubTheme}>
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
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Github"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <GitHub sx={{ color: '#fff', fontSize: 22 }} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>
            </div>

            <motion.div
              className={styles.btn_box}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: '0%' }}
              whileHover={{ scale: 1.2 }}
              transition={{
                duration: 2,
                delay: 0.7,
                ease: [0.2, 0, 0.2, 1],
              }}
            >
              <button
                className={styles.btn}
                onClick={() => {
                  setShowModal(true)
                }}
              >
                {t('home.resume')}
              </button>
            </motion.div>
          </div>

          <motion.div
            className={styles.home_img}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
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
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: '0%' }}
          whileHover={{ scale: 1.2 }}
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
            <ThemeProvider theme={modalTheme}>
              <Tooltip
                TransitionComponent={Zoom}
                title={t('home.download')}
                placement="left"
                arrow
              >
                <IconButton
                  className={styles.down_button}
                  onClick={handleDownload}
                >
                  <FileDownload className={styles.size_button} />
                </IconButton>
              </Tooltip>
              <Tooltip
                TransitionComponent={Zoom}
                title={t('home.close')}
                placement="right"
                arrow
              >
                <IconButton
                  className={styles.close_button}
                  onClick={() => setShowModal(false)}
                >
                  <Close className={styles.size_button} />
                </IconButton>
              </Tooltip>
            </ThemeProvider>
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
