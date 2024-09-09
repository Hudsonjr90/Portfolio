import { createContext, useContext, useState } from "react";
import { createTheme } from '@mui/material/styles';

interface ThemeContextType {
  mainColor: string;
  setMainColor: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mainColor, setMainColor] = useState("#0ef6cc");

  return (
    <ThemeContext.Provider value={{ mainColor, setMainColor }}>
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
          backgroundColor: "#ee0a0a",
        },
        arrow: {
          color: "#ee0a0a",
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

export const modalTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "var(--main_color)",
        },
        arrow: {
          color: "var(--main_color)",
        },
      },
    },
  },
});

export const searchTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "var(--main_color)",
        },
        arrow: {
          color: "var(--main_color)",
        },
      },
    },
  },
});

export const cloudTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          backgroundColor: "var(--main_color)",
        },
        arrow: {
          color: "var(--main_color)",
        },
      },
    },
  },
});

