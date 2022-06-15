import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../Assets/meals.jpg";

import classes from "./Header.module.css";

const Header = () => {
  console.log(classes);

  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!"></img>
      </div>
    </>
  );
};

export default Header;