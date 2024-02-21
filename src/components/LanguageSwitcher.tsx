import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import { Us, Fr, Br, Es, It } from "react-flags-select";
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
              <Br className={styles.flags} />
            </button>
            <button
              onClick={() => {
                changeLanguage("en");
                handleAudioButtonClick();
              }}
            >
              <Us className={styles.flags} />
            </button>
            
            <button
              onClick={() => {
                changeLanguage("fr");
                handleAudioButtonClick();
              }}
            >
             <Fr className={styles.flags} />
            </button>

            <button
              onClick={() => {
                changeLanguage("it");
                handleAudioButtonClick();
              }}
            >
             <It className={styles.flags} />
            </button>

            <button
              onClick={() => {
                changeLanguage("es");
                handleAudioButtonClick();
              }}
            >
             <Es className={styles.flags} />
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
