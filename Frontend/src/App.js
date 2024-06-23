import "./App.css";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import Main from "./Main";

function App() {
  return (
    <div className="App">
      <DynamicContextProvider
        settings={{
          environmentId: "6c64041b-ee5d-4b24-b075-6616b429ec68",
          walletConnectorExtensions: [EthersExtension],
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <Main />
      </DynamicContextProvider>
    </div>
  );
}

export default App;
