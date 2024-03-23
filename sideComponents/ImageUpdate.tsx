import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./ImageUpdate.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import BackgroundBlur from "./BackgroundBlur";

const PictureUpdateComponent: React.FC<{ toggle: () => void }> = ({
  toggle,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const token = localStorage.getItem("token");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      setMessage("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const { nickname } = router.query;

    if (typeof nickname !== "string") {
      console.error("Invalid nickname");
      return;
    }

    try {
      setMessage("Updating image...");
      const response = await fetch(
        `https://gameshop-mh2m.onrender.com/user/${nickname}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        if (data.success) {
          window.location.reload();
        }
      } else {
        setMessage("Failed to update image");
        throw new Error("Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
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
              onChange={handleFileChange}
            />
          </div>
          <p className={styles.message}>{message}</p>
          <button type="submit" className={`btn btn-primary ${styles.btn}`}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PictureUpdateComponent;
