import styles from './Contact.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Transition from '../../components/Transition/Transition'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-number-input/input'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import { whatsappTheme, emailTheme, linkedinTheme, githubTheme} from '../../context/ThemeContext'
import { ThemeProvider } from '@mui/material/styles'
import { WhatsApp, LinkedIn, Email, GitHub } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import ParticlesB from '../../components/Particles/ParticlesB'



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


  return (
    <Transition onAnimationComplete={() => {}}>
      <ParticlesB />
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
