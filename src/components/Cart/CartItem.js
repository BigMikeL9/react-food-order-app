import React from "react";
import Button from "../UI/Button/Button";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
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
        <Button>-</Button>
        <Button>+</Button>
      </div>
    </li>
  );
};

export default CartItem;
