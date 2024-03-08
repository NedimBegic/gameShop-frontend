import style from "./Register.module.css";

enum FormType {
  Register,
  SignIn,
}

const Register: React.FC = (props) => {
  return (
    <div className={style.modal}>
      <img className={style.logo} src="gameShopWhite.png" alt="logo" />
      <div className={style.buttons}>
        <button>Register</button> <button>Sign In</button>
      </div>
    </div>
  );
};

export default Register;
