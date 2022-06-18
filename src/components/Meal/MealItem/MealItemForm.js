import React, { useRef } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  // console.log(props);

  const inputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const itemAmount = inputRef.current.value;
    // console.log(itemAmount);

    props.onAddToCart(itemAmount);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={inputRef}
        label="Amount:"
        inputProps={{
          id: "amount_" + props.mealId,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button type="submit">+ Add</Button>
    </form>
  );
};

export default MealItemForm;
