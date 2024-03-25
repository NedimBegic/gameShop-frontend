import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Register from "@/sideComponents/Register";
import AddProduct from "@/sideComponents/AddProduct";
import Link from "next/link";
import { useRouter } from "next/router";
import CartButton from "@/sideComponents/CartButton";
import CartModule from "@/sideComponents/CartModule";
import { CartContext } from "@/context/Components";

const Header: React.FC = (props) => {
  const [registerMe, setRegisterMe] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isCart } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if (token && nickname) {
      setIsLoggedIn(true);
    }
  }, []);

  const onRegister: () => void = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      localStorage.removeItem("cart");
      setIsLoggedIn(false);
      window.location.reload();
    } else {
      setRegisterMe(true);
    }
  };

  const toggleRegister = () => {
    setRegisterMe((prevState) => !prevState);
  };

  const onAddProductClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      toggleAddProduct();
    } else {
      setRegisterMe(true);
    }
  };

  const onMyProfile = () => {
    const nickName = localStorage.getItem("nickname");
    if (nickName) {
      router.push(`${nickName}`);
    } else {
      setRegisterMe(true);
    }
  };

  const toggleAddProduct = () => {
    setShowAddProduct((prevState) => !prevState);
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const header = headerRef.current;
    if (header) {
      if (window.pageYOffset > 40) {
        header.classList.add(style["sticky-nav"]);
      } else {
        header.classList.remove(style["sticky-nav"]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={headerRef}
      className={`navbar navbar-expand-lg navbar-dark ${style.nav}`}
    >
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img className={style.logo} src="/gameShop.png" alt="Game Shop" />
        </Link>
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
              <Link className="nav-link" href="/">
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/games">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={onAddProductClick}>
                Add Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={onMyProfile}>
                My Profile
              </a>
            </li>
          </ul>
          <CartButton />
          <Button
            onClick={onRegister}
            className={style.register}
            variant="warning"
          >
            {isLoggedIn ? "Log out" : "Register"}
          </Button>{" "}
        </div>
      </div>
      {registerMe && !isLoggedIn && (
        <Register toggleRegister={toggleRegister} />
      )}
      {showAddProduct && <AddProduct toggle={toggleAddProduct} />}
      {isCart && <CartModule />}
    </nav>
  );
};

export default Header;
