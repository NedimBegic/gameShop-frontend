import React from "react";
import { Form, Button } from "react-bootstrap";
import style from "./AddProduct.module.css";
import BackgroundBlur from "./BackgroundBlur";

const AddProduct: React.FC<{ toggle: () => void }> = (props) => {
  return (
    <div>
      <BackgroundBlur toggleFunc={props.toggle} />
      <div className={style.modal}>
        <button onClick={props.toggle} className={style.x}>
          X
        </button>
        <img src="/gameShopWhite.png" alt="logo" />
        <div className={style.scrol}>
          <Form className={style.form}>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter product price" />
            </Form.Group>
            <Form.Group className={style.des} controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter product description"
              />
            </Form.Group>
            <Form.Group className={style.Genre} controlId="productGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control as="select">
                <option>RPG</option>
                <option>Shooter</option>
                <option>Strategy</option>
                <option>Sport</option>
                <option>Action</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productImages">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
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
