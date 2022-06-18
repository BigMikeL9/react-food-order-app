import React, { useState, useEffect, useContext } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const [isItemAdded, setIsItemAdded] = useState(false);

  //  NOTE: This component will be re-rendered whenever the context changes.
  const cartContextData = useContext(CartContext);
  const { cartItems } = cartContextData;

  const numberOfCartItems = cartItems.reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);

  // -- Button animation when order is submitted
  // Debouncing
  useEffect(() => {
    if (!cartItems.length > 0) return;
    setIsItemAdded(true);

    const timer = setTimeout(() => setIsItemAdded(false), 300);

    // Clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [cartItems]);
  // --------------------

  return (
    <>
      <button
        className={`${classes.button} ${isItemAdded && classes.bump}`}
        onClick={props.onOpenCart}
      >
        <span className={classes.icon}>
          <CartIcon />
        </span>

        <span>Your Cart</span>

        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
