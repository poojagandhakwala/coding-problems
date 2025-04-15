import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./Context/ThemeContext";

const About = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        width: "500px",
        height: "500px",
        marginTop: "60px",
        placeItems: "center",
        placeSelf: "center",
      }}
    >
      <button
        style={{
          marginTop: "30px",
        }}
        onClick={() =>
          setTheme((theme) => (theme === "light" ? "dark" : "light"))
        }
      >
        Toggle Theme
      </button>
      <p style={{ color: theme === "dark" ? "white" : "black" }}>
        Toggle theme to see the effect
      </p>
      <div>
        <Link to="/">
          <p style={{ color: theme === "dark" ? "white" : "black" }}>
            Visit The Home Page
          </p>
        </Link>
      </div>
    </div>
  );
};

export default About;
