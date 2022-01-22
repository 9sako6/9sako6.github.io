import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import * as nextImage from "next/image";
import nextConfig from "../next.config";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => <img {...props} />,
});

for (const envKey in nextConfig.env) {
  process.env[envKey] = nextConfig.env[envKey];
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
