import React, { useContext } from "react";
import CartItem from "./CartItem";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/CartContext";
import CheckoutForm from "./CheckoutForm";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartContextData = useContext(CartContext);

  const { cartItems } = cartContextData;
  const { cartTotalCost } = cartContextData;

  const cartHasItem = cartItems.length > 0;
  const cartTotalCost_Fixed = ` $${cartTotalCost.toFixed(2)}`;

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
  const submitOrderHandler = (buyerInfo) => {
    console.log(`Order is on the way!! Total: ${cartTotalCost_Fixed} 👍`);
    console.log(buyerInfo);
    console.log(cartContextData);

    const order = {
      orderItems: cartContextData.cartItems,
      total: cartContextData.cartTotalCost,
      buyerInfo,
    };

    console.log(order);
  };

  return (
    <Modal onCloseCart={props.onCloseCart}>
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
          />
        )}
      </div>
    </Modal>
  );
};

export default Cart;
