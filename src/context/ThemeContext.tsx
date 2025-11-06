import { createContext, useContext, useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';

interface ThemeContextType {
  mainColor: string;
  setMainColor: React.Dispatch<React.SetStateAction<string>>;
  updateFavicon: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mainColor, setMainColor] = useState(() => {
    const savedLightMode = localStorage.getItem("lightMode");
    const isLightMode = savedLightMode ? JSON.parse(savedLightMode) : false;
    return isLightMode ? "#f65151" : "#0ef6cc";
  });

  const updateFavicon = (color: string) => {
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }

    const faCodePath = "M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z";

    const svg = `
      <svg width="32" height="32" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" d="${faCodePath}"/>
      </svg>
    `;

    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, 32, 32);
        ctx.drawImage(img, 0, 0, 32, 32);
        
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = canvas.toDataURL('image/png');

        document.head.appendChild(link);

        URL.revokeObjectURL(svgUrl);
      };
      img.src = svgUrl;
    }
  };

  useEffect(() => {
    updateFavicon(mainColor);
  }, [mainColor]);

  return (
    <ThemeContext.Provider value={{ mainColor, setMainColor, updateFavicon }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
}

export const whatsappTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "#25d366",
        },
        arrow: {
          color: "#25d366",
        },
      },
    },
  },
});

export const emailTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "#f65151",
        },
        arrow: {
          color: "#f65151",
        },
      },
    },
  },
});

export const linkedinTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "#2867b2",
        },
        arrow: {
          color: "#2867b2",
        },
      },
    },
  },
});

export const githubTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "#181717",
        },
        arrow: {
          color: "#181717",
        },
      },
    },
  },
});

export const simpleTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "var(--main_color)",
          color: "var(--second_text_color)",
        },
        arrow: {
          color: "var(--main_color)",
        },
      },
    },
  },
});

export const logoTheme = createTheme({
  components: {
    MuiTooltip: { 
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "var(--main_color)",
          color: "var(--second_text_color)",
        },
        arrow: {
          color: "var(--main_color)",
        },
      },
    },
  },
});

export const navbarTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.2rem",
          backgroundColor: "var(--main_color)",
          color: "var(--second_text_color)",
          border: "1px solid var(--main_color)",
          borderRadius: "8px",
        },
       arrow: {
          color: "var(--main_color)",
        },
      },
    },
  },
});
