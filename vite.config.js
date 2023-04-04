import { defineConfig } from "vite";
import viteSvgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSvgr()],
});
