import type { Preview } from "@storybook/react-vite";

import "@verobee/design/css/full.css";
import "@verobee/design/patterns/girok-app.css";
import "../stories/girok/girok-app.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "girok-dark",
      values: [
        { name: "girok-dark", value: "#0d0c0a" },
      ],
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = "girok";
        document.documentElement.dataset.mode = "dark";
      }

      return <Story />;
    },
  ],
};

export default preview;
