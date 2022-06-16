import React, { useContext } from "react";
import CartContext from "../../Context/cartContext";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = () => {
  const cartContextData = useContext(CartContext);

  console.log(cartContextData);

  return (
    <ul className={classes["cart-items"]}>
      {cartContextData.cartItems.map((itemData) => {
        return (
          <CartItem
            key={itemData.id}
            id={itemData.id}
            name={itemData.name}
            price={itemData.price}
            amount={itemData.amount}
          />
        );
      })}
    </ul>
  );
};

export default Cart;
