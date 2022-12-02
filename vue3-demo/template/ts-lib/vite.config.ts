/// <reference types="vitest" />

import { defineConfig, splitVendorChunkPlugin } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins:[
        dts(),
        splitVendorChunkPlugin(),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            external: ["fs", "path"],
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
            "~": resolve(__dirname, "test/"),
        }
    },
    test: {
        globals: true,
        environment: "node",
        coverage: {
            reporter: ["text", "json", "html"],
        },
        include: ["test/**/*.spec.ts"],
    },
})