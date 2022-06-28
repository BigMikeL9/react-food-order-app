import React from "react";

// always add object items in 'ContextProvider' inorder to get better outo completion.
const CartContext = React.createContext({
  cartItems: [],
  cartItemsAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {},
});

export default CartContext;
