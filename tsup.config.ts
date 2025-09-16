import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    minify: true,
    treeshake: true,
    sourcemap: false,
    target: "node18",
    platform: "node",
    // Force one-file outputs (no code splitting -> one index per format)
    splitting: false,
    // Don’t inline node deps
    external: ["express", "axios"],
    esbuildOptions(options) {
        // Keep internals anonymous/short
        options.keepNames = false;
        options.legalComments = "none";
    },
});
