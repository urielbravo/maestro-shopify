import React, { createContext, useState } from "react";

export const CartProductsContext = createContext();

export const CartProductsProvider = (props) => {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <CartProductsContext.Provider value={{ cartProducts, setCartProducts }}>
      {props.children}
    </CartProductsContext.Provider>
  );
};
