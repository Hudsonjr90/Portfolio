import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { mainIcons } from "../../data/iconsServer";
import styles from "./Cloud.module.css";

interface WordItem {
  id: number;
  name: string;
  size: number;
  colorVar: string; 
  x: number;
  y: number;
  animationClass: string;
  delay: number;
  isDragging: boolean;
}

const Cloud = () => {
  const [words, setWords] = useState<WordItem[]>([]);
  const [draggedWord, setDraggedWord] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomColor = () => {
    const colorVars = ["var(--main_color)", "var(--cloud_text)", "var(--text_color)"];
    return colorVars[Math.floor(Math.random() * colorVars.length)];
  };

  const getRandomStartPosition = () => {
    const side = Math.floor(Math.random() * 4);
    switch (side) {
      case 0: 
        return { x: Math.random() * 100, y: -10 };
      case 1: 
        return { x: 110, y: Math.random() * 100 };
      case 2: 
        return { x: Math.random() * 100, y: 110 };
      case 3: 
        return { x: -10, y: Math.random() * 100 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const getRandomAnimationClass = () => {
    const animations = ["float1", "float2", "float3", "float4", "float5", "float6", "float7", "float8"];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  const handleMouseDown = (e: React.MouseEvent, wordId: number) => {
    e.preventDefault();
    e.stopPropagation();

    setMouseDownPos({ x: e.clientX, y: e.clientY });
    setDraggedWord(wordId);
    setIsDragging(false);

    const wordElement = e.currentTarget as HTMLElement;
    const rect = wordElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      setWords((prev) =>
        prev.map((word) =>
          word.id === wordId ? { ...word, isDragging: true } : word
        )
      );
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (draggedWord === null || !containerRef.current) return;

      const distance = Math.sqrt(
        Math.pow(e.clientX - mouseDownPos.x, 2) + Math.pow(e.clientY - mouseDownPos.y, 2)
      );

      if (distance > 5 && !isDragging) {
        setIsDragging(true);
      }

      if (isDragging || distance > 5) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newX = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
        const newY = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;

        const clampedX = Math.max(0, Math.min(95, newX));
        const clampedY = Math.max(0, Math.min(95, newY));

        setWords((prev) =>
          prev.map((word) =>
            word.id === draggedWord ? { ...word, x: clampedX, y: clampedY } : word
          )
        );
      }
    };

    const handleGlobalMouseUp = () => {
      if (draggedWord !== null) {
        if (isDragging) {
          const newAnimationClass = getRandomAnimationClass();
          
          setWords((prev) =>
            prev.map((word) =>
              word.id === draggedWord 
                ? { 
                    ...word, 
                    isDragging: false,
                    animationClass: newAnimationClass,
                  } 
                : word
            )
          );

          setTimeout(() => {
            const finalStartPos = getRandomStartPosition();
            const finalAnimationClass = getRandomAnimationClass();
            
            setWords((prev) =>
              prev.map((word) =>
                word.id === draggedWord 
                  ? { 
                      ...word, 
                      x: finalStartPos.x,
                      y: finalStartPos.y,
                      animationClass: finalAnimationClass,
                    } 
                  : word
              )
            );
          }, 2000);
        } else {
          setWords((prev) =>
            prev.map((word) =>
              word.id === draggedWord ? { ...word, isDragging: false } : word
            )
          );
        }

        setDraggedWord(null);
        setDragOffset({ x: 0, y: 0 });
        setIsDragging(false);
        setMouseDownPos({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [draggedWord, dragOffset, isDragging, mouseDownPos]);

  useEffect(() => {
    const wordsArray: WordItem[] = [];

    mainIcons.forEach((icon, index) => {
      const startPos1 = getRandomStartPosition();
      wordsArray.push({
        id: index * 3,
        name: icon.name,
        size: Math.max(16, Math.min(32, icon.percentage * 0.8)),
        colorVar: getRandomColor(),
        x: startPos1.x,
        y: startPos1.y,
        animationClass: getRandomAnimationClass(),
        delay: Math.random() * 12,
        isDragging: false,
      });

      const startPos2 = getRandomStartPosition();
      wordsArray.push({
        id: index * 3 + 1,
        name: icon.category,
        size: Math.max(12, Math.min(24, icon.percentage * 0.5)),
        colorVar: getRandomColor(),
        x: startPos2.x,
        y: startPos2.y,
        animationClass: getRandomAnimationClass(),
        delay: Math.random() * 12 + 4,
        isDragging: false,
      });

      if (icon.level) {
        const startPos3 = getRandomStartPosition();
        wordsArray.push({
          id: index * 3 + 2,
          name: icon.level.replace('skills.', '').toUpperCase(),
          size: Math.max(10, Math.min(20, icon.percentage * 0.4)),
          colorVar: getRandomColor(),
          x: startPos3.x,
          y: startPos3.y,
          animationClass: getRandomAnimationClass(),
          delay: Math.random() * 12 + 8,
          isDragging: false,
        });
      }
    });

    setWords(wordsArray);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className={styles.container}
    >
      {words.map((word) => (
        <div
          key={word.id}
          className={`${styles.wordContainer} ${word.isDragging ? styles.dragging : styles[word.animationClass]}`}
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            animationDelay: `${word.delay}s`,
            zIndex: word.isDragging ? 1000 : 2,
          }}
          onMouseDown={(e) => handleMouseDown(e, word.id)}
        >
          <span
            className={styles.word}
            style={{
              fontSize: `${word.size}px`,
              color: word.colorVar,
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {word.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default Cloud;
