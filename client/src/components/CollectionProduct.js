import React from "react";
import "../styles/CollectionProduct.css";

function CollectionProduct(props) {
  return (
    <div id="collection-products-container">
      <img
        id="collection-product-image"
        src={props.productImage}
        alt="this is one of the products of the collection"
      />
      <p>{props.ProductTitle}</p>
      <p>{props.productPrice}</p>
    </div>
  );
}

export default CollectionProduct;
