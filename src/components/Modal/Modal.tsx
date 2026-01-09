import { useCallback, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  date?: string;
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
  date,
}: ModalProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset page quando modal abrir
  useEffect(() => {
    if (show) {
      setCurrentPage(0);
    }
  }, [show]);

  // Scroll para o topo quando mudar de página
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleDownload = useCallback(() => {
    if (!pdf) return;

    const fileName = pdf.split("/").pop();
    fetch(pdf)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, fileName))
      .catch(console.error);
  }, [pdf]);

  const handleNextPage = useCallback(() => {
    if (currentPage < images.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, images.length]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const hasMultiplePages = images.length > 1;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === images.length - 1;

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
              {hasMultiplePages && (
                <div className={styles.pagination_controls}>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={t("home.previous")}
                    placement="top"
                    arrow
                  >
                    <span>
                      <IconButton
                        className={`${styles.nav_button} ${isFirstPage ? styles.disabled : ''}`}
                        onClick={handlePreviousPage}
                        disabled={isFirstPage}
                      >
                        <FaChevronLeft className={styles.nav_icon} />
                      </IconButton>
                    </span>
                  </Tooltip>
                  
                  <div className={styles.page_indicator}>
                    <span className={styles.page_text}>
                      {currentPage + 1} / {images.length}
                    </span>
                  </div>
                  
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={t("home.next")}
                    placement="top"
                    arrow
                  >
                    <span>
                      <IconButton
                        className={`${styles.nav_button} ${isLastPage ? styles.disabled : ''}`}
                        onClick={handleNextPage}
                        disabled={isLastPage}
                      >
                        <FaChevronRight className={styles.nav_icon} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </div>
              )}
              
              {pdf && (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={t("home.download")}
                  placement="top"
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
                placement="top"
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

        {date && (
          <div className={styles.modal_date_container}>
            <span className={styles.modal_date}>{date}</span>
          </div>
        )}

        {/* CONTEÚDO */}
        <div className={styles.modal_content} ref={contentRef}>
          {images.length > 0 && (
            <motion.img
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              src={images[currentPage]}
              alt={`${title} - Página ${currentPage + 1}`}
              loading="lazy"
              className={styles.modal_image}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
