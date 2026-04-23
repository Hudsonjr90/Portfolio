import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useWebSpeech } from "../../hooks/useWebSpeech";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import {
  mdiClose,
  mdiTextBox,
  mdiContrast,
  mdiVolumeLow,
  mdiVolumeOff,
  mdiHuman,
} from "@mdi/js";
import Tooltip from "@mui/material/Tooltip";
import styles from "./AccessibilityPanel.module.css";

const AccessibilityPanel = () => {
  const { t } = useTranslation();
  const { accessibility, setFontSize, toggleHighContrast } = useTheme();
  const { isSpeaking, isSupported, stop, speakSelectedText } = useWebSpeech();
  const [isOpen, setIsOpen] = useState(false);

  const fontSizeLabels = [
    t("accessibility.fontSizeMedium"),
    t("accessibility.fontSizeLarge"),
    t("accessibility.fontSizeXLarge"),
  ];

  const fontSizeLevels: Array<1 | 2 | 3> = [1, 2, 3];

  const handleFontSizeChange = (level: 1 | 2 | 3) => {
    setFontSize(accessibility.fontSizeLevel === level ? null : level);
  };

  const handleSpeakSelection = () => {
    if (isSpeaking) {
      stop();
    } else {
      speakSelectedText();
    }
  };

  return (
    <>
      {!isOpen && (
        <Tooltip title={t("accessibility.panel")}>
          <button
            className={styles.floatingButton}
            onClick={() => setIsOpen(true)}
            aria-label={t("accessibility.openPanel")}
            data-tour="accessibility-toggle"
          >
            <Icon path={mdiHuman} size={3} />
          </button>
        </Tooltip>
      )}

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <h3>{t("accessibility.panel")}</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label={t("accessibility.closePanel")}
            >
              <Icon path={mdiClose} size={1} />
            </button>
          </div>

          <div className={styles.content}>
            {/* Font Size Control */}
            <div className={styles.section}>
              <label className={styles.label}>
                <Icon path={mdiTextBox} size={0.8} />
                {t("accessibility.fontSize")}
              </label>
              <div className={styles.buttonGroup}>
                {fontSizeLevels.map((level, index) => (
                  <Tooltip key={level} title={fontSizeLabels[index]}>
                    <button
                      className={`${styles.sizeButton} ${
                        accessibility.fontSizeLevel === level
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => handleFontSizeChange(level)}
                      aria-label={`${t("accessibility.fontSize")} ${fontSizeLabels[index]}`}
                      aria-pressed={accessibility.fontSizeLevel === level}
                    >
                      A
                    </button>
                  </Tooltip>
                ))}
              </div>
              <small className={styles.hint}>
                {accessibility.fontSizeLevel === null
                  ? t("accessibility.fontSizeHint")
                  : t("accessibility.fontSizeResetHint")}
              </small>
            </div>

            <div className={styles.separator}></div>

            {/* High Contrast Toggle */}
            <div className={styles.section}>
              <label className={styles.label}>
                <Icon path={mdiContrast} size={0.8} />
                {t("accessibility.highContrast")}
              </label>
              <button
                className={`${styles.toggleButton} ${
                  accessibility.highContrast ? styles.active : ""
                }`}
                onClick={toggleHighContrast}
                aria-label={t("accessibility.toggleHighContrast")}
                aria-pressed={accessibility.highContrast}
              >
                <span>
                  {accessibility.highContrast
                    ? t("accessibility.enabled")
                    : t("accessibility.disabled")}
                </span>
              </button>
              <small className={styles.hint}>
                {t("accessibility.highContrastHint")}
              </small>
            </div>

            <div className={styles.separator}></div>

            {/* Text Reader Toggle */}
            {isSupported && (
              <div className={styles.section}>
                <label className={styles.label}>
                  <Icon
                    path={isSpeaking ? mdiVolumeLow : mdiVolumeOff}
                    size={0.8}
                  />
                  {t("accessibility.textReader")}
                </label>
                <button
                  className={`${styles.toggleButton} ${isSpeaking ? styles.active : ""}`}
                  onClick={handleSpeakSelection}
                  aria-label={
                    isSpeaking
                      ? t("accessibility.stopReading")
                      : t("accessibility.readText")
                  }
                  aria-pressed={isSpeaking}
                >
                  <span>
                    {isSpeaking
                      ? t("accessibility.stopReading")
                      : t("accessibility.selectAndClick")}
                  </span>
                </button>
                <small className={styles.hint}>
                  {t("accessibility.textReaderHint")}
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;
