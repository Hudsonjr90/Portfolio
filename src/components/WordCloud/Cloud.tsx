import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "echarts-wordcloud";
import { mainIcons } from "../../data/iconsServer";
import styles from "./Cloud.module.css";
import { useTranslation } from "react-i18next";

const Cloud = () => {
  const { t } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);

  const [words, setWords] = useState(() => {
    const wordsArray = mainIcons.flatMap(icon => [
      { name: icon.name, value: icon.percentage },
      { name: icon.category, value: icon.percentage / 2 },
      { name: t(icon.level), value: icon.percentage / 2 }
    ]);
    return wordsArray;
  });

  const shuffleWords = () => {
    setWords(prevWords => [...prevWords].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    const interval = setInterval(shuffleWords, 5000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const root = document.documentElement;
      const mainColor = getComputedStyle(root).getPropertyValue('--main_color').trim();
      const cloudText = getComputedStyle(root).getPropertyValue('--cloud_text').trim();
      const textColor = getComputedStyle(root).getPropertyValue('--text_color').trim();

      const option = {
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          right: null,
          bottom: null,
          sizeRange: [18, 36],
          rotationRange: [-90, 0],
          rotationStep: 45,
          gridSize: 8,
          drawOutOfBound: false,
          textStyle: {
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 'bold',
            color: () => {
              const colors = [mainColor, cloudText, textColor];
              return colors[Math.floor(Math.random() * colors.length)];
            },
          },
          data: words
        }]
      };
      chart.setOption(option);
      return () => {
        chart.dispose();
      };
    }
  }, [words]);

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: "0%" }}
      transition={{
        duration: 2.5,
        delay: 0.3,
        ease: [0.3, 0, 0.2, 1],
      }}
      className={styles.container}
    >
      <div className={styles.circleContainer} ref={chartRef} />
    </motion.div>
  );
};

export default Cloud;
