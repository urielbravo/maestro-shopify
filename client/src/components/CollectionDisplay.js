import React, {useState} from "react";
import CollectionProduct from "./CollectionProduct";
import CollectionProductDetail from './CollectionProductDetail'


function CollectionDisplay(props) {
  const [ChosenProduct, setChosenProduct] = useState("")

  let collection = props.collections.find((obj) => {
    return obj.node.id === props.collectionID;
  });

  onProductClicked(product) {
    setChosenProduct(product)
  } 

  let renderProducts = () => {
    if (collection) {
      return collection.node.products.edges.map((product) => 
         (
          <CollectionProduct
          key={product.node.id}
          collection={collection}
          productImage={product.node.images.edges[0].node.originalSrc}
          ProductTitle={product.node.title}
          productPrice={product.node.variants.edges[0].node.price}
        />
        )
      );
    }
  };

  return (
    <div>
      <div className="collection-display">
        <section className="collection-name-section">
          <h3>FEATURED COLLECTION</h3>
          <p>
            {collection ? collection.node.title : "just another colletction"}
          </p>
        </section>
        <section className="collection-products-section">
          {/* <CollectionProductDetail /> */}
          {renderProducts()}
        </section>
      </div>
    </div>
  );
}

export default CollectionDisplay;
