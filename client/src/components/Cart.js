import React, { useContext } from "react";
import OrderForm from "./OrderForm";
import "../styles/Cart.css";
import { CartProductsContext } from './CartProductsContext'

function Cart(props) {
  const { cartProducts, setCartProducts } = useContext(CartProductsContext)


  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name")
    setCartProducts(cartProducts.filter(product => product.productId !== name));
   };

  let displayProducts = cartProducts.map((product) => {
    return (
      <>
        <div className="product-layout">
          <img className="cart-image" src={product.productViewImage} alt={product.productViewTitle} />
          <div className="product-text">
            <p>{product.productViewTitle}</p>
            <div className="cart-right-items">
              <p>${product.productViewPrice}</p>
              <span name={product.productId} onClick={handleRemoveItem}> 
                remove
              </span>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <p>Cart</p>
      <div className="cart-product">{displayProducts}</div>
      <div className="cart-subtotal">
        <p>Subtotal ({cartProducts.length} {cartProducts.length > 1 ? "items" : "item" })</p>
        <p>${cartProducts.reduce((a, b) => +a + +b.productViewPrice, 0)}</p>
      </div>
      <OrderForm />
    </>
  );
}

export default Cart;
