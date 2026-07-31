interface ResumeData {
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
    pdf: "/cv/HudsonKennedy-BR.pdf"
  },

  us: {
    pdf: "/cv/HudsonKennedy-US.pdf"
  },

  fr: {
    pdf: "/cv/HudsonKennedy-FR.pdf"
  },

  it: {
    pdf: "/cv/HudsonKennedy-IT.pdf"
  },

  es: {
    pdf: "/cv/HudsonKennedy-ES.pdf"
  },

}

export default resumeServer
