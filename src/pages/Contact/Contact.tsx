import React, { Suspense, useState, useEffect } from "react";
import styles from "./Contact.module.css";
import { useTranslation } from "react-i18next";
import Transition from "../../components/Transition/Transition";
import Lottie from "lottie-react";
import animationData from "../../assets/about.json";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  whatsappTheme,
  emailTheme,
  linkedinTheme,
  githubTheme,
} from "../../context/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import { FaWhatsapp, FaLinkedin, FaGithub, FaHeadset } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs-config';

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Hudson Kennedy',
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID, 
        EMAILJS_CONFIG.TEMPLATE_ID, 
        templateParams, 
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Transition onAnimationComplete={() => {}}>
      <Suspense fallback={<div>{t("home.loading")}</div>}>
        <ParticlesB />
      </Suspense>
      <section className={styles.contact}>
        <h2 className={styles.heading}>
          {t("contact.title")}
          <span>
            {t("contact.text")} <FaHeadset />{" "}
          </span>
        <motion.div
          className={styles.social_media}
          data-tour="contact-social-media"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={whatsappTheme}>
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
                    <FaWhatsapp className={styles.icon} />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </ThemeProvider>
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={emailTheme}>
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
                    <MdEmail className={styles.icon} />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </ThemeProvider>
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={linkedinTheme}>
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
                    <FaLinkedin className={styles.icon} />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </ThemeProvider>
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={githubTheme}>
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
                    <FaGithub className={styles.icon} />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </ThemeProvider>
          </motion.div>
        </motion.div>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: "easeOut",
          }}
          className={styles.contentContainer}
        >
          {/* Seção do Formulário */}
          <div
            className={styles.formSection}
            data-tour="contact-form"
         >
            <h3 className={styles.formTitle}>
              {t("contact.formTitle")}
            </h3>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder={t("contact.namePlaceholder")}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder={t("contact.emailPlaceholder")}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  {t("contact.subjectLabel")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder={t("contact.subjectPlaceholder")}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={styles.textarea}
                  placeholder={t("contact.messagePlaceholder")}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("contact.sending") : t("contact.sendButton")}
              </button>
              
              {/* Feedback de status */}
              {submitStatus === 'success' && (
                <motion.div 
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {t("contact.successMessage")}
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div 
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {t("contact.errorMessage")}
                </motion.div>
              )}
            </form>
            
          </div>

          {/* Seção da Animação */}
          <div className={styles.mediaSection}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 60, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={styles.lottieMotion}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lottie animationData={animationData} loop={true} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Transition>
  );
};

export default Contact;
