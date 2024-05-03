import React, { useCallback } from "react";
import Cloud from "react-d3-cloud";
import { mainIcons } from "../data/iconsServer";
import { useTheme } from "../context/ThemeContext";

const WordCloud = () => {
  const words = mainIcons.map((icon) => ({
    text: `${icon.name} - ${icon.category}`,
    value: icon.id,
  }));

  const { mainColor } = useTheme();

  const fontSize = useCallback(
    (word: { value: number }) => Math.log2(word.value) * 5,
    []
  );
  const rotate = useCallback((word: { value: number }) => word.value % 360, []);


  return (
    <Cloud
      data={words}
      width={1500}
      height={700}
      font="Orbitron"
      fontStyle="normal"
      fontWeight="700"
      fontSize={fontSize}
      spiral="archimedean"
      rotate={rotate}
      padding={5}
      random={Math.random}
      fill={mainColor}
    />
  );
};

export default WordCloud;
