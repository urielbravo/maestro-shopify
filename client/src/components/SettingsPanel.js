import React from "react";
import Authentication from "./Authentication";
import OverlayConfig from "./OverlayConfig";

function SettingsPanel(props) {
  return (
    <div className="settings-panel">
      {props.storefrontContext.access_token ? (
        <OverlayConfig
          connectedShop={props.storefrontContext.shop}
          overlayProducts={props.overlayProducts}
        />
      ) : (
        <Authentication />
      )}
    </div>
  );
}

export default SettingsPanel;
