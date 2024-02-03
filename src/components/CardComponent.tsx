import Card from "react-bootstrap/Card";
import styles from "./CardComponent.module.css";
import Paginate from "react-paginate";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CardComponent = () => {
  const cards = [
    {
      id: 1,
      img: "/imgs/bootcamp.png",
      text: "Digital Innovation - Bootcamp Banco Pan(Desenvolvimento Frontend com Angular)",
    },
    {
      id: 2,
      img: "/imgs/harvard.png",
      text: "Universidade de Harvard - Mestrado que atua dentro do programa de pós-graduação em Ciência da Computação",
    },
    {
      id: 3,
      img: "/imgs/mba.png",
      text: "Faculdade Única de MG - Pós Graduação em Engenharia de Software",
    },
    {
      id: 4,
      img: "/imgs/estacio.png",
      text: "Faculdade Estácio de Sá - Processos Gerenciais",
    },
    {
      id: 5,
      img: "/imgs/dio-comp.png",
      text: "Digital Innovation - Trabalhando com Componentes em React",
    },
    {
      id: 6,
      img: "/imgs/dio-arq.png",
      text: "Digital Innovation - Arquitetura de Componentes e a gestão da complexidade no front-end",
    },
    {
      id: 7,
      img: "/imgs/dio-log.png",
      text: "Digital Innovation - Lógica de Programção Essencial",
    },
    {
      id: 8,
      img: "/imgs/dio-es6.png",
      text: "Digital Innovation - Javascript ES6 Essencial",
    },
    {
      id: 9,
      img: "/imgs/dio-ang8.png",
      text: "Digital Innovation - Técnicas Avançadas em Angular 8",
    },
    {
      id: 10,
      img: "/imgs/aem-front.png",
      text: "Adobe Profissional - AEM(Front-end Developer)",
    },
    {
      id: 11,
      img: "/imgs/aem-sbp.png",
      text: "Adobe Profissional - AEM(Sites Business Practitioner)",
    },
    {
      id: 12,
      img: "/imgs/vuejs.png",
      text: "VueJs Brasil - Curso Vuejs(Básico ao Avançado)",
    },
    {
      id: 13,
      img: "/imgs/dio-vue1.png",
      text: "Digital Innovation - Diretivas e Propriedades de Componentes Vue.js ",
    },
    {
      id: 14,
      img: "/imgs/dio-vue2.png",
      text: "Digital Innovation - Componentes, Métodos e Ciclo de vida com Vue.js",
    },
    {
      id: 15,
      img: "/imgs/udemy.png",
      text: "Udemy - Curso Javascript e Typescript do Básico ao Avançado",
    },
    {
      id: 16,
      img: "/imgs/sebrae-EF.png",
      text: "Sebrae - Curso Educação Financeira Empresarial",
    },
    {
      id: 17,
      img: "/imgs/sebrae-GF.png",
      text: "Sebrae - Curso Gestão Financeira",
    },
    {
      id: 18,
      img: "/imgs/sebrae-CS.png",
      text: "Sebrae - Curso Customer Success(Como Conquistar e Manter Clientes)",
    },
    {
      id: 19,
      img: "/imgs/sebrae-MD.png",
      text: "Sebrae - Curso Marketing digital para empreendedor",
    },
    {
      id: 20,
      img: "/imgs/sebrae-EFC.png",
      text: "Sebrae - Curso Estratégia Financeira para o Crescimento ",
    },
    {
      id: 21,
      img: "/imgs/sebrae-PE.png",
      text: "Sebrae - Curso Planejamento Estratégico para Empreendedores",
    },
    {
      id: 22,
      img: "/imgs/fgv.png",
      text: "FGV - Curso Segurança Digital",
    },
    {
      id: 23,
      img: "/imgs/24h.png",
      text: "Cursos 24h - Auxiliar Administrativo",
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 2;
  const offset = currentPage * cardsPerPage;

  const pageCount = Math.ceil(cards.length / cardsPerPage);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setCurrentPage(selectedPage);
  };

  const autoChangePage = () => {
    if (!hoveredCard) {
      const nextPage = (currentPage + 1) % pageCount;
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(autoChangePage, 5000);

    return () => clearInterval(intervalId);
  }, [currentPage, pageCount, hoveredCard]);

  const currentPageData = cards
    .slice(offset, offset + cardsPerPage)
    .map((card) => (
      <Card
        className={styles.card_content}
        key={card.id}
        onMouseEnter={() => handleMouseEnter(card.id)}
        onMouseLeave={handleMouseLeave}
      >
        <Card.Img
          src={card.img}
          alt="Card image"
          className={hoveredCard === card.id ? styles.blur : ""}
        />
        <Card.ImgOverlay>
          <Card.Text
            className={`${styles.card_text} ${
              hoveredCard === card.id ? styles.showText : ""
            }`}
          >
            {card.text}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    ));

  return (
    <>
      <motion.div className={styles.card_container}>
        {currentPageData}
      </motion.div>
        <Paginate
          pageCount={pageCount}
          pageRangeDisplayed={6}
          marginPagesDisplayed={0}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.activePage}
          previousLabel="<<"
          nextLabel=" >>"
          forcePage={currentPage}
        />
    </>
  );
};

export default CardComponent;
