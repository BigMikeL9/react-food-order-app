import React, { useState, useEffect, useContext } from "react";
import CartContext from "../../Context/cartContext";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import Modal from "../UI/Modal/Modal";

const HeaderCartButton = (props) => {
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const cartContextData = useContext(CartContext);

  // -- NOTE: use this when form is submitted
  const itemAddHandler = () => {
    setIsItemAdded(true);
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <Modal onCloseModal={closeModalHandler} />}

      <button
        className={`${classes.button} ${isItemAdded && classes.bump}`}
        onClick={openModalHandler}
      >
        <span className={classes.icon}>
          <CartIcon />
        </span>

        <span>Your Cart</span>

        <span className={classes.badge}>{cartContextData.cartItemsAmount}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
