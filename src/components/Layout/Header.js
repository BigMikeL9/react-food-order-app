import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Fresco</h1>
        <HeaderCartButton onOpenCart={props.onOpenCart} />
      </header>

      {/* <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!"></img>
      </div> */}
    </>
  );
};

export default Header;
