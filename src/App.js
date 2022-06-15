import React from "react";

import Header from "./components/Layout/Header";
import MealsSummary from "./components/Meal/MealsSummary";
import AvailableMeals from "./components/Meal/AvailableMeals";

function App() {
  return (
    <>
      <Header />
      <MealsSummary />
      <AvailableMeals />
    </>
  );
}

export default App;
