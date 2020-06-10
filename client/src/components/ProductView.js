import React from "react";
import '../styles/ProductView.css'

function ProductView(props) {
  return (
    <>
      <img id="product-image" src={props.productViewImage} alt="" />
      <p id="product-title">{props.productViewTitle}</p>
      <p>{props.productViewDescription}</p>
      <p id="product-price">{`$${props.productViewPrice}`}</p>
    </>
  );
}

export default ProductView;
