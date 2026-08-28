import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { MdOutlineLightMode } from "react-icons/md";
import { HiOutlineMoon } from "react-icons/hi2";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to Light" : "Switch to Dark"}
    >
      {theme === "light" ? (
        <>
          <HiOutlineMoon className="theme-icon" />
          <span className="theme-label">Dark</span>
        </>
      ) : (
        <>
          <MdOutlineLightMode className="theme-icon" />
          <span className="theme-label">Light</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
