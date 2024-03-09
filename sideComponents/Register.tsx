import React, { useState } from "react";
import style from "./Register.module.css";
import BackgroundBlur from "./BackgroundBlur";

enum FormType {
  Register,
  SignIn,
}

interface RegisterProps {
  toggleRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ toggleRegister }) => {
  const [formType, setFormType] = useState<FormType>(FormType.Register);

  return (
    <div>
      <BackgroundBlur toggleFunc={toggleRegister} />
      <div className={style.modal}>
        <button onClick={toggleRegister} className={style.x}>
          X
        </button>
        <img className={style.logo} src="gameShopWhite.png" alt="logo" />
        <div className={style.buttons}>
          <button onClick={() => setFormType(FormType.Register)}>
            Register
          </button>
          <button onClick={() => setFormType(FormType.SignIn)}>Sign In</button>
        </div>
        <div className={style.formDiv}>
          {formType === FormType.Register ? (
            <div className={style.form}>
              <p className={style.firstP}>
                Get started with a free GameShop account to buy, review, and
                discover top games, and more!
              </p>
              <label>Email:</label>
              <input type="email" />
              <label>Nickname:</label>
              <input type="text" />
              <label>Password:</label>
              <input type="password" />
              <button>Register</button>
            </div>
          ) : (
            <div className={style.form}>
              <p>Welcome back!</p>
              <label>Email:</label>
              <input type="email" />
              <label>Password:</label>
              <input type="password" />
              <button>Sign In</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
