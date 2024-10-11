import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WordCloud, { Options } from "react-wordcloud";
import { mainIcons } from "../../data/iconsServer"; // Seus dados de palavras e categorias
import styles from "./Cloud.module.css";
import { useTranslation } from "react-i18next";

const options: Options = {
  colors: ["var(--main_color)", "var(--cloud_text)", "var(--text_color)"],
  deterministic: false,
  enableOptimizations: false,
  enableTooltip: false,
  fontFamily: "Montserrat",
  fontSizes: [18, 36],
  fontStyle: "normal",
  fontWeight: "bold",
  padding: 1,
  randomSeed: "seed",
  rotationAngles: [-90, 0],
  rotations: 2,
  scale: "linear",
  spiral: "rectangular",
  svgAttributes: {},
  textAttributes: {},
  tooltipOptions: {},
  transitionDuration: 500,
};

const Cloud = () => {
  const { t } = useTranslation();

  const [words, setWords] = useState(() => {
    const wordsArray = mainIcons.flatMap(icon => [
      { text: icon.name, value: icon.percentage },
      { text: icon.category, value: icon.percentage / 2 },
      {text: t(icon.level), value: icon.percentage / 2 } 
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
      <div className={styles.circleContainer}>
        <WordCloud options={options} words={words} />
      </div>
    </motion.div>
  );
};

export default Cloud;
