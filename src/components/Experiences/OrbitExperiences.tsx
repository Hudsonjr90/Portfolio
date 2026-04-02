import { motion, AnimatePresence } from "framer-motion";
import styles from "./OrbitExperiences.module.css";
import { Experience } from "../../data/experiencesServer";
import { useState, useMemo } from "react";
import Modal from "../Modal/Modal";
import { FaLaptopCode } from "react-icons/fa";

interface Props {
  experiences: Experience[];
}

const OrbitExperiences = ({ experiences }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const ORBIT_ITEM_SIZE = 72;
  const itemOffset = ORBIT_ITEM_SIZE / 2;

  const carouselItems = useMemo(
    () =>
      experiences.map((exp) => ({
        title: exp.title,
        subtitle: exp.subtitle,
        description: exp.description,
        date: `📅 ${exp.date}`,
        icon: <img src={exp.image} alt={exp.title} width={50} />,
      })),
    [experiences]
  );

  const radius = 250;
  const step = (2 * Math.PI) / experiences.length;

  return (
    <>
      <div className={styles.orbitContainer}>
        <motion.svg
          className={styles.connectionLines}
          animate={{
            scale: isCollapsed ? 0 : 1,
            opacity: isCollapsed ? 0 : 1,
          }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {experiences.map((_, index) => {
              const angle = index * step;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <line
                  key={`line-${index}`}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  className={styles.connectionLine}
                />
              );
            })}
        </motion.svg>

        <button
          type="button"
          className={`${styles.centerIcon} ${isCollapsed ? styles.centerIconCollapsed : ""}`}
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? "Expand experiences" : "Collapse experiences"}
          aria-pressed={!isCollapsed}
        >
         <FaLaptopCode />
        </button>

        <AnimatePresence>
          {!isCollapsed &&
            experiences.map((exp, index) => {
              const angle = index * step;

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={index}
                  className={styles.orbitItem}
                  initial={{ opacity: 0, scale: 0.5, x: -itemOffset, y: -itemOffset }}
                  animate={{ opacity: 1, scale: 1, x: x - itemOffset, y: y - itemOffset }}
                  exit={{ opacity: 0, scale: 0.5, x: -itemOffset, y: -itemOffset }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img src={exp.image} alt={exp.title} />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

  
      {selectedIndex !== null && (
        <Modal
          show={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          carouselItems={carouselItems}
          initialPage={selectedIndex}
          loopNavigation
        />
      )}
    </>
  );
};

export default OrbitExperiences;
