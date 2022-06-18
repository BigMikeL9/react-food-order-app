import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      value: inputRef.current.value,
    };
  });

  return (
    <div className={classes.input}>
      <label htmlFor={props.inputProps.id}>{props.label}</label>
      <input ref={inputRef} {...props.inputProps} />
      {/* 'inputProps' is an Object. '{...props.inputProps}' is the same as 👇

                            <input
                              ref={inputRef}
                              id={props.id}
                              min={props.min}
                              max={props.max}
                              step={props.max}
                              defaultValue={props.defaultValue}
                            />
       
       */}
    </div>
  );
});

export default Input;
