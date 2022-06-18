import React, { useContext } from "react";
import Button from "../UI/Button/Button";
import CartContext from "../../store/CartContext";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const cartContextData = useContext(CartContext);

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.price}</span>
          <span className={classes.amount}>{props.amount}</span>
        </div>
      </div>

      <div className={classes.actions}>
        <Button onClick={cartContextData.removeItem}>-</Button>
        <Button>+</Button>
      </div>
    </li>
  );
};

export default CartItem;
