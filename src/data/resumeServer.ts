interface ResumeData {
  images: string[];
  pdf: string;
}

interface ResumeServer {
  br: ResumeData;
  us: ResumeData;
  fr: ResumeData;
  it: ResumeData;
  es: ResumeData;
}

const resumeServer: ResumeServer = {
  
  br: {
    images: [
      "/imgs/imgCv/BR-1.webp",
      "/imgs/imgCv/BR-2.webp",
      "/imgs/imgCv/BR-3.webp",
      "/imgs/imgCv/BR-4.webp",
      "/imgs/imgCv/BR-5.webp",
    ],
    pdf: "/cv/HudsonKennedy-BR.pdf"
  },

  us: {
    images: [
      "/imgs/imgCv/US-1.webp",
      "/imgs/imgCv/US-2.webp",
      "/imgs/imgCv/US-3.webp",
      "/imgs/imgCv/US-4.webp",
      "/imgs/imgCv/US-5.webp",
    ],
    pdf: "/cv/HudsonKennedy-US.pdf"
  },

  fr: {
    images: [
      "/imgs/imgCv/FR-1.webp",
      "/imgs/imgCv/FR-2.webp",
      "/imgs/imgCv/FR-3.webp",
      "/imgs/imgCv/FR-4.webp",
      "/imgs/imgCv/FR-5.webp",
    ],
    pdf: "/cv/HudsonKennedy-FR.pdf"
  },

  it: {
    images: [
      "/imgs/imgCv/IT-1.webp",
      "/imgs/imgCv/IT-2.webp",
      "/imgs/imgCv/IT-3.webp",
      "/imgs/imgCv/IT-4.webp",
      "/imgs/imgCv/IT-5.webp",
    ],
    pdf: "/cv/HudsonKennedy-IT.pdf"
  },

  es: {
    images: [
      "/imgs/imgCv/ES-1.webp",
      "/imgs/imgCv/ES-2.webp",
      "/imgs/imgCv/ES-3.webp",
      "/imgs/imgCv/ES-4.webp",
      "/imgs/imgCv/ES-5.webp",
    ],
    pdf: "/cv/HudsonKennedy-ES.pdf"
  },

}

export default resumeServer
