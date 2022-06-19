import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartContextData = useContext(CartContext);

  //  -- Get added meal amount from child component element 'MealItemForm.js'
  const addToCartHandler = (amount) => {
    const newItemData = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    };

    // -- Pass newItem data to Context
    cartContextData.addItem(newItemData);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{price}</p>
      </div>

      <MealItemForm mealId={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;
