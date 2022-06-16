import React from "react";
import ReactDom from "react-dom";

import classes from "./Modal.module.css";
import Cart from "../../Cart/Cart";

const ModalWindow = (props) => {
  const closeModalHandler = () => {
    props.onCloseModal();
  };

  return (
    <>
      <div className={classes.backdrop} onClick={closeModalHandler} />
      <div className={classes.modal}>
        <Cart />
      </div>
    </>
  );
};

const Modal = (props) => {
  console.log(props);
  return (
    <>
      {ReactDom.createPortal(
        <ModalWindow onCloseModal={props.onCloseModal} />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
