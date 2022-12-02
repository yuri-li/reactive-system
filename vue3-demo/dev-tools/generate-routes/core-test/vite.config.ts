/// <reference types="vitest" />
// noinspection SpellCheckingInspection

import { defineConfig,splitVendorChunkPlugin } from "vite"
import Vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import VueMacros from "unplugin-vue-macros/vite"

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [
        VueMacros({
            plugins: {
                vue: Vue({
                    reactivityTransform: true
                }),
            },
        }),
        splitVendorChunkPlugin(),
    ],
    build: {
        target: "esnext",
        // minify: false,
        // sourcemap: true,
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