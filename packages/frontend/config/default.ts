import { ConfigSettings } from ".";

const config: Omit<ConfigSettings, "env"> = {
  features: {
    devMode: false,
  },
  apiBaseUrl: "https://api.bondefi.xyz",
};

export default config;
