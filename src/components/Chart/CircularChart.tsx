import React, { useMemo, useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import styles from './CircularChart.module.css';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

interface ChartData {
  name: string;
  value: number;
  skillCount?: number;
  category?: string;
  skills?: any[];
}

interface CircularChartProps {
  data: ChartData[];
  title?: string;
  subtitle?: string;
  height?: number;
  onChartClick?: (params: any) => void;
  showLegend?: boolean;
  roseType?: boolean;
  isMobile?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

const CircularChart: React.FC<CircularChartProps> = ({
  data,
  title,
  subtitle,
  height = 500,
  onChartClick,
  showLegend = true,
  roseType = false,
  isMobile = false,
  showBackButton = false,
  onBackClick,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search skills...',
}) => {
  const { t } = useTranslation();
  const { mainColor } = useTheme();
  const [themeKey, setThemeKey] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const handleSearchWrapperClick = () => {
    searchInputRef.current?.focus();
  };
  
  useEffect(() => {
    const detectThemeChange = () => {
      setThemeKey(prev => prev + 1);
    };
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          detectThemeChange();
        }
      });
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  const isDarkMode = useMemo(() => {
    const hasLightMode = document.body.classList.contains('light_mode');
    return !hasLightMode; 
  }, [themeKey]); 

  const neonColors = useMemo(() => {
    if (isDarkMode) {
      return isMobile ? [
        '#4a90e2', 
        '#8e44ad',
        '#27ae60',
        '#f39c12',
        '#e74c3c',
        '#16a085',
        '#9b59b6',
        '#2c3e50',
      ] : [
        '#0ef6cc', 
        '#00ff88',
        '#ff0099',
        '#9933ff',
        '#ffaa00',
        '#00aaff',
        '#ff3366',
        '#66ff99',
      ];
    } else {
      return isMobile ? [
        '#5dade2',
        '#af7ac5',
        '#58d68d',
        '#f7dc6f',
        '#f1948a',
        '#73c6b6',
        '#bb8fce',
        '#85c1e9',
      ] : [
        '#f65151',
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#f9ca24',
        '#6c5ce7',
        '#fd79a8',
        '#00b894',
      ];
    }
  }, [isDarkMode, isMobile]);

  const categoryColors: { [key: string]: string } = useMemo(() => {
    if (isMobile) {
      return {
        frontend: isDarkMode ? '#4a90e2' : '#5dade2',
        backend: isDarkMode ? '#8e44ad' : '#af7ac5',
        database: isDarkMode ? '#27ae60' : '#58d68d',
        tools: isDarkMode ? '#f39c12' : '#f7dc6f',
        deploy: isDarkMode ? '#e74c3c' : '#f1948a',
        design: isDarkMode ? '#9b59b6' : '#bb8fce',
      };
    }
    
    return {
      frontend: isDarkMode ? '#0ef6cc' : '#f65151',
      backend: isDarkMode ? '#ff0099' : '#e74c3c',
      database: isDarkMode ? '#00ff88' : '#27ae60',
      tools: isDarkMode ? '#00aaff' : '#3498db',
      deploy: isDarkMode ? '#ffaa00' : '#f39c12',
      design: isDarkMode ? '#9933ff' : '#9b59b6',
    };
  }, [isDarkMode, isMobile]);

  const chartOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      title: title ? {
        text: title,
        subtext: subtitle,
        left: 'center',
        top: '0%',
        textStyle: {
          color: mainColor,
          fontSize: isMobile ? 18 : 24,
          fontWeight: 'bold',
          textShadowColor: isMobile ? 
            (isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)') :
            (isDarkMode ? 'rgba(14, 246, 204, 0.5)' : 'rgba(246, 81, 81, 0.3)'),
          textShadowBlur: isMobile ? 3 : (isDarkMode ? 10 : 5),
          textShadowOffsetX: 0,
          textShadowOffsetY: 0,
        },
        subtextStyle: {
          color: mainColor,
          fontSize: isMobile ? 12 : 14,
          opacity: 0.8,
        },
      } : undefined,
      tooltip: {
        trigger: 'item',
        backgroundColor: isMobile ? 
          (isDarkMode ? 'rgba(0,0,0,0.98)' : 'rgba(255,255,255,0.98)') : 
          (isDarkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'),
        borderColor: mainColor,
        borderWidth: isMobile ? 3 : 2,  
        borderRadius: isMobile ? 12 : 8, 
        textStyle: {
          color: isDarkMode ? '#fff' : '#333',
          fontSize: isMobile ? 14 : 14,
          fontWeight: 'bold',
        },
        extraCssText: `
          backdrop-filter: blur(${isMobile ? '8px' : '10px'});
          box-shadow: 0 ${isMobile ? '4px' : '8px'} ${isMobile ? '16px' : '32px'} ${
            isMobile ? 
              (isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)') :
              (isDarkMode ? 'rgba(0, 255, 255, 0.4)' : 'rgba(214, 48, 49, 0.4)')
          };
        `,
        formatter: function (params: any) {
          const data = params.data;
          const textColor = isMobile ? (isDarkMode ? '#ffffff' : '#000000') : mainColor;
          return `
            <div style="padding: ${isMobile ? '8px' : '5px'};">
              <strong style="color: ${textColor}; font-size: ${isMobile ? '16px' : '16px'};">${data.name}</strong><br/>
              <span style="color: ${textColor};">${t('skills.proficiency')}: ${data.value}%</span><br/>
              ${data.skillCount ? `<span style="opacity: 0.8; color: ${textColor};">${t('skills.totalSkills')}: ${data.skillCount}</span>` : ''}
            </div>
          `;
        },
      },
      legend: showLegend ? {
        orient: isMobile ? 'horizontal' : 'vertical',
        right: isMobile ? '15%' : '8%',
        top: isMobile ? 'bottom' : 'center',
        textStyle: {
          color: isDarkMode ? '#fff' : '#333',
          fontSize: isMobile ? 10 : 12,
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
        },
        itemGap: isMobile ? 10 : 12,
        icon: 'circle',
        itemWidth: isMobile ? 12 : 16,
        itemHeight: isMobile ? 12 : 16,
      } : undefined,
      series: [
        {
          name: 'Habilidades',
          type: 'pie',
          radius: roseType ? ['30%', '75%'] : ['40%', '75%'],
          center: ['50%', '55%'],
          roseType: roseType ? 'radius' : false,
          startAngle: 90,
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: isDarkMode ? '#0a0a0a' : '#ffffff',
            borderWidth: isMobile ? 2 : 2,  
            shadowBlur: isMobile ? (isDarkMode ? 8 : 6) : (isDarkMode ? 20 : 15),
            shadowColor: isMobile ? 
              (isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)') :
              (isDarkMode ? 'rgba(14, 246, 204, 0.6)' : 'rgba(246, 81, 81, 0.4)'),
            shadowOffsetX: 0,
            shadowOffsetY: isMobile ? 2 : 0,
          },
          label: {
            show: true,
            position: isMobile ? 'inside' : 'outside',
            color: mainColor, 
            padding: isMobile ? [6, 10] : 0,
            borderRadius: isMobile ? 6 : 0,
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: isMobile ? 14 : 12,
            formatter: function(params: any) {
              if (isMobile) {
                return `${params.name}\n${params.value}%`;
              }
              return `${params.name}\n${params.value}%\n${params.data.skillCount ? `(${params.data.skillCount})` : ''}`;
            },
            textBorderColor: isMobile ? 'rgba(0,0,0,1)' : (isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'),
            textBorderWidth: isMobile ? 2 : 1,
          },
          labelLine: {
            show: !isMobile,
            lineStyle: {
              color: mainColor,
              width: 2,
            },
            smooth: 0.3,
            length: 15,
            length2: 20,
          },
          emphasis: {
            scale: true,
            scaleSize: isMobile ? 1.02 : 1.1,
            itemStyle: {
              shadowBlur: isMobile ? (isDarkMode ? 12 : 8) : (isDarkMode ? 40 : 25),
              shadowColor: isMobile ? 
                (isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)') : 
                mainColor,
              borderWidth: isMobile ? 2 : 3,
            },
            label: {
              fontSize: isMobile ? 12 : 14,
              fontWeight: 'bold',
            },
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: (idx: number) => idx * 100,
          animationDuration: 1500,
          data: data.map((item, index) => {
            const baseColor = item.category ? 
              categoryColors[item.category] || neonColors[index % neonColors.length] :
              neonColors[index % neonColors.length];
            
            return {
              value: item.value,
              name: item.name,
              skillCount: item.skillCount,
              category: item.category,
              skills: item.skills,
              itemStyle: {
                color: isMobile ? 
                  (isDarkMode ? 
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      { offset: 0, color: baseColor + 'F0' },
                      { offset: 0.5, color: baseColor + 'D0' }, 
                      { offset: 1, color: baseColor + 'B0' },   
                    ]) :
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      { offset: 0, color: baseColor + 'F5' },
                      { offset: 0.5, color: baseColor + 'E0' }, 
                      { offset: 1, color: baseColor + 'CC' },   
                    ])
                  ) :
                  (isDarkMode ? 
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      { offset: 0, color: baseColor },
                      { offset: 0.5, color: baseColor + 'CC' },
                      { offset: 1, color: baseColor + '66' },
                    ]) :
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      { offset: 0, color: baseColor },
                      { offset: 0.5, color: baseColor + 'E6' },
                      { offset: 1, color: baseColor + 'B3' },
                    ])
                  ),
              },
            };
          }),
        },
      ],
      animation: true,
      animationThreshold: 2000,
      animationDuration: 1500,
      animationEasing: 'elasticOut',
    };
  }, [data, mainColor, isDarkMode, title, subtitle, isMobile, showLegend, roseType, neonColors, categoryColors, t, themeKey]);

  return (
    <div className={`${styles.chartContainer} ${isDarkMode ? styles.dark : styles.light}`}>
      {showBackButton && onBackClick && (
        <button
          onClick={onBackClick}
          className={styles.backButton}
          aria-label="Voltar ao gráfico principal"
        >
          <FaArrowLeft />
        </button>
      )}
  
      {showSearch && (
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper} onClick={handleSearchWrapperClick}>
            <FaSearch className={styles.searchIcon} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className={styles.searchInput}
            />
          </div>
        </div>
      )}
      
      <ReactECharts
        option={chartOption}
        style={{ 
          height: `${height}px`, 
          width: '100%',
        }}
        onEvents={onChartClick ? {
          'click': onChartClick
        } : {}}
        opts={{ 
          renderer: 'canvas',
          devicePixelRatio: window.devicePixelRatio || 2,
        }}
        notMerge={true}
        lazyUpdate={true}
      /> 
    </div>
  );
};

export default CircularChart;