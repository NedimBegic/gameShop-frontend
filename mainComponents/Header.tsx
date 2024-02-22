import React from "react";
import style from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${style.nav}`}>
      <div className="container">
        <a className="navbar-brand" href="#home">
          GameShop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={`navbar-nav ml-auto ${style.myNav}`}>
            <li className="nav-item">
              <a className="nav-link" href="#home">
                News
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#link">
                Games
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                Add Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                My Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
