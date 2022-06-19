import React, { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);

  const inputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const itemAmount = inputRef.current.value;
    const itemAmountNum = +itemAmount;

    // -- If entered amount is invalid -> display an error msg
    if (itemAmount.trim().length === 0 || itemAmount <= 0 || itemAmount > 10) {
      setIsAmountValid(false);
      return;
    }

    setIsAmountValid(true);
    props.onAddToCart(itemAmountNum);
  };

  return (
    <>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <Input
          ref={inputRef}
          label="Amount:"
          inputProps={{
            id: "amount_" + props.mealId,
            type: "number",
            min: "0",
            max: "10",
            step: "1",
            defaultValue: "1",
          }}
        />
        <Button type="submit">+ Add</Button>
      </form>

      {!isAmountValid && (
        <p className={classes.error__message}>Please Enter a Valid amount 😡</p>
      )}
    </>
  );
};

export default MealItemForm;
