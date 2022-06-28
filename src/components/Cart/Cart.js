import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/CartContext";
import CheckoutForm from "./CheckoutForm";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [order, setOrder] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const cartContextData = useContext(CartContext);

  console.log(cartContextData);

  const { cartItems } = cartContextData;
  const { cartTotalCost } = cartContextData;

  const cartHasItem = cartItems.length > 0;
  const cartTotalCost_Fixed = ` $${cartTotalCost.toFixed(2)}`;

  const postOrderHandler = async (order) => {
    setIsFetching(true);
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
      setOrder(order);
      setOrderSubmitted(true);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setIsFetching(false);
  };

  const onAddItemHandler = (newItem) => {
    // -- Change the 'amount' property to '1' inorder to only add 1 when the plus is clicked
    cartContextData.addItem({ ...newItem, amount: 1 });
  };

  const onRemoveItemHandler = (itemId) => {
    cartContextData.removeItem(itemId);
  };

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

  // -- 🟢 Do something with Submitted data
  const submitOrderHandler = (userInfo) => {
    console.log(`Order is on the way!! Total: ${cartTotalCost_Fixed} 👍`);
    console.log(userInfo);
    console.log(cartContextData);

    const order = {
      orderItems: cartContextData.cartItems,
      total: cartContextData.cartTotalCost,
      userInfo,
    };

    // Send order to backend
    postOrderHandler(order);
  };

  // ===========================================================
  let content = (
    <>
      <ul className={classes["cart-items"]}>{cartList}</ul>
      <div className={classes.total}>
        <h3>Total Amount</h3>
        <p>{cartTotalCost_Fixed}</p>
      </div>
      <div>
        {/* -- If cart has items -> render 'CheckoutForm' -- */}
        {cartHasItem && (
          <CheckoutForm
            onCloseCart={props.onCloseCart}
            onSubmitOrder={submitOrderHandler}
            isFetching={isFetching}
            error={error}
          />
        )}
      </div>
    </>
  );

  if (orderSubmitted) content = <p>Order is on the way. Bon appetite 😋 </p>;

  return <Modal onCloseCart={props.onCloseCart}>{content}</Modal>;
};

export default Cart;
