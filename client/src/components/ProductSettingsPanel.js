import React from "react";
import "../styles/ProductSettingsPanel.css";

class ProductSettingsPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      productID: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ productID: e.target.value })
  }


  render() {
    console.log(this.props.products);
    let products = this.props.products.map((product) => {
      return <option key={product.node.id} value={product.node.id}>{product.node.title}</option>;
    });

    let product = this.props.products.find(obj => {
      return obj.node.id === this.state.productID
    })

    return (
      <div className="product-settings">
        <section className="save">
          <span>&lt;</span>
          <p>save</p>
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
              value="https//mestro-store.myshopify.com"
            />
          </div>
          <div className="featured-item">
            <label htmlFor="feature-item">
              FEATURED ITEM
              <input
                type="radio"
                name="featured-product"
                id="featured-product"
              />
              <input
                type="radio"
                name="featured-collection"
                id="featured-collection"
              />
            </label>
          </div>
          <div className="select-product">
            <label htmlFor="select-product">SELECT PRODUCT</label>
            <select onChange={this.handleChange} name="select-product" id="select-product">
              {products}
            </select>
            <div>Selected value is : {this.state.productID}</div>
          </div>
          <div className="product-preview">
            <div className="product-image">
              <img
                id="panel-image"
                src="https://cdn.shopify.com/s/files/1/0397/5567/7862/products/putting-on-your-shoes_925x_f71c19ac-c091-4c7f-bbfe-a43d6a0456b7.jpg?v=1590783853"
                alt="Man doing up his LED high top running shoes"
              />
            </div>
            <div className="product-description">
              <p>Nasty Gal Limited Edition T-Shirt 2020</p>
              <p>$19.99</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ProductSettingsPanel;
