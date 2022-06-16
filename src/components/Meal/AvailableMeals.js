import React from "react";

import Card from "../UI/Card/Card";
import MealItem from "./MealItem";
import DUMMY_MEALS from "./dummy-meals";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  return (
    <Card className={classes.meals}>
      <ul>
        {DUMMY_MEALS.map((mealData) => {
          return (
            <MealItem
              key={mealData.id}
              id={mealData.id}
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
