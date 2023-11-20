/// <reference types="vitest" />

import { defineConfig } from "vite"
import { resolve } from "path"

import Vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [Vue()],
    build: {
        target: "esnext",
        minify: false,
        sourcemap: true,
        rollupOptions: {
            external: ["fs", "path"],
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
        include: ["test/**/*.spec.ts"],
    },
})
