import React, { useReducer } from "react";
import CartContext from "./CartContext";

const initialCartState = {
  cartItems: [],
  cartTotalCost: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
  }

  if (action.type === "REMOVE_CART_ITEM") {
  }

  return initialCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  console.log(cartState);

  const addItemHandler = (newItem) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", newItem: newItem });
  };

  const removeItemHandler = (itemId) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", itemId: itemId });
  };

  const cartContext = {
    cartItems: cartState.cartItems,
    cartTotalCost: cartState.cartTotalCost,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
