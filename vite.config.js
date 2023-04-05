import { defineConfig } from "vite";
import viteSvgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const options = {
  workbox: { globPatterns: ["**/*"] },
  includeAssets: ["**/*"],
  manifest: {
    theme_color: "#f69436",
    background_color: "#f69434",
    display: "standalone",
    scope: "/Connect-Four/",
    start_url: "/Connect-Four/",
    short_name: "Connect Four",
    description: "Connect Four Game",
    name: "Connect Four",
    icons: [
      {
        src: "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "/Connect-Four/",
  plugins: [react(), viteSvgr(), VitePWA(options)],
});
