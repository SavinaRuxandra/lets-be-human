
import WalletConnectProvider from "@walletconnect/web3-provider";

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080',
};

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "INFURA_ID"
    }
  }
};

export const WEB3_MODAL_OPTIONS = {
  network: "8545",
  cacheProvider: true,
  providerOptions,
  theme: {
    background: "rgb(103, 77, 150)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)"
  }
}

