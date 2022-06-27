import { useSlotProps } from "@mui/base";
import React from "react";
import Button from "../Button/Button";

import classes from "./Error.module.css";

const Error = (props) => {
  console.log(classes);
  const errorClasses = `${classes["error-container"]} ${props.className}`;

  return (
    <div className={errorClasses}>
      <p>{props.errorMessage}</p>
      <Button onClick={props.fetchMenu}>Try Again</Button>
    </div>
  );
};

export default Error;
