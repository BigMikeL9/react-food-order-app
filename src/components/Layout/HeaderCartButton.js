import React, { useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = () => {
  const [isHover, setIsHover] = useState(false);

  const mouseEnterHandler = () => {
    setIsHover(true);
  };

  const mouseLeaveHandler = () => {
    setIsHover(false);
  };

  return (
    <button
      className={`${classes.button} ${isHover && classes.bump}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>

      <span className={classes.badge}>2</span>
    </button>
  );
};

export default HeaderCartButton;
