import React from "react";
import "./App.css";
// import Authentication from "./components/Authentication";
// import Connected from "./components/Connected";
import ProductSettingsPanel from "./components/ProductSettingsPanel";
import CollectionDisplay from "./components/CollectionDisplay";
import ProductDisplay from "./components/ProductDisplay";
import SettingsPanel from "./components/SettingsPanel";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StorefrontContext } from "./components/StorefrontContext";
import axios from "axios";
import { CartProductsProvider } from "./components/CartProductsContext";

const SHOP = "maestro-store-1";

class App extends React.Component {
  static contextType = StorefrontContext;

  constructor() {
    super();

    this.state = {
      products: [],
      productID: "",
      shop: [],
      collections: [],
      collectionID: "",
      featureSelection: "products",
    };

    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.onCollectionSelect = this.onCollectionSelect.bind(this);
    this.onFeatureSelection = this.onFeatureSelection.bind(this);
  }

  componentDidMount() {
    let storefrontContext = this.context;
    axios
      .post(
        `https://${SHOP}.myshopify.com/api/graphql`,
        {
          query: `{
            shop {
              name
            }
      products(first: 100) {
        edges {
          node {
            id
            title
            description
            variants(first: 3){
              edges {
                node{
                  price
                  id
                }
              }
            }
            images(first: 1) {
              edges{
                node{
                  id
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
      collections(first: 100) {
        edges {
          node {
                  id
                  title
                  description
                  products (first: 100){
                    edges{
                      node{
                        id
                        title
                        description
                        variants(first: 3){
                          edges {
                            node{
                              price
                              id
                            }
                          }
                        }
                        images(first: 1) {
                          edges{
                            node{
                              id
                              originalSrc
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
    }`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontContext.access_token,
          },
        }
      )
      .then((res) => {
        this.setState({
          products: res.data.data.products.edges,
          shop: res.data.data.shop.name,
          collections: res.data.data.collections.edges,
        });
      });
  }

  onOptionSelect(selectedOption) {
    this.setState({ productID: selectedOption });
  }

  onCollectionSelect(collection) {
    this.setState({ collectionID: collection });
  }

  onFeatureSelection(feature) {
    this.setState({ featureSelection: feature });
  }

  // this functions dictates which most righside panel renders, if the product display or the collectionsdisplay
  renderDisplay = () => {
    if (this.state.featureSelection === "products") {
      return (
        <ProductDisplay
          products={this.state.products}
          productID={this.state.productID}
        />
      );
    } else if (this.state.featureSelection === "collections") {
      return (
        <CollectionDisplay
          collections={this.state.collections}
          collectionID={this.state.collectionID}
        />
      );
    }
  };

  render() {
    return (
      <CartProductsProvider>
        <div className="App">
          <SettingsPanel />
          <div className="right-side">
            <ProductSettingsPanel
              products={this.state.products}
              onOptionSelect={this.onOptionSelect}
              shopName={this.state.shop}
              collections={this.state.collections}
              onCollectionSelect={this.onCollectionSelect}
              onFeatureSelection={this.onFeatureSelection}
            />
            {this.renderDisplay()}
          </div>
        </div>
      </CartProductsProvider>
    );
  }
}

export default App;
