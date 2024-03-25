import React from "react";
import styles from "./ErrorModule.module.css";
import BackgroundBlur from "@/sideComponents/BackgroundBlur";

interface Props {
  message: string;
  toggle: () => void;
}

const ErrorModule: React.FC<Props> = ({ message, toggle }) => {
  return (
    <div>
      <BackgroundBlur toggleFunc={toggle} />
      <div className={styles.errorModule}>
        <p>{message}</p>
        <button onClick={toggle}>OK</button>
      </div>
    </div>
  );
};

export default ErrorModule;
