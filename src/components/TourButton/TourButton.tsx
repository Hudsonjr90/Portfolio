import React from 'react';
import { LuRoute } from "react-icons/lu";
import { useTranslation } from 'react-i18next';
import { usePortfolioTour } from '../../hooks/usePortfolioTour';
import { navbarTheme } from '../../context/ThemeContext';
import { ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import styles from '../Navbar/Navbar.module.css';

interface TourButtonProps {
  currentPage: string;
}

const TourButton: React.FC<TourButtonProps> = ({ currentPage }) => {
  const { t } = useTranslation();
  const { startTour } = usePortfolioTour();

  return (
    <ThemeProvider theme={navbarTheme}>
      <Tooltip title={t('tour.start')} placement="left" arrow>
        <button 
          className={styles.tour_icon}
          onClick={() => startTour(currentPage)}
          aria-label={t('tour.start')}
        >
          <LuRoute />
        </button>
      </Tooltip>
    </ThemeProvider>
  );
};

export default TourButton;