import { useEffect, useState } from "react";
import Cloud from "react-d3-cloud";
import { mainIcons } from "../data/iconsServer";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import styles from "./WordCloud.module.css";

const WordCloud = () => {
  const words = mainIcons.map((icon) => ({
    text: `${icon.name} - ${icon.category}`,
    value: icon.id,
  }));

  const { mainColor } = useTheme();

  const [wordPositions, setWordPositions] = useState(
    words.map(() => ({
      x: Math.random() * 1500,
      y: Math.random() * 700,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWordPositions((prevPositions) =>
        prevPositions.map((_pos) => ({
          x: Math.random() * 1500,
          y: Math.random() * 700,
        }))
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const fontSizeMapper = (word: { value: number }) => {
    const isMobile = window.innerWidth < 768;

    const scaleFactor = isMobile ? 10 : 8;
    return Math.log2(word.value) * scaleFactor;
  };

  return (
    <motion.div className={styles.container}>
      <Cloud
        data={words}
        width={1500}
        height={700}
        font="Orbitron"
        fontStyle="normal"
        fontWeight="700"
        fontSize={fontSizeMapper}
        spiral="archimedean"
        padding={5}
        rotate={0}
        fill={() => mainColor}
      />
    </motion.div>
  );
};

export default WordCloud;
