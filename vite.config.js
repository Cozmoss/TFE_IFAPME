import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	base: "/TFE_IFAPME/",
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "PixMerge",
				short_name: "PixMerge",
				description:
					"Merge your images into a single PDF file with ease.",
				theme_color: "#3b82f6",
				background_color: "#ffffff",
				display: "standalone",
				icons: [
					{
						src: "icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
						media: "(prefers-color-scheme: light)",
					},
					{
						src: "icons/icon-192x192-dark.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
						media: "(prefers-color-scheme: dark)",
					},
					{
						src: "icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
						media: "(prefers-color-scheme: light)",
					},
					{
						src: "icons/icon-512x512-dark.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
						media: "(prefers-color-scheme: dark)",
					},
				],
			},
		}),
	],
});
