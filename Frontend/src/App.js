import { useReducer, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  DynamicContextProvider,
  DynamicWidget,
  DynamicConnectButton,
  DynamicEmbeddedWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api";

import QuestionLayout from "./Pages/QuestionLayout";
import Home from "./Pages/Home";
import Header from "./components/Header";

import AppReducer, { initialState } from "./reducer";

import "./index.css";

const WEB3_VIEW = [
  {
    type: SdkViewType.Login,
    sections: [{ type: SdkViewSectionType.Wallet }],
  },
];

const App = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const CompomentWithState = (Component) => (props) =>
    <Component {...props} {...(state || {})} dispatch={dispatch} />;

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "2c3b39a3-01c2-4e41-ad2e-abac421599be",
        walletConnectors: [EthereumWalletConnectors],
        overrides: { views: WEB3_VIEW },
      }}
    >
      <div className="app">
        <Home {...(state || {})} dispatch={dispatch} />
      </div>
    </DynamicContextProvider>
  );
};

export default App;
