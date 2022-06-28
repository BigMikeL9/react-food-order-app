import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/CartContext";
import CheckoutForm from "./CheckoutForm";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [error, setError] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSendingOrder, setIsSendingOrder] = useState(false);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  // =======================================
  const cartContextData = useContext(CartContext);

  const { cartItems } = cartContextData;
  const { cartTotalCost } = cartContextData;
  const { resetCart } = cartContextData;

  const cartHasItem = cartItems.length > 0;
  const cartTotalCost_Fixed = ` $${cartTotalCost.toFixed(2)}`;

  // =======================================
  // POST request function
  const postOrderHandler = async (order) => {
    setIsSendingOrder(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-food-order-app-menu-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Sending Order Failed. Please try again.");
      }

      // -- Firebase returns a promise after we SEND a post request
      const data = await response.json();

      console.log(data);
      setIsOrderSubmitted(true);
      resetCart();
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }

    setIsSendingOrder(false);
  };

  // =======================================
  const onAddItemHandler = (newItem) => {
    // -- Change the 'amount' property to '1' inorder to only add 1 when the plus is clicked
    cartContextData.addItem({ ...newItem, amount: 1 });
  };

  // =======================================
  const onRemoveItemHandler = (itemId) => {
    cartContextData.removeItem(itemId);
  };

  // =======================================
  const submitOrderHandler = () => {
    // -- user ready to checkout/ show checkout form
    setIsCheckout(true);
  };

  // =======================================
  const confirmOrderHandler = (userInfo) => {
    const fullOrder = {
      orderItems: cartContextData.cartItems,
      total: cartContextData.cartTotalCost,
      userInfo,
    };
    // -- Send order to backend
    console.log(fullOrder);
    postOrderHandler(fullOrder);
  };

  // ===========================================================
  const cartList = cartItems.map((itemData) => {
    return (
      <CartItem
        key={itemData.id}
        id={itemData.id}
        name={itemData.name}
        price={itemData.price}
        amount={itemData.amount}
        onAdd={() => onAddItemHandler(itemData)}
        onRemove={() => onRemoveItemHandler(itemData.id)}
      />
    );
  });

  // -- 'close' and 'order' buttons
  const modalActions = (
    <div className={classes.actions}>
      <Button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </Button>

      {/* -- If cart has items -> render 'Order' button -- */}
      {cartHasItem && (
        <Button className={classes.button} onClick={submitOrderHandler}>
          Order
        </Button>
      )}
    </div>
  );

  // -- user info form
  const confirmOrderForm = (
    <div>
      {/* -- If order button is clicked -> render 'CheckoutForm' -- */}
      {isCheckout && (
        <CheckoutForm
          onCloseCart={props.onCloseCart}
          onSubmitOrder={confirmOrderHandler}
          isFetching={isSendingOrder}
          error={error}
        />
      )}
    </div>
  );

  const errorContent = <p>Failed to submit order. Please try again!</p>;

  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartList}</ul>
      <div className={classes.total}>
        <h3>Total Amount</h3>
        <p>{cartTotalCost_Fixed}</p>
      </div>
      {/* if user clicked 'order' button (ie: ready to confirm order) -> render 'CheckoutForm'. Else show order button */}
      {isCheckout ? confirmOrderForm : modalActions}
    </>
  );

  const orderIsSubmittingContent = <p>Sending order...</p>;

  const orderSubmittedContent = (
    <>
      <p>Order is on the way. Bon appetite 😋 </p>
      <div className={classes.actions}>
        <Button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </Button>
      </div>
    </>
  );

  // ===========================================================

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {error && errorContent}
      {!isSendingOrder && !isOrderSubmitted && cartModalContent}
      {isSendingOrder && !isOrderSubmitted && orderIsSubmittingContent}
      {isOrderSubmitted && orderSubmittedContent}
    </Modal>
  );
};

export default Cart;
