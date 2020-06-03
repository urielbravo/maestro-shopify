import React from "react";
import "./App.css";
import Authentication from "./components/Authentication";
// import Connected from "./components/Connected";
import ProductSettingsPanel from "./components/ProductSettingsPanel";
import ProductDisplay from "./components/ProductDisplay";
import SettingsPanel from "./components/SettingsPanel";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SettingsPanel />
        <div className="right-side">
          <ProductSettingsPanel />
          <ProductDisplay />
        </div>
      </div>
    );
  }
}

export default App;
