import React, { useEffect, useRef, useContext } from "react";
import style from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import CartButton from "@/sideComponents/CartButton";
import { CartContext } from "@/context/Components";
import { BuyedGames } from "@/utils/types";

const Header: React.FC<{
  getState: (
    cartState: boolean,
    registerState: boolean,
    loggedState: boolean,
    productState: boolean,
    errorState: BuyedGames
  ) => void;
}> = (props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    isCart,
    buyedGames,
    setBuyedGames,
    isRegister,
    setIsRegister,
    isLoggedIn,
    setIsLoggedIn,
    showAddProduct,
    setShowAddProduct,
  } = useContext(CartContext);

  useEffect(() => {
    props.getState(isCart, isRegister, isLoggedIn, showAddProduct, buyedGames);
  }, [isCart, isRegister, isLoggedIn, showAddProduct, buyedGames]);

  const onRegister: () => void = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      localStorage.removeItem("cart");
      setIsLoggedIn(false);
      window.location.reload();
    } else {
      setIsRegister(true);
    }
  };

  const onAddProductClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      toggleAddProduct();
    } else {
      setIsRegister(true);
    }
  };

  const onMyProfile = () => {
    const nickName = localStorage.getItem("nickname");
    if (nickName) {
      router.push(`${nickName}`);
    } else {
      setIsRegister(true);
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
    </nav>
  );
};

export default Header;
