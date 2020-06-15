import React, { createContext, useState } from "react";

export const CartProductsContext = createContext()

export const CartProductsProvider = (props) => {
    const [cartProducts, setCartProducts] = useState([])

    return (
        <CartProductsContext.Provider value={{cartProducts, setCartProducts}}>
            {props.children}
        </CartProductsContext.Provider>
    )
}






// export const CartProductsContext = createContext();

// export class CartProductProvider extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { CartProducts: [] };
//   }

//   addToCart(selectedProduct) {
//       this.setState({ CartProducts: [...this.state.CartProducts, selectedProduct] })
//   }

//   render() {
//     return (
//       <CartProductsContext.Provider
//         value={{ CartProducts: this.state.CartProducts, addToCart: this.addToCart }}
//       >
//         {this.props.children}
//       </CartProductsContext.Provider>
//     );
//   }
// }
