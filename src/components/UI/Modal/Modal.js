import React from "react";
import ReactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart} />;
};

const ModalWindow = (props) => {
  return (
    <>
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <>
          <Backdrop onCloseCart={props.onCloseCart} />
          <ModalWindow>{props.children}</ModalWindow>
        </>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;
