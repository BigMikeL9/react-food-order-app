import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  cartItemsAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
