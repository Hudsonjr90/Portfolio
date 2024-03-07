// CSS
import styles from "./Home.module.css";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// COMPONENTS
import Transition from "../../components/Transition";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

// REACT ICONS
import {
  FaCircleArrowDown,
  FaCircleXmark,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
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
  const { t, i18n } = useTranslation();

  const imagesBr = [
    "/imgs/imgCv/HudsonKennedyBR-1.png",
    "/imgs/imgCv/HudsonKennedyBR-2.png",
    "/imgs/imgCv/HudsonKennedyBR-3.png",
  ];

  const imagesUs = [
    "/imgs/imgCv/HudsonKennedyUS-1.png",
    "/imgs/imgCv/HudsonKennedyUS-2.png",
    "/imgs/imgCv/HudsonKennedyUS-3.png",
  ];

  const imagesFr = [
    "/imgs/imgCv/HudsonKennedyFR-1.png",
    "/imgs/imgCv/HudsonKennedyFR-2.png",
    "/imgs/imgCv/HudsonKennedyFR-3.png",
  ];

  const imagesIt = [
    "/imgs/imgCv/HudsonKennedyIT-1.png",
    "/imgs/imgCv/HudsonKennedyIT-2.png",
    "/imgs/imgCv/HudsonKennedyIT-3.png",
  ];

  const imagesEs = [
    "/imgs/imgCv/HudsonKennedyES-1.png",
    "/imgs/imgCv/HudsonKennedyES-2.png",
    "/imgs/imgCv/HudsonKennedyES-3.png",
  ];

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const imageUrl = isMobile ? HomeMobileImage : HomeDesktopImage;

  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [soundClick, setSoundClick] = useState<boolean>(false);
  

  useEffect(() => {
    // Função para carregar as imagens e o PDF com base no idioma selecionado
    const loadContent = () => {
      let images: string[] = [];
      let pdfPath: string | null = null;
      switch (i18n.language) {
        case "pt":
          images = imagesBr;
          pdfPath = "/public/cv/HudsonKennedy-BR.pdf";
          break;
        case "en":
          images = imagesUs;
          pdfPath = "/public/cv/HudsonKennedy-US.pdf";
          break;
        case "fr":
          images = imagesFr;
          pdfPath = "/public/cv/HudsonKennedy-FR.pdf";
          break;
        case "it":
          images = imagesIt;
          pdfPath = "/public/cv/HudsonKennedy-IT.pdf";
          break;
        case "es":
          images = imagesEs;
          pdfPath = "/public/cv/HudsonKennedy-ES.pdf";
          break;
        default:
          break;
      }
      setSelectedImages(images);
      setSelectedPdf(pdfPath);
    };

    // Carregar o conteúdo quando o componente montar e sempre que o idioma mudar
    loadContent();
  }, [i18n.language]);

  const handleDownload = (_filePath: any) => {
    if (selectedPdf) {
      const link = document.createElement("a");
      link.href = selectedPdf;
      link.download = selectedPdf.split("/").pop() || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowModal(false);
    }
  };

  const handleAudioButtonClick = () => {
    const audio = new Audio("/sounds/button_click.mp3");

    if (soundClick) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const [typedStrings, setTypedStrings] = useState<string[]>([]);

  useEffect(() => {

    const strings = [
      t("home.function1"),
      t("home.function2"),
      t("home.function3"),
      t("home.function4"),    
    ];
    setTypedStrings(strings);
  }, [t]);

  

  return (
    <>
      <Transition onAnimationComplete={() => {}}>
        <section className={styles.home}>
          <div className={styles.home_content}>
            <ParticlesBackground />

            <h3 className={styles.first_h3}>
              {t("home.title")} <span>Commit</span>
            </h3>

            <h1 className={styles.text_reveal}>
              <span>Hudson Kennedy</span>
              <span aria-hidden="true">Hudson Kennedy</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, x: "80%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{
                duration: 2,
                delay: 0.3,
                ease: [0.3, 0, 0.2, 1],
              }}
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
                  target="_blank"
                >
                  <FaGithub />
                </NavLink>
              </motion.div>
            </div>

            <div className={styles.btn_box}>
              <button
                className={styles.btn}
                onClick={() => {
                  setShowModal(true);
                  handleAudioButtonClick();
                }}
              >
                {t("home.resume")}
              </button>
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
            <div className={styles.ring}>
              <i></i>
              <i></i>
              <i></i>
              <img src={imageUrl} alt="home_img" />
            </div>
          </motion.div>
        </section>
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
              title={t("home.download")}
            />
            <FaCircleXmark
              className={styles.close_button}
              title={t("home.close")}
              onClick={() => {
                setShowModal(false);
                handleAudioButtonClick();
              }}
            />
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
  );
};

export default Home;
