import React, { useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  // console.log(props);

  const [amountEntered, setAmountEntered] = useState("1");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (amountEntered <= 0) return;

    props.onAddToCart(amountEntered);
  };

  const amountChangeHandler = (event) => {
    setAmountEntered(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        id={props.mealName}
        type="number"
        step={1}
        min={0}
        max={20}
        value={amountEntered}
        onChange={amountChangeHandler}
      />
      <Button type="submit">+ Add</Button>
    </form>
  );
};

export default MealItemForm;
