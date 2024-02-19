import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { i18n } = useTranslation();
  const [soundClick, setSoundClick] = useState<boolean>(false);

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
    switch (lng) {
      case "en":
        break;
      case "pt":
        break;
      case "fr":
        break;
      case "it":
        break;
      case "es":
        break;
      default:
        break;
    }
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleAudioButtonClick = () => {
    const audio = new Audio("/sounds/button_click.mp3");

    if (soundClick) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div className={styles.lng_box}>
      <div className={styles.dropdown}>
        <button className={styles.lng_btn}>
          <GrLanguage
            onClick={() => {
              handleDropdownToggle();
              handleAudioButtonClick();
            }}
          />
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdown_content}>
            <button
              onClick={() => {
                changeLanguage("pt");
                handleAudioButtonClick();
              }}
            >
              <img src="/imgs/pt-flag.png" alt="PT Flag" />
            </button>
            <button
              onClick={() => {
                changeLanguage("en");
                handleAudioButtonClick();
              }}
            >
              <img src="/imgs/en-flag.png" alt="EN Flag" />
            </button>
            {/* <button
              onClick={() => {
                changeLanguage("fr");
                handleAudioButtonClick();
              }}
            >
              <img src="/imgs/fr-flag.png" alt="FR Flag" />
            </button>

            <button
              onClick={() => {
                changeLanguage("it");
                handleAudioButtonClick();
              }}
            >
              <img src="/imgs/it-flag.png" alt="IT Flag" />
            </button>

            <button
              onClick={() => {
                changeLanguage("es");
                handleAudioButtonClick();
              }}
            >
              <img src="/imgs/es-flag.png" alt="ES Flag" />
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
