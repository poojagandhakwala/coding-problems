import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./Context/ThemeContext";

const navItems = [
  { label: "User", path: "/user" },
  { label: "Caching", path: "/caching" },
  { label: "Pagination", path: "/pagination" },
  { label: "API Rate Limit", path: "/rate-limit" },
  { label: "Download File", path: "/file-download" },
  { label: "Toggle Text", path: "/toggle" },
  { label: "Form Validation", path: "/form" },
  { label: "Update Address", path: "/update-address" },
  { label: "Fetch Data", path: "/fetch-data" },
  { label: "Theme", path: "/theme" },
];

const Navbar = () => {
  const location = useLocation();
  const { theme } = useTheme();
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "10px",
        backgroundColor: (theme==="light")?"#f5f5f5":"#000",
        zIndex: 1000,
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: "8px 12px",
              textDecoration: "none",
              color: isActive ? "#fff" : "#333",
              backgroundColor: isActive ? "#007bff" : "#e0e0e0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
