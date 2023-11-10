import { defineConfig } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            entryRoot: "src",
            exclude: ["test"]
        })
    ],
    build: {
        target: "esnext",
        minify: false,
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
            "~": resolve(__dirname, "test/")
        }
    },
    test: {
        globals: true,
        environment: "node",
        include: ["test/**/*.spec.ts"],
    },
})
