import React, { useState } from "react";
import CollectionProduct from "./CollectionProduct";
import CollectionProductDetail from "./CollectionProductDetail";
import Cart from "./Cart";
import "../styles/CollectionDisplay.css";
import { BackToShopContext } from "./BackToShopContext";

function CollectionDisplay(props) {
  const [ChosenProduct, setChosenProduct] = useState("");
  const [cartToggle, setCartToggle] = useState(false);
  const [backToShop, setbackToShop] = useState(true);

  let collection = props.collections.find((obj) => {
    return obj.node.id === props.collectionID;
  });

  let onProductClicked = (product) => {
    setChosenProduct(product);
  };

  let renderProducts = () => {
    if (collection) {
      return collection.node.products.edges.map((product) => (
        <CollectionProduct
          onProductClicked={onProductClicked}
          key={product.node.id}
          collection={collection}
          productId={product.node.id}
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
        productId={ChosenProduct.productId}
        productImage={ChosenProduct.productImage}
        productTitle={ChosenProduct.productTitle}
        productPrice={ChosenProduct.productPrice}
        productDescription={ChosenProduct.productDescription}
      />
    );
  };

  let renderCart = () => {
    return <Cart />;
  };

  let renderView = () => {
    if (!ChosenProduct && !cartToggle) {
      return (
        <section className="collection-products-list">
          {renderProducts()}
        </section>
      );
    } else if (ChosenProduct && !cartToggle) {
      return (
        <section className="collection-products-section">
          {renderCollectionProductDetail()}
        </section>
      );
    } else if (cartToggle) {
      return renderCart();
    }
  };

  return (
    <div className="collection-display">
      <section className="collection-name-section">
        <h3>FEATURED COLLECTION</h3>
        <p>{collection ? collection.node.title : "just another collection"}</p>
        <p
          className="cart-icon"
          onClick={() => {
            setCartToggle(!cartToggle);
            setChosenProduct("");
          }}
        >
          {cartToggle ? <span>&lt; BACK TO STORE</span> : "CART"}
        </p>
      </section>
      <BackToShopContext.Provider value={{ backToShop, setbackToShop }}>
        {renderView()}
      </BackToShopContext.Provider>
    </div>
  );
}

export default CollectionDisplay;
