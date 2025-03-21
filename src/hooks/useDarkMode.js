import { useState, useEffect } from "react";

export function useDarkMode() {
  
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));

  return [theme, toggleTheme];
}
