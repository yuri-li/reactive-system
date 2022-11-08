/// <reference types="vitest" />
// noinspection SpellCheckingInspection

import {defineConfig} from "vite"
import Vue from "@vitejs/plugin-vue"
import {resolve} from "path"

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [Vue()],
    build: {
        target: "esnext",
        minify: false,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        return "vendor"
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
            "~": resolve(__dirname, "test/")
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            reporter: ["text", "json", "html"],
        },
        include: ["test/**/*.spec.ts"],
    },
})