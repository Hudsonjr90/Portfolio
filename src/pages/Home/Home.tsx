// CSS
import styles from "./Home.module.css";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// COMPONENTS
import Transition from "../../components/Transition";
import { Modal } from "react-bootstrap";
import { useState } from "react";

// REACT ICONS
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaXmark,
} from "react-icons/fa6";

// IMAGENS
import { useMediaQuery } from "react-responsive";
import HomeDesktopImage from "/imgs/my.png";
import HomeMobileImage from "/imgs/my-mobile.png";
// PARTICLES
import ParticlesBackground from "../../components/ParticlesBackground";
// FRAMER MOTION
import { motion } from "framer-motion";


const Home = () => {
  const imagesBr = [
    "/imgs/HudsonKennedy-BR_1.jpg",
    "/imgs/HudsonKennedy-BR_2.jpg",
    "/imgs/HudsonKennedy-BR_3.jpg",
  ];
  const imagesUs = [
    "/imgs/HudsonKennedy-US_1.jpg",
    "/imgs/HudsonKennedy-US_2.jpg",
    "/imgs/HudsonKennedy-US_3.jpg",
  ];

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageUrl = isMobile ? HomeMobileImage : HomeDesktopImage;

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageClick = (language: string) => {
    let images: string[] = [];
    switch (language) {
      case "pt-br":
        images = imagesBr;

        break;
      case "en-us":
        images = imagesUs;

        break;
      default:
        break;
    }
    setSelectedImages(selectedLanguage);
    setSelectedImages(images);
    setShowModal(true);
    setDropdownOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Transition onAnimationComplete={() => {}}>
        <section className={styles.home}>
          <div className={styles.home_content}>
            <ParticlesBackground />

            <h3 className={styles.first_h3}>
              Melhor a cada <span>Commit</span>
            </h3>

            <h1 className={styles.text_reveal}>
              <span>Hudson Kennedy</span>
              <span aria-hidden="true">Hudson Kennedy</span>
            </h1>

            <div className={styles.transparent_text}>
              <h3 className={styles.animation_text}>Desenvolvedor Fullstack</h3>
            </div>

            <div className={styles.social_media}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 3,
                  delay: 1.2,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="https://api.whatsapp.com/send?phone=5521969609121"
                  className={styles.whatsapp_link}
                  data-tooltip="WhatsApp"
                  target="_blank"
                  
                >
                  <FaWhatsapp />
                </NavLink>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 3,
                  delay: 1.5,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="mailto:hudsonhugo90@gmail.com?body=Olá Hudson, podemos conversar?&subject=Contato pelo Portfólio"
                  className={styles.email_link}
                  data-tooltip="Email"
                  target="_blank"
                >
                  <FaEnvelope />
                </NavLink>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.7,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="https://www.linkedin.com/in/hudsonkennedyjr"
                  className={styles.linkedin_link}
                  data-tooltip="Linkedin"
                  target="_blank"
                >
                  <FaLinkedinIn />
                </NavLink>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 3,
                  delay: 1.9,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <NavLink
                  to="https://github.com/Hudsonjr90"
                  className={styles.github_link}
                  data-tooltip="Github"
                  target="_blank"
                  
                >
                  <FaGithub />
                </NavLink>
              </motion.div>
            </div>

            <div className={styles.btn_box}>
              <div className={styles.dropdown}>
                <button className={styles.btn} onClick={handleDropdownToggle}>
                  Currículo
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdown_content}>
                    <button onClick={() => handleLanguageClick("pt-br")}>
                      pt-br
                    </button>
                    <button onClick={() => handleLanguageClick("en-us")}>
                      en-us
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <motion.div
            className={styles.home_img}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              duration: 2,
              delay: 0.7,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <img src={imageUrl} alt="home_img" />
          </motion.div>
        </section>
      </Transition>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className={styles.modal_container}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.modal_title}>
            Currículo <FaXmark onClick={handleCloseModal} />{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_content}>
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Currículo ${selectedLanguage} - Slide ${index + 1}`}
            />
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
