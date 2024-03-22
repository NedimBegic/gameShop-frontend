// PictureUpdateComponent.tsx

import React from "react";
import styles from "./ImageUpdate.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import BackgroundBlur from "./BackgroundBlur";

const PictureUpdateComponent: React.FC<{ toggle: () => void }> = ({
  toggle,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle submit logic here
  };

  return (
    <div>
      <BackgroundBlur toggleFunc={toggle} />
      <div className={`container ${styles.pictureUpdateContainer}`}>
        <button onClick={toggle} className={styles.x}>
          X
        </button>
        <img src="/gameShopWhite.png" alt="Logo" className={styles.logoImg} />
        <form onSubmit={handleSubmit} className={styles.updateForm}>
          <div className={styles.formGroup}>
            <label htmlFor="imageInput" className="mb-2">
              Choose Image:
            </label>
            <input
              type="file"
              className={`form-control-file ${styles.formControlFile}`}
              id="imageInput"
            />
          </div>
          <button type="submit" className={`btn btn-primary ${styles.btn}`}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PictureUpdateComponent;
