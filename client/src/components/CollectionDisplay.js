import React from "react";
import CollectionProduct from "./CollectionProduct";
import { render } from "react-dom";

function CollectionDisplay(props) {
  let collection = props.collections.find((obj) => {
    return obj.node.id === props.collectionID;
  });

  // if (collection) {
  //   // console.log(`porducts of the collection: ${JSON.stringify(collection.node.products.edges)}`)
  //   for (const product of collection.node.products.edges) {
  //     console.log(product);
  //   }
  // }

  let renderProducts = () => {
    if (collection) {
      for (const product of collection.node.products.edges) {
        return (
          <CollectionProduct
            productImage= {product.node.images.edges[0].node.originalSrc}
            productId={product.node.id}
            ProductTitle={product.node.title}
            productPrice={product.node.variants.edges[0].node.price}
          />
        );
      }
    }
  };

  console.log(collection)

  return (
    <div>
      <div className="collection-display">
        <section className="collection-name-section">
          <h3>FEATURED COLLECTION</h3>
          <p>
            {collection
              ? collection.node.title
              : "just another colletction"}
          </p>
        </section>
        <section className="collection-products-section">
          {renderProducts()}
        </section>
      </div>
    </div>
  );
}

export default CollectionDisplay;
