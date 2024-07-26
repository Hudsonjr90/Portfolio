import React, { useState, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import Transition from '../../components/Transition/Transition';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import {
  whatsappTheme,
  emailTheme,
  linkedinTheme,
  githubTheme,
} from '../../context/ThemeContext';
import { ThemeProvider } from '@mui/material/styles';
import { WhatsApp, LinkedIn, Email, GitHub } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import HomeDesktopImage from '/imgs/my.webp';
import HomeMobileImage from '/imgs/my-mobile.webp';
import { motion } from 'framer-motion';
import ParticlesA from '../../components/Particles/ParticlesA';
import useMediaQuery from '@mui/material/useMediaQuery';
import Modal from '../../components/Modal/Modal';
import styles from './Home.module.css';

const Home = React.memo(() => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const imageUrl = isMobile ? HomeMobileImage : HomeDesktopImage;
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const typedStrings = useMemo(() => {
    return [
      t('home.function1'),
      t('home.function2'),
      t('home.function3'),
      t('home.function4'),
    ];
  }, [t]);

  return (
    <>
      <Transition onAnimationComplete={() => {}}>
        <motion.section className={styles.home}>
          <motion.div className={styles.home_content}>
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

            <motion.div className={styles.social_media}>
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
            </motion.div>

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
              <button className={styles.btn} onClick={handleOpenModal}>
                {t('home.resume')}
              </button>
            </motion.div>
          </motion.div>

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
        </motion.section>
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
      <Modal show={showModal} onClose={handleCloseModal} />
    </>
  );
});

export default Home;
