import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
    switch (lng) {
      case "en":
        break;
      case "pt":
        break;
      default:
        break;
    }
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.lng_box}>
      <div className={styles.dropdown}>
        <button className={styles.lng_btn}>
          <GrLanguage onClick={handleDropdownToggle} />
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdown_content}>
            <button onClick={() => changeLanguage("pt")}>
              <img src="/imgs/pt-flag.png" alt="PT Flag" />
            </button>
            <button onClick={() => changeLanguage("en")}>
              <img src="/imgs/en-flag.png" alt="EN Flag" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
