import React, { useState, useEffect, useCallback } from "react";

import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import Spinner from "../UI/Spinner/Spinner";
import Error from "../UI/Error/Error";
import DUMMY_MEALS from "./dummy-meals";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [menu, setMenu] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const fetchMenuHandler = useCallback(async () => {
    setIsFetching(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-food-order-app-menu-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedData = Object.entries(data).map((dataItem) => {
        const key = dataItem[0];
        const value = dataItem[1];

        return {
          id: key,
          name: value.name,
          description: value.description,
          price: value.price,
        };
      });

      console.log(transformedData);

      setMenu(transformedData);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }

    setIsFetching(false);
  }, []);

  // ------------------------------------------------------------------------
  useEffect(() => {
    fetchMenuHandler();
  }, [fetchMenuHandler]);

  // ------------------------------------------------------------------------
  const mealsList = menu.map((mealData) => {
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

  // ------------------------------------------------------------------------
  let content = <p>No items on Menu</p>;

  if (mealsList.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  if (error)
    content = <Error errorMessage={error} fetchMenu={fetchMenuHandler} />;

  if (isFetching) content = <Spinner />;
  // ------------------------------------------------------------------------

  return <Card className={classes.meals}>{content}</Card>;
};

export default AvailableMeals;
