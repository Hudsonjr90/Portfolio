import React, { useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Engine, IOptions } from 'tsparticles-engine'
import { useTheme } from '../../context/ThemeContext'

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

const ParticlesB = React.memo(() => {
  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine)
    return Promise.resolve()
  }, [])

  const { mainColor } = useTheme()

  const particlesConfig = useMemo<RecursivePartial<IOptions>>(() => {
    return {
      particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 900
            }
          },
          color: {
            value: mainColor
          },
          shape: {
            type: "polygon",
            stroke: {
              width: 1,
              color: mainColor
            },
            polygon: {
              sides: 8
            }
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: true,
              speed: 4.872463273808071,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 4,
            direction: "top-right",
            random: false,
            straight: true,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 150,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true,
      }
  }, [mainColor])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Particles options={particlesConfig} init={particlesInit} />
    </motion.div>
  )
})

export default ParticlesB
