import { createContext, useState } from "react";

export const ThemeContext = createContext();
export const SurveyContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  console.log('answers:', answers)
  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers });
  };
  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};
