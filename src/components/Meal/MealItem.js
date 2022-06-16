import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../Context/cartContext";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartContextData = useContext(CartContext);

  const addToCartHandler = (amount) => {
    // Pass data to parent 'availableMeals.js'
    const mealData = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    };

    // console.log(mealData);
    cartContextData.addItem(mealData);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>${props.price}</p>
      </div>

      <MealItemForm mealName={props.name} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;
