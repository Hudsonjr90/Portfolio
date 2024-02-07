import { SetStateAction, useEffect, useState } from "react";
import styles from "./Testimonials.module.css";
import Transition from "../../components/Transition";
import { motion, AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";
import { wrap } from "popmotion";
import imagesDesktop from "../../components/config/imageServer";
import imagesMobile from "../../components/config/imageServerMobile";

const Testimonials = () => {
  const cardItems = [
    {
      id: 1,
      title: "Rafael Araujo",
      text: "Hudson é um profissional super dedicado e comprometido com a entrega, sempre demonstrou pro-atividade, desenvoltura, bem como a iniciativa e capacidade de resolver problemas de forma objetiva e com conhecimento técnico.",
    },
    {
      id: 2,
      title: "Fellipe Menezes",
      text: "Excelente parceiro de trabalho e uma ótima pessoa! Seu senso de responsabilidade se destaca dentre os demais, nunca deixando nada pra trás ou sem solução. Aprendi muito com o Hudson e com certeza levo esses aprendizados para a vida.",
    },
    {
      id: 3,
      title: "Luís Assis",
      text: "Hudson é um excelente parceiro de trabalho, sempre buscando aprimoramento e desenvolver novas habilidades. Está sempre disposto a ajudar. Dedicado e comprometido.",
    },
    {
      id: 4,
      title: "Tássia Felicio",
      text: "Profissional exemplar! Muito dedicado, assíduo resolutivo e proativo. E de uma ótima convivência interpessoal. Super recomendo!",
    },
    {
      id: 5,
      title: "Hirvin Faria",
      text: "Ótimo Profissional, sempre buscando aprender, melhorar e dominar novos assuntos. Auxiliando a equipe na resolução de problemas.",
    },
    {
      id: 6,
      title: "André Scott",
      text: "Hudson para mim, foi um excelente instrututor. Me ensinou a manusear uma plataforma, que nem de longe é da minha área. Profissional exemplar e de extrema capacidade. tem tudo para decolar em sua carreira de Desenvolvedor.",
    },
    {
      id: 7,
      title: "Igor Tudisco",
      text: "Trabalhei com o Hudson na Vilt. Mesmo sendo um período curto, tive a oportunidade de conhecer essa pessoa maravilhosa, bem animada e colaborativa. Participamos de treinamentos e alguns desafios juntos, durantes esse tempo ele como uma pessoa mais experiente se mostrou um bom orientador e um ótimo motivador para todos a sua volta e principalmente para as pessoas mais juniores. Sempre disposto a ajudar, ele será um grande aliado dentro de qualquer equipe.",
    },
    {
      id: 8,
      title: "Jailton Moreira",
      text: "Eu tive a oportunidade de trabalhar com o Hudson. Foi uma experiência muito interessante, pois se trata de um profissional muito dedicado e competente no quesito frontend. Uma grata surpresa e super recomendo. Sucesso Hudson!",
    },
    {
      id: 9,
      title: "Paulo Alberto",
      text: "Hudson é um profissional completo, sempre pró-ativo e disposto a ajudar, mas no tempo em que trabalhamos juntos ele se destacou realmente pela sua habilidade no desenvolvimento frontend e conhecimentos de UX/UI, sempre muito detalhista. Ele se tornou uma referência para mim, tenho certeza que irá contribuir muito na equipe que venha a fazer parte!",
    },
    {
      id: 10,
      title: "Bruno Carvalho",
      text: "Trabalhar com Hudson foi uma experiência excelente. Sua compreensão do FrontEnd é evidente em cada implementação e apoio ao time. Ele é proativo, criativo e sempre busca soluções inovadoras e elegantes.",
    },
    {
      id: 11,
      title: "João Paulo",
      text: "Tive o prazer de contar com o Hudson no meu time. Um desenvolvedor focado e criativo, sempre buscando solucionar os desafios que encontramos no projeto. Proativo e disponível para ajudar os colegas de time, visando o melhor para a entrega dos objetivos!",
    },
    {
      id: 12,
      title: "Éder Fialho",
      text: "Um ótimo profissional e profundo conhecedor na parte de Front-end, não se limitando a uso de frameworks para a 'magia' acontecer. Recomendado demais!",
    },
    {
      id: 13,
      title: "Gei Batista",
      text: "Eu tive o prazer de trabalhar com o colega Hudson Kennedy na equipe de desenvolvimento da Cast, no projeto MG-Florestas e posso atestar suas habilidades excepcionais e dedicação. Hudson é um desenvolvedor front-end talentoso e apaixonado, sempre demonstrando um profundo entendimento das mais recentes tecnologias e melhores práticas. Durante nosso tempo juntos na Cast, ele desempenhou um papel fundamental no sucesso do projeto. O que mais me impressionou em Hudson é a sua capacidade de enfrentar desafios complexos com criatividade e eficiência. Sua atenção aos detalhes e comprometimento com a entrega de produtos de alta qualidade sempre o destacaram. Além de suas habilidades técnicas impressionantes, Hudson foi membro incrível da equipe. Sua comunicação clara e disposição para colaborar tornaram o ambiente de trabalho mais produtivo e agradável. Recomendo Hudson sem reservas e estou confiante de que ele continuará a ter um impacto positivo onde quer que vá. Se você está procurando um desenvolvedor front-end talentoso e comprometido, Hudson Kennedy é a escolha certa. Sinta-se à vontade para entrar em contato se precisar de informações adicionais. Atenciosamente, Gei Batista.",
    },
    {
      id: 14,
      title: "Kauanne Nunes",
      text: "Hudson foi um dos candidatos que tive o prazer de conhecer. Uma pessoa muito educada, com uma história de vida incrível e levou o nosso bate-papo de uma maneira bem descontraída, sempre explicando com muita riqueza de detalhes as suas experiências. Um excelente perfil a ser avaliado.  ",
    },
    {
      id: 15,
      title: "Deborah Montezano",
      text: "Hudson é um perfeito profissional, comprometido no que faz, sempre conclui seus projetos com excelência",
    },
  ];

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageClick = (data: { selected: SetStateAction<number> }) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(cardItems.length / 1); // Número de páginas com 1 card por página
  const imageIndex = wrap(
    0,
    windowWidth > 768 ? imagesDesktop.length : imagesMobile.length,
    currentPage
  );

  const handleMouseEnter = () => {
    setFlipped(true);
  };

  const handleMouseLeave = () => {
    setFlipped(false);
  };

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.testimonials}>
        <h2 className={styles.heading}>
          <span>//</span> Alguns <span>Depoimentos</span>
        </h2>
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{
            duration: 2,
            delay: 0.7,
            ease: [0.2, 0, 0.2, 1],
          }}
          className={`${styles.slider_container} ${
            isFlipped ? styles.flipped : ""
          }`}
        >
          <AnimatePresence initial={false}>
            <motion.div
              className={styles.flipContent}
              key={`${currentPage}-${cardItems[imageIndex].id}`}
              onMouseLeave={handleMouseLeave}
            >
              <h3>{cardItems[imageIndex].title}</h3>
              <p>{cardItems[imageIndex].text}</p>
            </motion.div>
            <motion.img
              key={`${currentPage}-${cardItems[imageIndex].id}-img`}
              src={
                windowWidth > 768
                  ? imagesDesktop[imageIndex]
                  : imagesMobile[imageIndex]
              }
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`${styles.imgCard} ${
                isFlipped ? styles.flipAnimation : ""
              }`}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              onMouseEnter={handleMouseEnter}
            />
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: "80%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 2,
            delay: 0.3,
            ease: [0.3, 0, 0.2, 1],
          }}
        >
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            pageRangeDisplayed={6}
            marginPagesDisplayed={0}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
            forcePage={currentPage}
          />
        </motion.div>
      </section>
    </Transition>
  );
};

export default Testimonials;
