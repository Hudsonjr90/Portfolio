import Card from "react-bootstrap/Card";
import styles from "./CardComponent.module.css";
import Paginate from "react-paginate";
import { useState, useEffect } from "react";

const CardComponent = () => {
  const cards = [
    {
      id: 1,
      img: "/imgs/linkedin1.png",
      text: "Hudson é um profissional super dedicado e comprometido com a entrega, sempre demonstrou pro-atividade, desenvoltura, bem como a iniciativa e capacidade de resolver problemas de forma objetiva e com conhecimento técnico.",
    },
    {
      id: 2,
      img: "/imgs/linkedin2.png",
      text: "Excelente parceiro de trabalho e uma ótima pessoa! Seu senso de responsabilidade se destaca dentre os demais, nunca deixando nada pra trás ou sem solução. Aprendi muito com o Hudson e com certeza levo esses aprendizados para a vida.",
    },
    {
      id: 3,
      img: "/imgs/linkedin3.png",
      text: "Hudson é um excelente parceiro de trabalho, sempre buscando aprimoramento e desenvolver novas habilidades. Está sempre disposto a ajudar. Dedicado e comprometido.",
    },
    {
      id: 4,
      img: "/imgs/linkedin4.png",
      text: "Profissional exemplar! Muito dedicado, assíduo resolutivo e proativo. E de uma ótima convivência interpessoal. Super recomendo!",
    },
    {
      id: 5,
      img: "/imgs/linkedin5.png",
      text: "Ótimo Profissional, sempre buscando aprender, melhorar e dominar novos assuntos. Auxiliando a equipe na resolução de problemas.",
    },
    {
      id: 6,
      img: "/imgs/linkedin6.png",
      text: "Hudson para mim, foi um excelente instrututor. Me ensinou a manusear uma plataforma, que nem de longe é da minha área. Profissional exemplar e de extrema capacidade. tem tudo para decolar em sua carreira de Desenvolvedor.",
    },
    {
      id: 7,
      img: "/imgs/linkedin7.png",
      text: "Trabalhei com o Hudson na Vilt. Mesmo sendo um período curto, tive a oportunidade de conhecer essa pessoa maravilhosa, bem animada e colaborativa. Participamos de treinamentos e alguns desafios juntos, durantes esse tempo ele como uma pessoa mais experiente se mostrou um bom orientador e um ótimo motivador para todos a sua volta e principalmente para as pessoas mais juniores. Sempre disposto a ajudar, ele será um grande aliado dentro de qualquer equipe.",
    },
    {
      id: 8,
      img: "/imgs/linkedin8.png",
      text: "Eu tive a oportunidade de trabalhar com o Hudson. Foi uma experiência muito interessante, pois se trata de um profissional muito dedicado e competente no quesito frontend. Uma grata surpresa e super recomendo. Sucesso Hudson!",
    },
    {
      id: 9,
      img: "/imgs/linkedin9.png",
      text: "Hudson é um profissional completo, sempre pró-ativo e disposto a ajudar, mas no tempo em que trabalhamos juntos ele se destacou realmente pela sua habilidade no desenvolvimento frontend e conhecimentos de UX/UI, sempre muito detalhista. Ele se tornou uma referência para mim, tenho certeza que irá contribuir muito na equipe que venha a fazer parte!",
    },
    {
      id: 10,
      img: "/imgs/linkedin10.png",
      text: "Trabalhar com Hudson foi uma experiência excelente. Sua compreensão do FrontEnd é evidente em cada implementação e apoio ao time. Ele é proativo, criativo e sempre busca soluções inovadoras e elegantes.",
    },
    {
      id: 11,
      img: "/imgs/linkedin11.png",
      text: "Tive o prazer de contar com o Hudson no meu time. Um desenvolvedor focado e criativo, sempre buscando solucionar os desafios que encontramos no projeto. Proativo e disponível para ajudar os colegas de time, visando o melhor para a entrega dos objetivos!",
    },
    {
      id: 12,
      img: "/imgs/linkedin12.png",
      text: "Um ótimo profissional e profundo conhecedor na parte de Front-end, não se limitando a uso de frameworks para a 'magia' acontecer. Recomendado demais!",
    },
    {
      id: 13,
      img: "/imgs/linkedin13.png",
      text: "Hudson é um perfeito profissional, comprometido no que faz, sempre conclui seus projetos com excelência",
    },
    {
      id: 14,
      img: "/imgs/linkedin14.png",
      text: "Hudson foi um dos candidatos que tive o prazer de conhecer. Uma pessoa muito educada, com uma história de vida incrível e levou o nosso bate-papo de uma maneira bem descontraída, sempre explicando com muita riqueza de detalhes as suas experiências. Um excelente perfil a ser avaliado.  ",
    },
    // {
    //   id: 15,
    //   img: "/imgs/linkedin15.png",
    //   text: "Eu tive o prazer de trabalhar com o colega Hudson Kennedy na equipe de desenvolvimento da Cast, no projeto MG-Florestas e posso atestar suas habilidades excepcionais e dedicação. Hudson é um desenvolvedor front-end talentoso e apaixonado, sempre demonstrando um profundo entendimento das mais recentes tecnologias e melhores práticas. Durante nosso tempo juntos na Cast, ele desempenhou um papel fundamental no sucesso do projeto. O que mais me impressionou em Hudson é a sua capacidade de enfrentar desafios complexos com criatividade e eficiência. Sua atenção aos detalhes e comprometimento com a entrega de produtos de alta qualidade sempre o destacaram. Além de suas habilidades técnicas impressionantes, Hudson foi membro incrível da equipe. Sua comunicação clara e disposição para colaborar tornaram o ambiente de trabalho mais produtivo e agradável. Recomendo Hudson sem reservas e estou confiante de que ele continuará a ter um impacto positivo onde quer que vá. Se você está procurando um desenvolvedor front-end talentoso e comprometido, Hudson Kennedy é a escolha certa. Sinta-se à vontade para entrar em contato se precisar de informações adicionais. Atenciosamente, Gei Batista.",
    // },
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

  const handlePageClick = ({ selected: selectedPage }: { selected: number }) => {
    setCurrentPage(selectedPage);
  }

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
          <Card.Text className={`${styles.card_text} ${hoveredCard === card.id ? styles.showText : ""}`}>
            {card.text}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    ));

  return (
    <>
      <div className={styles.card_container}>
        {currentPageData}
      </div>
      <Paginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={3}
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
