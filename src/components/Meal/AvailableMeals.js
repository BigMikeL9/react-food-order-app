import React from "react";

import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import DUMMY_MEALS from "./dummy-meals";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((mealData) => {
    return (
      <MealItem
        key={mealData.id}
        id={mealData.id}
        name={mealData.name}
        description={mealData.description}
        price={mealData.price}
      />
    );
  });

  return (
    <Card className={classes.meals}>
      <ul>{mealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
