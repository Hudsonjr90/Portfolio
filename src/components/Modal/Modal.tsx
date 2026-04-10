import { useCallback, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaChevronLeft, FaChevronRight, FaChevronDown, FaUsers } from "react-icons/fa";
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
  carouselItems?: {
    title?: string;
    subtitle?: string;
    description?: string;
    pdf?: string;
    image?: string;
    icon?: React.ReactNode;
    date?: string;
    testimonials?: { name: string; text: string; img: string }[];
  }[];
  initialPage?: number;
  loopNavigation?: boolean;
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
  carouselItems = [],
  initialPage = 0,
  loopNavigation = false,
}: ModalProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [expandedTestimonialIndex, setExpandedTestimonialIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const hasCarouselItems = carouselItems.length > 0;
  const totalPages = hasCarouselItems ? carouselItems.length : images.length;
  const currentItem = hasCarouselItems ? carouselItems[currentPage] : null;
  const currentImage = hasCarouselItems ? currentItem?.image : images[currentPage];
  const currentTitle = currentItem?.title ?? title;
  const currentSubtitle = currentItem?.subtitle ?? subtitle;
  const currentDescription = currentItem?.description ?? description;
  const currentDate = currentItem?.date ?? date;
  const currentIcon = currentItem?.icon ?? icon;
  const currentPdf = currentItem?.pdf ?? pdf;

  useEffect(() => {
    if (show) {
      setCurrentPage(initialPage);
    }
  }, [initialPage, show]);

  useEffect(() => {
    setShowTestimonials(false);
    setExpandedTestimonialIndex(null);
  }, [currentPage]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleDownload = useCallback(() => {
    if (!currentPdf) return;

    const fileName = currentPdf.split("/").pop();
    fetch(currentPdf)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, fileName))
      .catch(console.error);
  }, [currentPdf]);

  const handleNextPage = useCallback(() => {
    if (totalPages <= 1) return;

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      return;
    }

    if (loopNavigation) {
      setCurrentPage(0);
    }
  }, [currentPage, loopNavigation, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (totalPages <= 1) return;

    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      return;
    }

    if (loopNavigation) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, loopNavigation, totalPages]);

  const hasMultiplePages = totalPages > 1;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const isPrevDisabled = !loopNavigation && isFirstPage;
  const isNextDisabled = !loopNavigation && isLastPage;

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div className={styles.modal_container}>
        <div className={styles.modal_title}>
          <div className={styles.modal_header_top}>
            <div className={styles.modal_header_identity}>
              {currentIcon && <span className={styles.modal_icon}>{currentIcon}</span>}
              {currentTitle && <h3 className={styles.modal_title_text}>{currentTitle}</h3>}
            </div>

            <div className={styles.modal_actions_mobile}>
              <ThemeProvider theme={navbarTheme}>
                {currentPdf && (
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

          <div className={styles.modal_header_bottom}>
            {currentSubtitle && <p className={styles.modal_subtitle}>{currentSubtitle}</p>}

            {hasMultiplePages && (
              <div className={styles.modal_nav_inline}>
                <ThemeProvider theme={navbarTheme}>
                  <div className={styles.pagination_controls}>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={t("home.previous")}
                      placement="top"
                      arrow
                    >
                      <span>
                        <IconButton
                          className={`${styles.nav_button} ${isPrevDisabled ? styles.disabled : ''}`}
                          onClick={handlePreviousPage}
                          disabled={isPrevDisabled}
                        >
                          <FaChevronLeft className={styles.nav_icon} />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <div className={styles.page_indicator}>
                      <span className={styles.page_text}>
                        {currentPage + 1} / {totalPages}
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
                          className={`${styles.nav_button} ${isNextDisabled ? styles.disabled : ''}`}
                          onClick={handleNextPage}
                          disabled={isNextDisabled}
                        >
                          <FaChevronRight className={styles.nav_icon} />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </div>
                </ThemeProvider>
              </div>
            )}
          </div>

          <div className={styles.modal_actions_desktop}>
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
                        className={`${styles.nav_button} ${isPrevDisabled ? styles.disabled : ''}`}
                        onClick={handlePreviousPage}
                        disabled={isPrevDisabled}
                      >
                        <FaChevronLeft className={styles.nav_icon} />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <div className={styles.page_indicator}>
                    <span className={styles.page_text}>
                      {currentPage + 1} / {totalPages}
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
                        className={`${styles.nav_button} ${isNextDisabled ? styles.disabled : ''}`}
                        onClick={handleNextPage}
                        disabled={isNextDisabled}
                      >
                        <FaChevronRight className={styles.nav_icon} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </div>
              )}

              {currentPdf && (
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

        {currentDescription && (
          <div className={styles.modal_description_container}>
            <p className={styles.modal_description}>{currentDescription}</p>
          </div>
        )}

        {currentDate && (
          <div className={styles.modal_date_container}>
            <span className={styles.modal_date}>{currentDate}</span>
          </div>
        )}

        <div className={styles.modal_content} ref={contentRef}>
          {currentImage && (
            <div className={styles.modal_image_container}>
              <motion.img
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                src={currentImage}
                alt={`${currentTitle ?? "Modal"} - Página ${currentPage + 1}`}
                loading="lazy"
                className={styles.modal_image}
              />
            </div>
          )}

          {currentItem?.testimonials !== undefined && (
            <div className={styles.modal_testimonials_section}>
              <button
                className={styles.modal_testimonials_master}
                onClick={() => {
                  setShowTestimonials((prev) => !prev);
                  setExpandedTestimonialIndex(null);
                }}
                aria-expanded={showTestimonials}
              >
                <FaUsers className={styles.modal_testimonials_master_icon} />
                {t("menu.testimonials")}
                {currentItem.testimonials.length > 0 && (
                  <span className={styles.modal_testimonials_count}>
                    ({currentItem.testimonials.length})
                  </span>
                )}
                <FaChevronDown
                  className={`${styles.modal_testimonials_chevron} ${
                    showTestimonials ? styles.chevron_open : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showTestimonials && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className={styles.modal_testimonials_content}
                  >
                    {currentItem.testimonials.length === 0 ? (
                      <p className={styles.modal_testimonials_empty}>
                        {t("testimonials.noTestimonials")}
                      </p>
                    ) : (
                      <div className={styles.modal_testimonials_list}>
                        {currentItem.testimonials.map((testimonial, index) => (
                          <div key={index} className={styles.modal_testimonial_item}>
                            <button
                              className={styles.modal_testimonial_header}
                              onClick={() =>
                                setExpandedTestimonialIndex((prev) =>
                                  prev === index ? null : index
                                )
                              }
                              aria-expanded={expandedTestimonialIndex === index}
                            >
                              <img
                                src={testimonial.img}
                                alt={testimonial.name}
                                className={styles.modal_testimonial_avatar}
                              />
                              <strong className={styles.modal_testimonial_name}>
                                {testimonial.name}
                              </strong>
                              <FaChevronDown
                                className={`${styles.modal_testimonial_chevron} ${
                                  expandedTestimonialIndex === index
                                    ? styles.chevron_open
                                    : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {expandedTestimonialIndex === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className={styles.modal_testimonial_body}
                                >
                                  <p className={styles.modal_testimonial_text}>
                                    {testimonial.text}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
