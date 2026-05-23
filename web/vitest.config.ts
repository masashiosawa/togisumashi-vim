import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    server: {
      deps: {
        // CodeMirror packages are ESM-only and transform slowly; load as-is
        external: [/@codemirror\//, /@replit\/codemirror-vim/, /@uiw\/react-codemirror/],
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
  },
});
