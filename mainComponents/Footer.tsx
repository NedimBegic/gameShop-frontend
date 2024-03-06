import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import style from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.upperHeading}>
        <img src={"/gameShop.png"} alt="Logo" className={style.logo} />
      </div>
      <div className={style.flexContainer}>
        <div className={style.div}>
          <h4>Overview</h4>
          <ul>
            <li>About</li>
            <li>Help Center</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Cookies Settings</li>
          </ul>
        </div>
        <div className={style.div}>
          <h4>Follow Us</h4>
          <div className={style.socialIcons}>
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
        </div>
        <div className={style.div}>
          <h4>Explore Other Brands</h4>
          <ul className={style.otherBrands}>
            <li>Gamespot</li>
            <li>GiantBomb</li>
            <li>TV Guide</li>
            <li>GameFAQ</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
