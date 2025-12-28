import { motion } from "framer-motion";
import styles from "./OrbitExperiences.module.css";
import { Experience } from "../../data/experiencesServer";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { FaLaptopCode } from "react-icons/fa";

interface Props {
  experiences: Experience[];
}

const OrbitExperiences = ({ experiences }: Props) => {
  const [active, setActive] = useState<Experience | null>(null);

  const radius = 250;
  const step = (2 * Math.PI) / experiences.length;

  return (
    <>
      <div className={styles.orbitContainer}>
        {/* Linhas de conexão */}
        <svg className={styles.connectionLines}>
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
        </svg>

        {/* Ícone central */}
        <div className={styles.centerIcon}>
         <FaLaptopCode />
        </div>

        {/* Elementos da órbita */}
        {experiences.map((exp, index) => {
          const angle = index * step;

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={index}
              className={styles.orbitItem}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              onClick={() => setActive(exp)}
            >
              <img src={exp.image} alt={exp.title} />
            </motion.div>
          );
        })}
      </div>

      {/* MODAL */}
      {active && (
        <Modal
          show={!!active}
          onClose={() => setActive(null)}
          title={active.title}
          subtitle={active.subtitle}
          description={active.description}
          date={`📅 ${active.date}`}
          icon={<img src={active.image} alt={active.title} width={50} />}
        />
      )}
    </>
  );
};

export default OrbitExperiences;
