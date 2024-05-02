import ReactWordcloud from "react-wordcloud";
import { mainIcons } from "../data/iconsServer";
import { motion } from "framer-motion";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { useTheme } from "../context/ThemeContext";

const WordCloudComponent = () => {
  const words = mainIcons.map((icon) => ({
    text: `${icon.name} - ${icon.category}`,
    value: icon.id,
  }));

  const options = {
    enableTooltip: true,
    fontFamily: "Orbitron, sans-serif",
    fontWeight: "700",
    padding: 1,
    rotations: 5,
    transitionDuration: 1000,
  };
  const { mainColor } = useTheme();

  const callbacks = {
    getWordColor: () => mainColor,
  };

  

  return (
    <motion.div
      style={{ width: "100%", height: "600px" }}
    >
      <ReactWordcloud options={options} words={words} callbacks={callbacks} />
    </motion.div>
  );
};

export default WordCloudComponent;
