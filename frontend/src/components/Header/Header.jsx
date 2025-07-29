import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Annadata — Jahan Har Khana Ho Ghar Jaisa</h2>
        <p>
          Discover the joy of home-style cooking with Annadata. Every dish is
          crafted with care, delivering warmth, freshness, and flavors that
          remind you of your loved ones and home-cooked meals.
        </p>

        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
