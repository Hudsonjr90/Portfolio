import styles from './Contact.module.css';
import React, { Suspense, useState } from 'react';
import Transition from '../../components/Transition/Transition';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input/input';
import Swal from 'sweetalert2';
import axios from 'axios';

const ParticlesB = React.lazy(() => import('../../components/Particles/ParticlesB'));

const Contact = () => {
  const { t } = useTranslation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [subjectError, setSubjectError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => phone.replace(/\D/g, '').length >= 8;

  const validateField = (
    _field: string,
    value: string,
    setError: (error: boolean) => void,
    validationFn?: (value: string) => boolean
  ) => {
    if (value === '' || (validationFn && !validationFn(value))) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (name === '') { setNameError(true); isValid = false; } else { setNameError(false); }
    if (!validateEmail(email)) { setEmailError(true); isValid = false; } else { setEmailError(false); }
    if (!validatePhone(phone)) { setPhoneError(true); isValid = false; } else { setPhoneError(false); }
    if (subject === '') { setSubjectError(true); isValid = false; } else { setSubjectError(false); }
    if (message === '') { setMessageError(true); isValid = false; } else { setMessageError(false); }

    return isValid;
  };

  async function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("https://api.web3forms.com/submit", {
        access_key: import.meta.env.VITE_APP_ACCESS_KEY,
        name,
        email,
        phone,
        subject,
        message,
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Ótimo!',
          text: 'Mensagem enviada com sucesso!',
          icon: 'success',
        });
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.',
        icon: 'error',
      });
      console.error("Erro ao enviar formulário:", error);
    }
  }

  return (
    <Transition onAnimationComplete={() => {}}>
     <Suspense fallback={<div>{t("home.loading")}</div>}>
        <ParticlesB />
      </Suspense>
      <section className={styles.contact}>
        <div className={styles.header_container}>
          <h2>
            <span>//</span>
            {t('contact.title')} <span>{t('contact.text')}</span>
          </h2>
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
                  validateField('name', e.target.value, setNameError)
                }}
                onBlur={(e) => validateField('name', e.target.value, setNameError)}
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
                  validateField('email', e.target.value, setEmailError, validateEmail)
                }}
                onBlur={(e) => validateField('email', e.target.value, setEmailError, validateEmail)}
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
                    validateField('phone', value, setPhoneError, validatePhone)
                  }
                }}
                onBlur={(e: { target: { value: string } }) => validateField('phone', e.target.value, setPhoneError, validatePhone)}
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
                  validateField('subject', e.target.value, setSubjectError)
                }}
                onBlur={(e) => validateField('subject', e.target.value, setSubjectError)}
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
                validateField('message', e.target.value, setMessageError)
              }}
              onBlur={(e) => validateField('message', e.target.value, setMessageError)}
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
