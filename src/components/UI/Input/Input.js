import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>Amount: </label>
      <input
        id={props.id}
        type={props.type}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
      />
    </div>
  );
};

export default Input;
