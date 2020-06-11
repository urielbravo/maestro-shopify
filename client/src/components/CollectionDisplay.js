import React, { useState } from "react";
import CollectionProduct from "./CollectionProduct";
import CollectionProductDetail from "./CollectionProductDetail";
import Cart from './Cart'

function CollectionDisplay(props) {
  const [ChosenProduct, setChosenProduct] = useState("");

  let collection = props.collections.find((obj) => {
    return obj.node.id === props.collectionID;
  });

  let onProductClicked = (product) => {
    setChosenProduct(product)
  };

  let renderProducts = () => {
    if (collection) {
      return collection.node.products.edges.map((product) => (
        <CollectionProduct
          onProductClicked={onProductClicked}
          key={product.node.id}
          collection={collection}
          productImage={product.node.images.edges[0].node.originalSrc}
          productTitle={product.node.title}
          productDescription={product.node.description}
          productPrice={product.node.variants.edges[0].node.price}
        />
      ));
    }
  };

  let renderCollectionProductDetail = () => {
    return (
      <CollectionProductDetail 
            productImage={ChosenProduct.productImage}
            productTitle={ChosenProduct.productTitle}
            productPrice={ChosenProduct.productPrice}
            productDescription={ChosenProduct.productDescription}
          />
    )
  }

  console.log(`product clicked: ${JSON.stringify(ChosenProduct)}`);

  return (
    <div>
      <div className="collection-display">
        <section className="collection-name-section">
          <h3>FEATURED COLLECTION</h3>
          <p>
            {collection ? collection.node.title : "just another collection"}
          </p>
        </section>
        <section className="collection-products-section">
          {/* <Cart /> */}
          {ChosenProduct === "" ? renderProducts()  : renderCollectionProductDetail()}
        </section>
      </div>
    </div>
  );
}

export default CollectionDisplay;
