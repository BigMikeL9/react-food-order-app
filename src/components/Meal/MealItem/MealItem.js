import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartContextData = useContext(CartContext);

  const addToCartHandler = (amount) => {
    // Pass data to parent 'availableMeals.js'
    const mealData = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    };
    cartContextData.addItem(mealData);
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
