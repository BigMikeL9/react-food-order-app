import React, { useState } from "react";

const CartContext = React.createContext({
  cartItems: [],
  cartItemsAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsAmount, setCartItemsAmount] = useState(0);

  const addItemHandler = (newItem) => {
    const newItemAmount = +newItem.amount;

    setCartItems((prevCartItems) => {
      return prevCartItems.concat(newItem);
    });

    setCartItemsAmount((prevAmount) => prevAmount + newItemAmount);
  };

  const removeItemHandler = (item) => {
    console.log(item);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        cartItemsAmount: cartItemsAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
