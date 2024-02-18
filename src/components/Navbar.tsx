// HOOKS
import { useState, useEffect, useRef } from "react";
import { useResponsiveNavbar } from "../hooks/useResponsiveNavbar";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// REACT ICONS
import { FaMoon, FaSun, FaPalette } from "react-icons/fa6";
// CSS 
import styles from "./Navbar.module.css";
// CONTEXT
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
    const [lightMode, setLightMode] = useState<boolean>(false);
    const [paletteOpen, setPaletteOpen] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [paletteInputInvisible, setPaletteInputInvisible] = useState<boolean>(false);
    const [soundClick, setSoundClick] = useState<boolean>(false)
    const { t } = useTranslation();


    const { mainColor, setMainColor } = useTheme();

    const { handleClickButton, handleLinkClick, showMenu } = useResponsiveNavbar();

    const handleToggleLightMode = () => {
        setLightMode(!lightMode);
        setPaletteInputInvisible(!lightMode);
    }

    useEffect(() => {
        if (lightMode) {
            document.body.classList.add('light_mode');
            setMainColor("#dc2626");
        } else {
            document.body.classList.remove('light_mode');
            setMainColor("#0ef");
            setTimeout(() => {
                document.body.style.transition = "background-color 1.5s, color 1.5s";
            }, 1500);
        }

    }, [lightMode])

    const handlePaletteToggle = () => {
        setPaletteOpen(!paletteOpen)
    }

    const handleColorSelection = (color: string) => {
        setSelectedColor(color);
    }

    useEffect(() => {
        if (selectedColor === "ball_0") {
            document.documentElement.style.setProperty("--main_color", "#ffb703");
            setMainColor("#ffb703");

        } else if (selectedColor === "ball_2") {
            document.documentElement.style.setProperty("--main_color", "#3a86ff");
            setMainColor("#3a86ff");

        } else if (selectedColor === "ball_1") {
            document.documentElement.style.setProperty("--text_color", "#8ecae6");
            setMainColor(mainColor)

        } else if (selectedColor === "ball_3") {
            document.documentElement.style.setProperty("--text_color", "#eb5e28");
            setMainColor(mainColor)

        } else if (selectedColor === "ball_4") {
            document.documentElement.style.setProperty("--main_color", "#0ef");
            document.documentElement.style.setProperty("--text_color", "#fff");
            setMainColor("#0ef");
        }

    }, [selectedColor]);

    const handleAudioButtonClick = () => {
        const audio = new Audio("/sounds/button_click.mp3");

        if (soundClick) {
            audio.pause(); 
        } else {
            audio.play();
        }
    };

    return (
        <header className={styles.header}>
            <NavLink
                to={"/"}
                className={styles.logo}
            >
                &lt; <span className={styles.logo_span}>H.K DEV</span>/&gt;
            </NavLink>

            <nav>
                <ul className={`${styles.links_list} ${showMenu ? styles.active : ""}`}>
                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 0 }}
                    >
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            Home
                        </NavLink>
                    </li>

                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 1 }}
                    >
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                           {t("menu.about")}
                        </NavLink>
                    </li>

                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 1 }}
                    >
                        <NavLink
                            to="/education"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            {t("menu.academic-education")}
                        </NavLink>
                    </li>

                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 1 }}
                    >
                        <NavLink
                            to="/testimonials"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            {t("menu.testimonials")}
                        </NavLink>
                    </li>

                    

                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 1 }}
                    >
                        <NavLink
                            to="/experiences"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            {t("menu.experiences")}
                        </NavLink>
                    </li>

                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 1 }}
                    >
                        <NavLink
                            to="/skills"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            {t("menu.skills")}
                        </NavLink>
                    </li>

                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 2 }}
                    >
                        <NavLink
                            to="/portfolio"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            {t("menu.portfolio")}
                        </NavLink>
                    </li>

                    <li
                        onClick={() => {
                            handleLinkClick();
                            handleAudioButtonClick();
                        }}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ ["--i" as string]: 3 }}
                    >
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                           {t("menu.contact")}
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className={styles.icons_container} id="container">
                <label>
                    <input
                        type="checkbox"
                        className={styles.input_darc_light_mode}
                        onClick={() => {
                            handleToggleLightMode();
                            handleAudioButtonClick();
                        }}
                    />

                    <FaMoon className={styles.moon_icon} />
                    <FaSun className={styles.sun_icon} />
                </label>

                <label style={{ display: paletteInputInvisible ? "none" : "" }}>
                    <input
                        type="checkbox"
                        className={styles.input_palette_colors}
                        onClick={() => {
                            handlePaletteToggle();
                            handleAudioButtonClick();
                        }}
                    />

                    <FaPalette className={styles.palette} />

                    <div className={`${styles.toggle_palette_theme}
                                     ${paletteOpen ? styles.palette_open : ""}`}
                    >
                        <button
                            className={`${styles.ball} ${styles.ball_0}`}
                            style={{ ["--p" as string]: 1 }}
                            onClick={() => handleColorSelection("ball_0")}
                        ></button>

                        <button
                            className={`${styles.ball} ${styles.ball_1}`}
                            style={{ ["--p" as string]: 2 }}
                            onClick={() => handleColorSelection("ball_1")}
                        ></button>

                        <button
                            className={`${styles.ball} ${styles.ball_2}`}
                            style={{ ["--p" as string]: 3 }}
                            onClick={() => handleColorSelection("ball_2")}
                        ></button>

                        <button
                            className={`${styles.ball} ${styles.ball_3}`}
                            style={{ ["--p" as string]: 4 }}
                            onClick={() => handleColorSelection("ball_3")}
                        ></button>

                        <button
                            className={`${styles.ball} ${styles.ball_4}`}
                            style={{ ["--p" as string]: 5 }}
                            onClick={() => handleColorSelection("ball_4")}
                        ></button>                        
                    </div>
                </label>

                <label>
                <LanguageSwitcher />
                </label>

                <button
                    onClick={() =>{
                        handleClickButton();
                        handleAudioButtonClick();
                    }}
                    className={`${styles.btn_menu}
                ${showMenu ? styles.active : ""}`}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
