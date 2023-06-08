import { defineConfig } from "vite";

export default defineConfig({
	root: "./src",
	publicDir: "./assets",
	server: {
		host: "0.0.0.0"
	},
	build: {
		outDir: "../dist",
		emptyOutDir: true
	}
});
