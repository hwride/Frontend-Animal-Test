import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/vitest.setup.ts"],
    reporters: ["default", ["junit", { outputFile: "test-results/junit.xml" }]],
  },
});
