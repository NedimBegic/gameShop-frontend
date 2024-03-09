import style from "./BackgroundBlur.module.css";

const BackgroundBlur: React.FC<{ toggleFunc: () => void }> = (props) => {
  return <div onClick={props.toggleFunc} className={style.div}></div>;
};

export default BackgroundBlur;
