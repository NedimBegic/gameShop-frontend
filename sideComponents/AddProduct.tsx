import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import style from "./AddProduct.module.css";
import BackgroundBlur from "./BackgroundBlur";
import { useRouter } from "next/router";

const AddProduct: React.FC<{ toggle: () => void }> = (props) => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productGenre: "rpg",
    productImages: null as FileList | null,
    releaseDate: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, productImages: e.target.files });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("price", formData.productPrice);
    formDataToSend.append("description", formData.productDescription);
    formDataToSend.append("role", formData.productGenre.toLowerCase());
    formDataToSend.append("date", formData.releaseDate);

    // Append each image file with the name "file"
    if (formData.productImages) {
      for (let i = 0; i < formData.productImages.length; i++) {
        formDataToSend.append("file", formData.productImages[i]);
      }
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MY_BACKEND}/games`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        router.push("/games");
        window.location.reload();
        props.toggle();
      } else {
        const errorMessage = data.message.includes(
          "Bind parameters must not contain function(s). To pass the body of a function as a string call .toString() first"
        )
          ? "Only JPG files are allowed"
          : data.message;
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to submit game");
    }
  };

  return (
    <div>
      <BackgroundBlur toggleFunc={props.toggle} />
      <div className={style.modal}>
        <button onClick={props.toggle} className={style.x}>
          X
        </button>
        <img src="/gameShopWhite.png" alt="logo" />
        <div className={style.scrol}>
          <Form className={style.form} onSubmit={handleSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter product price"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className={style.des} controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter product description"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className={style.Genre} controlId="productGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control as="select" onChange={handleFormChange}>
                <option value="rpg">RPG</option>
                <option value="shooter">Shooter</option>
                <option value="strategy">Strategy</option>
                <option value="sport">Sport</option>
                <option value="action">Action</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productImages">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="releaseDate">
              {" "}
              {/* Add release date field */}
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, releaseDate: e.target.value })
                }
              />
            </Form.Group>
            {message && <p className={style.message}>{message}</p>}
            <Button variant="primary" type="submit">
              Submit game
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
