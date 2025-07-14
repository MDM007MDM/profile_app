import React, { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";

const themes = {
  light: {
    background: "#f3e7ff",
    card: "#fff",
    text: "#6c3483",
    subtext: "#555",
    accent: "#a18cd1",
    yellow: "#fbc531",
    sectionTitle: "#6c3483",
    sectionTitleYellow: "#fbc531",
    skillText: "#fff",
    skillTextYellow: "#6c3483",
    infoRowBg: "#f8f6ff",
  },
  dark: {
    background: "#1a1333",
    card: "#2d224c",
    text: "#fbc531",
    subtext: "#e0d7f3",
    accent: "#a18cd1",
    yellow: "#fbc531",
    sectionTitle: "#fbc531",
    sectionTitleYellow: "#a18cd1",
    skillText: "#2d224c",
    skillTextYellow: "#fff",
    infoRowBg: "#231a3a",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 