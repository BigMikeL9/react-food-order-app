import React, { useContext } from "react";
import CartItem from "./CartItem";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/CartContext";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartContextData = useContext(CartContext);

  const { cartItems } = cartContextData;
  const { cartTotalCost } = cartContextData;

  const cartList = cartItems.map((itemData) => {
    return (
      <CartItem
        key={itemData.id}
        id={itemData.id}
        name={itemData.name}
        price={itemData.price}
        amount={itemData.amount}
      />
    );
  });

  const submitOrderHandler = () => {
    console.log(`Order is on the way!! Total: $${cartTotalCost} 👍`);
  };

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <ul className={classes["cart-items"]}>{cartList}</ul>

      <div className={classes.total}>
        <h3>Total Amount</h3>
        <p>{`$${cartTotalCost}`}</p>
      </div>

      <div className={classes.actions}>
        <Button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </Button>
        <Button className={classes.button} onClick={submitOrderHandler}>
          Order
        </Button>
      </div>
    </Modal>
  );
};

export default Cart;
