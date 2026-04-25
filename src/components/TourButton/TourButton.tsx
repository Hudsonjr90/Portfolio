import React from 'react';
import Icon from "@mdi/react";
import { mdiCompassOutline } from "@mdi/js";
import { useTranslation } from 'react-i18next';
import { usePortfolioTour } from '../../hooks/usePortfolioTour';
import { navbarTheme } from '../../context/ThemeContext';
import { ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import styles from '../Header/Header.module.css';

interface TourButtonProps {
  currentPage: string;
  className?: string;
}

const TourButton: React.FC<TourButtonProps> = ({ currentPage, className }) => {
  const { t } = useTranslation();
  const { startTour } = usePortfolioTour();

  return (
    <ThemeProvider theme={navbarTheme}>
      <Tooltip title={t('tour.start')} placement="bottom" arrow>
        <button 
          onClick={() => startTour(currentPage)}
          aria-label={t('tour.start')}
          className={`${styles.tour_icon} ${className}`}
        >
          <Icon path={mdiCompassOutline} size={2} />
        </button>
      </Tooltip>
    </ThemeProvider>
  );
};

export default TourButton;