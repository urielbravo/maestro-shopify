import React from "react";
import "../styles/CollectionProduct.css";

function CollectionProduct(props) {

  let passProduct = () => {
    props.onProductClicked({
      productImage: props.productImage,
      productTitle: props.productTitle,
      productDescription: props.productDescription,
      productPrice: props.productPrice
    })
  }
  
  return (
    <div id="collection-products-container" onClick={passProduct}>
      <img
        id="collection-product-image"
        src={props.productImage}
        alt="this is one of the products of the collection"
      />
      <p>{props.productTitle}</p>
      <p>{`$${props.productPrice}`}</p>
    </div>
  );
}

export default CollectionProduct;
