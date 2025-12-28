import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { ThemeProvider } from "@mui/material/styles";
import { Tooltip, IconButton, Zoom } from "@mui/material";
import styles from "./Modal.module.css";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { navbarTheme } from "../../context/ThemeContext";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  description?: string;
  pdf?: string;
  images?: string[];
  icon?: React.ReactNode;
}

const Modal = ({
  show,
  onClose,
  title,
  subtitle,
  description,
  pdf,
  images = [],
  icon,
}: ModalProps) => {
  const { t } = useTranslation();

  const handleDownload = useCallback(() => {
    if (!pdf) return;

    const fileName = pdf.split("/").pop();
    fetch(pdf)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, fileName))
      .catch(console.error);
  }, [pdf]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div className={styles.modal_container}>
        {/* HEADER */}
        <div className={styles.modal_title}>
          <div className={styles.modal_header_content}>
            {icon && <span className={styles.modal_icon}>{icon}</span>}
            <div className={styles.modal_text_content}>
              {title && <h3 className={styles.modal_title_text}>{title}</h3>}
              {subtitle && <p className={styles.modal_subtitle}>{subtitle}</p>}
            </div>
          </div>
          
          <div className={styles.modal_actions}>
            <ThemeProvider theme={navbarTheme}>
              {pdf && (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={t("home.download")}
                  placement="left"
                  arrow
                >
                  <IconButton
                    className={styles.down_button}
                    onClick={handleDownload}
                  >
                    <FaDownload className={styles.size_button} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip
                TransitionComponent={Zoom}
                title={t("home.close")}
                placement="right"
                arrow
              >
                <IconButton className={styles.close_button} onClick={onClose}>
                  <GrClose className={styles.size_button} />
                </IconButton>
              </Tooltip>
            </ThemeProvider>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        {description && (
          <div className={styles.modal_description_container}>
            <p className={styles.modal_description}>{description}</p>
          </div>
        )}

        {/* CONTEÚDO */}
        <div className={styles.modal_content}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${title} - ${index + 1}`}
              loading="lazy"
              className={styles.modal_image}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
