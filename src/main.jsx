import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ImageProvider from "./context/imageContext.jsx";
import I18nProvider from "./i18n/i18nContext.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<I18nProvider>
			<ImageProvider>
				<App />
				<Toaster theme="system" position="bottom-right" />
			</ImageProvider>
		</I18nProvider>
	</StrictMode>,
);
