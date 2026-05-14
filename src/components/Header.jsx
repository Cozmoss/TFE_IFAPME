import React from 'react'
import { Wifi } from 'lucide-react'

export default function Header() {
  return (
		<header className="bg-(--surface) border-b border-(--border)">
			<nav className="flex justify-between items-center py-4 max-w-6xl mx-auto px-4">
				<div className="text-(--primary)">PixMerge</div>
				<div className="flex items-center gap-2 text-sm text-(--muted-foreground)">
					<Wifi className="h-5 w-5" /> 100% hors-ligne
				</div>
			</nav>
		</header>
  );
}

