import React, { useMemo, useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import styles from './CircularChart.module.css';
import { FaArrowLeft, FaSearch, FaChartPie, FaChartBar, FaChartLine } from 'react-icons/fa';

type ChartType = 'pie' | 'bar' | 'line';

interface ChartData {
  name: string;
  value: number;
  skillCount?: number;
  category?: string;
  skills?: any[];
  level?: string;
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
  showChartTypeToggle?: boolean;
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
  showChartTypeToggle = false,
}) => {
  const { t } = useTranslation();
  const { mainColor } = useTheme();
  const [themeKey, setThemeKey] = useState(0);
  const [chartType, setChartType] = useState<ChartType>('pie');
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
        '#00d4ff',  
        '#ff4081',
        '#00ff88',
        '#ffab00',
        '#9c27b0',
        '#ff1744',
        '#00e676',  
        '#ffc107', 
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
        '#2196f3',  
        '#e91e63',  
        '#4caf50',  
        '#ff9800',  
        '#9c27b0',  
        '#f44336',  
        '#00bcd4',  
        '#ffeb3b',  
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
        frontend: isDarkMode ? '#00d4ff' : '#2196f3',
        backend: isDarkMode ? '#ff4081' : '#e91e63',
        database: isDarkMode ? '#00ff88' : '#4caf50',
        tools: isDarkMode ? '#ffab00' : '#ff9800',
        deploy: isDarkMode ? '#ff1744' : '#f44336',
        design: isDarkMode ? '#9c27b0' : '#9c27b0',
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
    const baseConfig = {
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
          fontFamily: 'Orbitron, sans-serif',
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
          fontFamily: 'Orbitron, sans-serif',
        },
      } : undefined,
      tooltip: {
        trigger: chartType === 'pie' ? 'item' : 'axis',
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
          fontFamily: 'Orbitron, sans-serif',
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
          const textColor = isMobile ? (isDarkMode ? '#ffffff' : '#000000') : mainColor;
          
          if (chartType === 'pie') {
            const data = params.data;
            return `
              <div style="padding: ${isMobile ? '8px' : '5px'};">
                <strong style="color: ${textColor}; font-size: ${isMobile ? '16px' : '16px'};">${data.name}</strong><br/>
                <span style="color: ${textColor};">${t('skills.proficiency')}: ${data.value}%</span><br/>
                ${data.skillCount ? `<span style="opacity: 0.8; color: ${textColor};">${t('skills.totalSkills')}: ${data.skillCount}</span>` : ''}
                ${showBackButton && data.category && data.level ? `<span style="opacity: 0.8; color: ${textColor};">${t('skills.category')}: ${data.category}</span><br/><span style="opacity: 0.8; color: ${textColor};">${t(data.level)}</span>` : ''}
              </div>
            `;
          } else {

            const dataItem = Array.isArray(params) ? params[0] : params;
            const itemData = dataItem.data || dataItem;
            
            return `
              <div style="padding: ${isMobile ? '8px' : '5px'};">
                <strong style="color: ${textColor}; font-size: ${isMobile ? '16px' : '16px'};">${itemData.name || dataItem.name}</strong><br/>
                <span style="color: ${textColor};">${t('skills.proficiency')}: ${itemData.value || dataItem.value}%${itemData.level ? ` - ${t(itemData.level)}` : ''}</span>
                ${showBackButton && itemData.category ? `<br/><span style="opacity: 0.8; color: ${textColor};">${t('skills.category')}: ${itemData.category}</span>` : ''}
                ${itemData.skillCount ? `<br/><span style="opacity: 0.8; color: ${textColor};">${t('skills.totalSkills')}: ${itemData.skillCount}</span>` : ''}
              </div>
            `;
          }
        },
      },
      animation: true,
      animationThreshold: 2000,
      animationDuration: 1500,
      animationEasing: 'elasticOut',
    };

    switch (chartType) {
      case 'pie':
        return {
          ...baseConfig,
          legend: showLegend ? {
            orient: isMobile ? 'horizontal' : 'vertical',
            right: isMobile ? '15%' : '8%',
            top: isMobile ? 'bottom' : 'center',
            textStyle: {
              color: isDarkMode ? '#fff' : '#333',
              fontSize: isMobile ? 10 : 12,
              fontWeight: 'bold',
              fontFamily: 'Orbitron, sans-serif',
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
                fontFamily: 'Orbitron, sans-serif',
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
                  level: item.level,
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
        };

      case 'bar':
        const sortedBarData = [...data].sort((a, b) => a.value - b.value);
        return {
          ...baseConfig,
          grid: {
            left: '10%',
            right: '10%',
            top: title ? '20%' : '10%',
            bottom: '15%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: sortedBarData.map(item => item.name),
            axisLabel: {
              color: mainColor,
              fontSize: isMobile ? 10 : 12,
              rotate: isMobile ? 45 : 0,
              fontFamily: 'Orbitron, sans-serif',
            },
            axisLine: {
              lineStyle: {
                color: mainColor,
              },
            },
          },
          yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
              color: mainColor,
              fontSize: isMobile ? 10 : 12,
              formatter: '{value}%',
              fontFamily: 'Orbitron, sans-serif',
            },
            axisLine: {
              lineStyle: {
                color: mainColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              },
            },
          },
          series: [
            {
              name: 'Proficiência',
              type: 'bar',
              data: sortedBarData.map((item, index) => {
                const baseColor = item.category ? 
                  categoryColors[item.category] || neonColors[index % neonColors.length] :
                  neonColors[index % neonColors.length];
                
                return {
                  value: item.value,
                  name: item.name,
                  category: item.category,
                  skillCount: item.skillCount,
                  skills: item.skills,
                  level: item.level,
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      { offset: 0, color: baseColor + '80' },
                      { offset: 0.5, color: baseColor + 'B0' },
                      { offset: 1, color: baseColor },
                    ]),
                    borderRadius: [4, 4, 0, 0],
                  },
                };
              }),
              animationDelay: (idx: number) => idx * 100,
            },
          ],
        };

      case 'line':
        const sortedLineData = [...data].sort((a, b) => a.value - b.value);
        return {
          ...baseConfig,
          grid: {
            left: '10%',
            right: '10%',
            top: title ? '20%' : '10%',
            bottom: '15%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: sortedLineData.map(item => item.name),
            axisLabel: {
              color: mainColor,
              fontSize: isMobile ? 10 : 12,
              rotate: isMobile ? 45 : 0,
              fontFamily: 'Orbitron, sans-serif',
            },
            axisLine: {
              lineStyle: {
                color: mainColor,
              },
            },
          },
          yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
              color: mainColor,
              fontSize: isMobile ? 10 : 12,
              formatter: '{value}%',
              fontFamily: 'Orbitron, sans-serif',
            },
            axisLine: {
              lineStyle: {
                color: mainColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              },
            },
          },
          series: [
            {
              name: 'Proficiência',
              type: 'line',
              data: sortedLineData.map((item) => ({
                value: item.value,
                name: item.name,
                category: item.category,
                skillCount: item.skillCount,
                skills: item.skills,
                level: item.level,
              })),
              smooth: true,
              lineStyle: {
                color: mainColor,
                width: 3,
                shadowColor: mainColor,
                shadowBlur: 10,
              },
              itemStyle: {
                color: mainColor,
                borderColor: isDarkMode ? '#fff' : '#000',
                borderWidth: 2,
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: mainColor + '60' },
                  { offset: 1, color: mainColor + '10' },
                ]),
              },
              animationDelay: (idx: number) => idx * 50,
            },
          ],
        };

      default:
        return baseConfig;
    }
  }, [data, mainColor, isDarkMode, title, subtitle, isMobile, showLegend, roseType, neonColors, categoryColors, t, themeKey, chartType]);

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

      {showChartTypeToggle && (
        <div className={styles.chartToggle}>
          <button
            onClick={() => setChartType('pie')}
            className={`${styles.toggleButton} ${chartType === 'pie' ? styles.active : ''}`}
            aria-label="Gráfico de Pizza"
          >
            <FaChartPie />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`${styles.toggleButton} ${chartType === 'bar' ? styles.active : ''}`}
            aria-label="Gráfico de Barras"
          >
            <FaChartBar />
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`${styles.toggleButton} ${chartType === 'line' ? styles.active : ''}`}
            aria-label="Gráfico de Linha"
          >
            <FaChartLine />
          </button>
        </div>
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