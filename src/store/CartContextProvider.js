import React, { useReducer } from "react";
import CartContext from "./CartContext";

const initialCartState = {
  cartItems: [],
  cartTotalCost: 0,
};

const cartReducer = (state, action) => {
  // -- 🟢 ADD Item to Cart
  if (action.type === "ADD_CART_ITEM") {
    // -- Get total cost
    let updatedCartCost = +(
      state.cartTotalCost +
      action.newItem.price * action.newItem.amount
    ).toFixed(2);

    // -- Check if the newItem is already in Cart
    const existingItemIndex = state.cartItems.findIndex((item) => {
      return item.id === action.newItem.id;
    });

    const existingItem = state.cartItems[existingItemIndex];

    let updatedCartItems;

    // -- 🔵 If newItems IS already in cart -> update the existing item with newItem Info
    if (existingItem) {
      // -- update the existing item in Cart with newItem Info
      const updatedCartItem = {
        ...existingItem,
        amount: existingItem.amount + action.newItem.amount,
      };

      // -- create a copy if the existing cartItems array 🌟🌟
      updatedCartItems = [...state.cartItems];

      // -- Override the existing cart Item, in the new copied array 'updatedCartItems', with the 'updatedCartItem'  🌟🌟
      updatedCartItems[existingItemIndex] = updatedCartItem;

      return {
        cartItems: updatedCartItems,
        cartTotalCost: updatedCartCost,
      };
    } else {
      // -- 🟠 If newItem is NOT in cart -> add it to cart
      updatedCartItems = state.cartItems.concat(action.newItem);
    }

    return {
      cartItems: updatedCartItems,
      cartTotalCost: updatedCartCost,
    };
  }

  // -- 🔴 Remove Item from Cart
  if (action.type === "REMOVE_CART_ITEM") {
    // get index of already existing item in Cart
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.itemId
    );

    const existingCartItem = state.cartItems[existingCartItemIndex];

    const updatedCartCost = +(
      state.cartTotalCost - existingCartItem.price
    ).toFixed(2);

    let updatedCartItems;
    let updatedCartItem;

    // -- create a copy if the existing cartItems array
    updatedCartItems = [...state.cartItems];

    // -- If item amount in Cart is equal to 1 -> remove it and update cartItems
    if (existingCartItem.amount === 1) {
      // remove element in array that has an amount of 1 when minus button is clicked
      updatedCartItems = updatedCartItems.filter(
        (item) => item.id !== action.itemId
      );
    } else {
      // -- update the existing item in Cart with newItem Info
      // -- just remove 1 from the item amount
      updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      // override the existing item with new one
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }

    return {
      cartItems: updatedCartItems,
      cartTotalCost: updatedCartCost,
    };
  }

  // -- Fall back incase we have another action type
  return initialCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  // console.log(cartState);

  // -- 🟢 ADD Item to Cart
  const addItemHandler = (newItem) => {
    dispatchCartAction({
      type: "ADD_CART_ITEM",
      newItem: newItem,
    });
  };

  // -- 🔴 Remove Item from Cart
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
