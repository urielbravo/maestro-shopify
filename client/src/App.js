import React from "react";
import "./App.css";
import Authentication from "./components/Authentication";
import ProductSettingsPanel from "./components/ProductSettingsPanel";
import ProductDisplay from "./components/ProductDisplay";
import SettingsPanel from "./components/SettingsPanel";

function App() {
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

export default App;
