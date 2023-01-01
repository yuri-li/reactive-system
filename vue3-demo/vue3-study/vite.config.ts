/// <reference types="vitest" />
// noinspection SpellCheckingInspection

import { defineConfig, splitVendorChunkPlugin } from "vite"
import Vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import DefineOptions from "unplugin-vue-define-options/vite"
import ElementPlus from "unplugin-element-plus/vite"
import Icons from "unplugin-icons/vite"

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [ElementPlus(), Vue(), DefineOptions(),
        Icons({
            autoInstall: true,
        }),
        splitVendorChunkPlugin(),], css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@import '@/assets/css/variable.scss';@import '@/assets/css/main.scss';"
            }
        }
    }, build: {
        target: "esnext", // minify: false,
        // sourcemap: true,
    }, resolve: {
        alias: {
            "@": resolve(__dirname, "src/"), "~": resolve(__dirname, "test/")
        }
    }, test: {
        globals: true, environment: "jsdom", coverage: {
            reporter: ["text", "json", "html"],
        }, include: ["test/**/*.spec.ts"],
    },
})