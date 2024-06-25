// CSS
import styles from './Contact.module.css'
// HOOKS
import { SetStateAction, useState, useCallback } from 'react'
// REACT ROUTER DOM
import { NavLink } from 'react-router-dom'
// COMPONENT
import Transition from '../../components/Transition'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-number-input/input'
import Particles from 'react-tsparticles'
import { Engine, IOptions } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { useTheme } from '../../context/ThemeContext'
// EMAILJS
import emailjs from '@emailjs/browser'
// SWEETALERT
import Swal from 'sweetalert2'
// FRAMER MOTION
import { motion } from 'framer-motion'
// REACT ICONS
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import { whatsappTheme, emailTheme, linkedinTheme, githubTheme} from '../../context/ThemeContext'
import { ThemeProvider } from '@mui/material/styles'
import { WhatsApp, LinkedIn, Email, GitHub } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'


type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

const Contact = () => {
  const { t } = useTranslation()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const [nameError, setNameError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [phoneError, setPhoneError] = useState<boolean>(false)
  const [subjectError, setSubjectError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<boolean>(false)

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      subject === '' ||
      message === ''
    ) {
      setNameError(name === '')
      setEmailError(email === '')
      setPhoneError(phone === '')
      setSubjectError(subject === '')
      setMessageError(message === '')

      return
    }

    setNameError(false)
    setEmailError(false)
    setPhoneError(false)
    setSubjectError(false)
    setMessageError(false)

    const templateParams = {
      from_name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    }

    emailjs
      .send('gmailMessage', 'replyKey', templateParams, 'pg7uosKesPGRIzFWI')
      .then(
        (response) => {
          if (response.status === 200) {
            Swal.fire({
              title: 'Ótimo!',
              text: 'Mensagem enviada com sucesso!',
              icon: 'success',
            })
          }

          console.log('EMAIL ENVIADO', response.status, response.text)
          setName('')
          setEmail('')
          setPhone('')
          setSubject('')
          setMessage('')
        },
        (error) => {
          console.log('ERRO AO ENVIAR O EMAIL ', error)
        },
      )
  }

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

  return (
    <Transition onAnimationComplete={() => {}}>
      <Particles options={particlesConfig} init={particlesInit} />
      <section className={styles.contact}>
        <div className={styles.header_container}>
          <h2>
            <span>//</span>
            {t('contact.title')} <span>{t('contact.text')}</span>
          </h2>

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
        </div>

        <form className={styles.form} onSubmit={sendEmail}>
          <div className={styles.input_box}>
            <div className={`${styles.input_field} ${styles.field}`}>
              <input
                type="text"
                placeholder={t('contact.name')}
                className={`${styles.item} ${nameError ? styles.error : ''}`}
                id="name"
                onChange={(e) => {
                  setName(e.target.value)
                  setNameError(false)
                }}
                value={name}
              />

              <div
                id="error_name"
                className={`${styles.error_message} ${
                  nameError ? styles.show_message : ''
                }`}
              >
                {t('contact.error')}
              </div>
            </div>

            <div className={`${styles.input_field} ${styles.field}`}>
              <input
                type="email"
                placeholder={t('contact.email')}
                className={`${styles.item} ${emailError ? styles.error : ''}`}
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError(false)
                }}
                value={email}
              />

              <div
                id="error_email"
                className={`${styles.error_message} ${
                  emailError ? styles.show_message : ''
                }`}
              >
                {t('contact.error')}
              </div>
            </div>
          </div>

          <div className={styles.input_box}>
            <div className={`${styles.input_field} ${styles.field}`}>
              <PhoneInput
                country="BR"
                id="phone"
                placeholder={t('contact.phone')}
                maxLength={15}
                className={`${styles.item} ${phoneError ? styles.error : ''}`}
                value={phone}
                onChange={(value) => {
                  if (typeof value === 'string') {
                    setPhone(value)
                    setPhoneError(false)
                  }
                }}
              />

              <div
                id="error_phone"
                className={`${styles.error_message} ${
                  phoneError ? styles.show_message : ''
                }`}
              >
                {t('contact.error')}
              </div>
            </div>

            <div className={`${styles.input_field} ${styles.field}`}>
              <input
                type="text"
                placeholder={t('contact.subject')}
                id="subject"
                className={`${styles.item} ${subjectError ? styles.error : ''}`}
                onChange={(e) => {
                  setSubject(e.target.value)
                  setSubjectError(false)
                }}
                value={subject}
              />

              <div
                id="error_subject"
                className={`${styles.error_message} ${
                  subjectError ? styles.show_message : ''
                }`}
              >
                {t('contact.error')}
              </div>
            </div>
          </div>

          <div className={`${styles.textarea_field} ${styles.field}`}>
            <textarea
              name=""
              placeholder={t('contact.message')}
              id="message"
              cols={30}
              rows={10}
              className={`${styles.item} ${messageError ? styles.error : ''}`}
              onChange={(e) => {
                setMessage(e.target.value)
                setMessageError(false)
              }}
              value={message}
            ></textarea>

            <div
              id="error_message"
              className={`${styles.error_message} ${
                messageError ? styles.show_message : ''
              }`}
            >
              {t('contact.error')}
            </div>
          </div>

          <div className={styles.btn_box}>
            <button className={styles.btn} type="submit">
              {t('contact.submit')}
            </button>
          </div>
        </form>
      </section>
    </Transition>
  )
}

export default Contact
