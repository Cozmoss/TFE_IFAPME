export default function ConfirmDialog({
	isOpen,
	title,
	description,
	onConfirm,
	onCancel,
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--background)/50">
			<div className="w-full max-w-sm rounded-lg border border-(--border) bg-(--card) shadow-lg">
				<div className="p-5">
					<h3 className="text-base font-semibold text-(--foreground)">
						{title}
					</h3>
					<p className="mt-1 text-sm text-(--muted-foreground)">
						{description}
					</p>
				</div>
				<div className="flex justify-end gap-2 border-t border-(--border) p-4">
					<button
						onClick={onCancel}
						className="px-4 py-2 rounded-md text-sm font-medium bg-(--secondary) text-(--foreground) hover:bg-(--muted) transition-colors cursor-pointer">
						Annuler
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 rounded-md text-sm font-medium bg-(--destructive) text-white hover:bg-(--destructive)/90 transition-colors cursor-pointer">
						Supprimer
					</button>
				</div>
			</div>
		</div>
	);
}
