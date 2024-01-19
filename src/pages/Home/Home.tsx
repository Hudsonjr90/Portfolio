// CSS
import styles from "./Home.module.css"
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// COMPONENTS
import Transition from '../../components/Transition';
//import Modal from '../../components/Modal';
// REACT ICONS
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
// IMGAGENS
import Home_img from "../../../public/imgs/my.png"
// PARTICLES
import ParticlesBackground from '../../components/ParticlesBackground';
// FRAMER MOTION
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <>
            <Transition onAnimationComplete={() => { }} >
                <section className={styles.home}>
                    <div className={styles.home_content}>
                        <ParticlesBackground />

                        <h3 className={styles.first_h3}>Inovando a cada <span>Byte</span></h3>

                        <h1 className={styles.animate_h1}>Hudson Kennedy</h1>

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
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <NavLink to="https://api.whatsapp.com/send?phone=5521969609121"
                                    className={styles.whatsapp_link}
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
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <NavLink to="mailto:hudsonhugo90@gmail.com?body=Olá Hudson, podemos conversar?&subject=Contato pelo Portfólio"
                                    className={styles.email_link}
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
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <NavLink to="https://www.linkedin.com/in/hudsonkennedyjr"
                                    className={styles.linkedin_link}
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
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <NavLink to="https://github.com/Hudsonjr90"
                                    className={styles.github_link}
                                >
                                    <FaGithub />
                                </NavLink>
                            </motion.div>
                        </div>

                        <div className={styles.btn_box}
                        >
                            <a
                                href="./cv/HudsonKennedy-BR.pdf"
                                download
                                className={styles.btn}
                            >
                                Currículo
                            </a>
                        </div>
                    </div>

                    <motion.div className={styles.home_img}
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: "0%" }}
                        transition={{
                            duration: 2,
                            delay: 0.7,
                            ease: [0.2, 0, 0.2, 1]
                        }}
                    >
                        <img src={Home_img} alt="home_img" />
                    </motion.div>
                </section>
            </Transition>
        </>
    );
};

export default Home; 



