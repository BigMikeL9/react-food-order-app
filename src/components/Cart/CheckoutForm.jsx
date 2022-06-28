import React, { useState } from "react";
import useInputValidation from "../../hooks/useInputValidation";
import Spinner from "../UI/Spinner/Spinner";

import classes from "./CheckoutForm.module.css";

const CheckoutForm = (props) => {
  const [hasError, seHasError] = useState(false);

  const {
    enteredValue: name,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInputValidation((enteredValue) => enteredValue.trim().length !== 0);

  const {
    enteredValue: street,
    valueIsValid: streetIsValid,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInputValidation((enteredValue) => enteredValue.trim().length !== 0);

  const {
    enteredValue: postalCode,
    valueIsValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useInputValidation((enteredValue) => enteredValue.trim().length === 5);

  const {
    enteredValue: city,
    valueIsValid: cityIsValid,
    hasError: cityCodeHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInputValidation((enteredValue) => enteredValue.trim().length !== 0);

  // =======================================
  const formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  // =======================================
  const submitHandler = (event) => {
    event.preventDefault();

    seHasError(false);

    // -- if form is invalid or failed to send order to backend server
    if (!formIsValid) {
      seHasError(true);
      return;
    }
    // if (props.error) return;

    nameReset();
    streetReset();
    postalCodeReset();
    cityReset();

    // -- Submit Order
    const userInfo = { name, street, postalCode, city };

    props.onSubmitOrder(userInfo);
  };

  // =======================================

  const nameControlClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  const streetControlClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    cityCodeHasError ? classes.invalid : ""
  }`;
  //   =======================================

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        ></input>
        {nameHasError && <p>Please enter a valid Name!</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        ></input>
        {streetHasError && <p>Please enter a valid Street!</p>}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor="postal-code">Postal Code</label>
        <input
          type="text"
          id="postal-code"
          value={postalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        ></input>
        {postalCodeHasError && (
          <p>Please enter a valid Postal Code (5 characters)!</p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        ></input>
        {cityCodeHasError && <p>Please enter a valid City!</p>}
      </div>

      <div className={classes.actions}>
        {hasError && <p>{`Please try again Valid data!`}</p>}

        <button type="button" onClick={props.onCloseCart}>
          Close
        </button>

        <button type="submit" className={classes.submit}>
          {props.isFetching ? <Spinner /> : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
