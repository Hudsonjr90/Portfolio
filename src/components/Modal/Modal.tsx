import styles from './Modal.module.css';
import { useState, useEffect, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { modalTheme } from '../../context/ThemeContext';
import { FileDownload, Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import resumeServer from '../../data/resumeServer';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal = ({ show, onClose }: ModalProps) => {
  if (!show) return null;

  const { t, i18n } = useTranslation();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const handleDownload = useCallback(() => {
    if (selectedPdf) {
      const fileName = selectedPdf.split('/').pop()?.replace('.pdf', '');
      if (fileName) {
        fetch(selectedPdf)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${fileName}.pdf`);
          })
          .catch((error) => {
            console.error('Error downloading PDF:', error);
          });
      }
    }
  }, [selectedPdf]);

  useEffect(() => {
    const loadContent = () => {
      let images: string[] = [];
      let pdfPath: string | null = null;
      switch (i18n.language) {
        case 'pt':
          images = resumeServer.br;
          pdfPath = '/cv/HudsonKennedy-BR.pdf';
          break;
        case 'en':
          images = resumeServer.us;
          pdfPath = '/cv/HudsonKennedy-US.pdf';
          break;
        case 'fr':
          images = resumeServer.fr;
          pdfPath = '/cv/HudsonKennedy-FR.pdf';
          break;
        case 'it':
          images = resumeServer.it;
          pdfPath = '/cv/HudsonKennedy-IT.pdf';
          break;
        case 'es':
          images = resumeServer.es;
          pdfPath = '/cv/HudsonKennedy-ES.pdf';
          break;
        default:
          break;
      }
      setSelectedImages(images);
      setSelectedPdf(pdfPath);
    };

    loadContent();
  }, [i18n.language]);

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_title}>
        <ThemeProvider theme={modalTheme}>
          <Tooltip TransitionComponent={Zoom} title={t('home.download')} placement="left" arrow>
            <IconButton className={styles.down_button} onClick={handleDownload}>
              <FileDownload className={styles.size_button} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title={t('home.close')} placement="right" arrow>
            <IconButton className={styles.close_button} onClick={onClose}>
              <Close className={styles.size_button} />
            </IconButton>
          </Tooltip>
        </ThemeProvider>
      </div>
      <div className={styles.modal_content}>
        {selectedImages.map((image, index) => (
          <img key={index} src={image} alt={`Currículo ${i18n.language} - Slide ${index + 1}`} loading="lazy" />
        ))}
      </div>
    </div>
  );
};

export default Modal;
