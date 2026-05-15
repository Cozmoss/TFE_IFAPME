import React from "react";
import { Wifi } from "lucide-react";
import { useI18n } from "../i18n/i18nContext";

const LOCALES = ["fr", "en", "nl"];

export default function Header() {
	const { t, language, setLanguage } = useI18n();
	return (
		<header className="bg-(--surface) border-b border-(--border)">
			<nav className="flex justify-between items-center py-4 max-w-6xl w-full mx-auto px-4">
				<div className="text-(--primary) font-semibold">PixMerge</div>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2 text-sm text-(--muted-foreground)">
						<Wifi className="h-4 w-4" /> {t("header.slogan")}
					</div>
					<div className="flex items-center gap-1 border border-(--border) rounded-lg p-0.5">
						{LOCALES.map((locale) => (
							<button
								key={locale}
								onClick={() => setLanguage(locale)}
								className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${language === locale ? "bg-(--secondary) text-(--primary)" : "text-(--muted-foreground) hover:text-(--foreground)"}`}>
								{locale.toUpperCase()}
							</button>
						))}
					</div>
				</div>
			</nav>
		</header>
	);
}
