import React from "react";
import "../styles/ProductSettingsPanel.css";

class ProductSettingsPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      productID: "",
      selectedOption: "products",
      collectionID: ""
    };

    this.handleProductChange = this.handleProductChange.bind(this);
    this.trasferId = this.trasferId.bind(this);
  }

  handleProductChange(e) {
    this.setState({ productID: e.target.value });
  }

  trasferId() {
    this.props.onOptionSelect(this.state.productID)
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };


  render() {
    let collections = this.props.collections.map((collection) => {
      return (
        <option key={collection.node.id} value={collection.node.id}>
          {collection.node.title}
        </option>
      );
    });

    let products = this.props.products.map((product) => {
      return (
        <option key={product.node.id} value={product.node.id}>
          {product.node.title}
        </option>
      );
    });

    let product = this.props.products.find((obj) => {
      return obj.node.id === this.state.productID;
    });

    // this renders the collection view or the products view 
    let renderOption = () => {
      if (this.state.selectedOption === "products") {
        return (
          <div>
            <div className="select-product">
            <label htmlFor="select-product">SELECT PRODUCT</label>
            <select
              onChange={this.handleProductChange}
              name="select-product"
              id="select-product"
            >
              {products}
            </select>
          </div>
          <div className="product-preview">
            <div className="product-image">
              <img
                id="panel-image"
                src={
                  product
                    ? product.node.images.edges[0].node.originalSrc
                    : "https://cdn.shopify.com/s/files/1/0397/5567/7862/products/putting-on-your-shoes_925x_f71c19ac-c091-4c7f-bbfe-a43d6a0456b7.jpg?v=1590783853"
                }
                alt={
                  product
                    ? product.node.images.edges[0].node.altText
                    : "Man doing up his LED high top running shoes"
                }
              />
            </div>
            <div className="product-description">
              <p>
                {product
                  ? product.node.title
                  : "Nasty Gal Limited Edition T-Shirt 2020"}
              </p>
              <p>
                {product ? product.node.variants.edges[0].node.price : "$19.99"}
              </p>
            </div>
          </div>
          </div>
        )
      } else if (this.state.selectedOption === "collections") {
        return (
          <div className="select-product">
            <label htmlFor="select-collection">SELECT COLLECTION</label>
            <select
              onChange={this.handleChange}
              name="select-collection"
              id="select-product"
            >
              {collections}
            </select>
          </div>
        )
      }
    }

    return (
      <div className="product-settings">
        <section className="save">
          <span>&lt;</span>
          <button id="save-button" onClick={this.trasferId}>save</button>
        </section>
        {console.log(product)}
        <section className="select-icon">
          <div className="icon-select-container">
            <label htmlFor="icon">Icon</label>
            <select name="icon" id="icon">
              <option value="icon-1">Icon 1</option>
              <option value="icon-2">Icon 2</option>
              <option value="icon-3">Icon 3</option>
              <option value="icon-4">Icon 4</option>
              <option value="icon-5">Icon 5</option>
            </select>
          </div>
          <div className="icon-name-container">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
        </section>

        <section className="product-section">
          <div className="connected-store">
            <label htmlFor="store">CONNECTED STORE</label>
            <input
              type="text"
              name="store"
              id="store"
              defaultValue={this.props.shopName}
            />
          </div>
          <div className="featured-item">
            <label htmlFor="feature-item">
              FEATURED ITEM
              <input
                type="radio"
                name="shop-items"
                id="radio-product"
                value="products"
                checked={this.state.selectedOption === "products"}
                onChange={this.handleOptionChange}
              />
              <input
                type="radio"
                name="shop-items"
                id="radio-collection"
                value="collections"
                checked={this.state.selectedOption === "collections"}
                onChange={this.handleOptionChange}
              />
            </label>
          </div>
          {renderOption()}
        </section>
      </div>
    );
  }
}

export default ProductSettingsPanel;
