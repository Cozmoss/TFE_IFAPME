import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatFileSize } from "../utils/formatFileSize.js";
import { GripVertical, Trash2 } from "lucide-react";

export default function SortableImageItem({
	image,
	onRemove,
	viewMode,
	index,
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: image.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	if (viewMode === "grid") {
		return (
			<li
				ref={setNodeRef}
				style={style}
				{...attributes}
				className="group relative bg-(--card) border border-(--border) rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
				<div className="aspect-square w-full overflow-hidden bg-(--muted)">
					<img
						src={image.preview}
						alt={image.file.name}
						className="h-full w-full object-cover"
					/>
				</div>

				<span className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-(--foreground)/80 text-xs font-semibold text-(--background)">
					{index}
				</span>

				<div
					{...listeners}
					style={{ cursor: "grab", touchAction: "none" }}
					className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded bg-(--foreground)/60 text-(--background) backdrop-blur-sm transition-colors hover:bg-(--primary)">
					<GripVertical className="w-4 h-4" />
				</div>

				<div className="flex items-center gap-2 border-t border-(--border) p-2.5">
					<div className="min-w-0 flex-1">
						<p className="truncate text-xs font-medium text-(--foreground)">
							{image.file.name}
						</p>
						<p className="mt-0.5 text-[11px] text-(--muted-foreground)">
							{formatFileSize(image.file.size)}
						</p>
					</div>
					<button
						onClick={onRemove}
						className="shrink-0 rounded p-1.5 text-(--muted-foreground) transition-colors hover:bg-(--destructive)/10 hover:text-(--destructive) cursor-pointer">
						<Trash2 className="w-4 h-4" />
					</button>
				</div>
			</li>
		);
	}

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			className="flex items-center gap-2 p-2 bg-(--card) border border-(--border) rounded-lg hover:shadow-sm transition-shadow">
			<div className="bg-(--muted) text-(--muted-foreground) p-1 rounded-lg hover:bg-(--primary)/10 hover:text-(--primary) transition-colors">
				<GripVertical
					{...listeners}
					style={{ cursor: "grab", touchAction: "none" }}
					className="w-4 h-4"
				/>
			</div>

			<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--foreground)/80 text-xs font-semibold text-(--background)">
				{index}
			</span>

			<img
				src={image.preview}
				alt={image.file.name}
				className="w-14 h-14 rounded-lg object-cover shrink-0"
			/>

			<div className="flex flex-col min-w-0 flex-1">
				<p className="truncate text-sm font-medium text-(--foreground)">
					{image.file.name}
				</p>
				<p className="text-xs text-(--muted-foreground)">
					{formatFileSize(image.file.size)}
				</p>
			</div>

			<button
				onClick={onRemove}
				className="shrink-0 rounded p-1.5 text-(--muted-foreground) hover:bg-(--destructive)/10 hover:text-(--destructive) cursor-pointer transition-colors ml-auto">
				<Trash2 className="w-4 h-4" />
			</button>
		</li>
	);
}
