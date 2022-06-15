import React from "react";

import Card from "../UI/Card/Card";
import DUMMY_MEALS from "./dummy-meals";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  console.log(DUMMY_MEALS);
  return (
    <Card className={classes.meals}>
      <ul>
        {DUMMY_MEALS.map((mealData) => {
          return (
            <MealItem
              key={mealData.id}
              name={mealData.name}
              description={mealData.description}
              price={mealData.price}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
