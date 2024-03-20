import React, { useState } from "react";
import style from "./Register.module.css";
import { useRouter } from "next/router";
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
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("nickName", nickname);
    formData.append("password", password);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        "https://gameshop-mh2m.onrender.com/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nickname", data.data.nickName);
        toggleRegister();
        router.push("/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while registering.");
    }
  };

  const handleSignIn = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://gameshop-mh2m.onrender.com/auth/login",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nickname", data.data.nickName);
        toggleRegister();
        router.push("/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while signing in.");
    }
  };

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
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Nickname:</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="file">Profile picture</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <span className={style.errorMessage}>{errorMessage}</span>
              <button onClick={handleRegister}>Register</button>
            </div>
          ) : (
            <div className={style.form}>
              <p>Welcome back!</p>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={style.errorMessage}>{errorMessage}</span>
              <button onClick={handleSignIn}>Sign In</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
