import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { formatFileSize } from '../utils/formatFileSize.js'
import { GripVertical, Trash2 } from 'lucide-react';


export default function SortableImageItem({image, onRemove, viewMode, index}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: image.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

  return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			className={`bg-(--card) border border-(--border) rounded-lg ${viewMode === "list" ? "flex items-center gap-2 p-2 rounded-lg border border-(--border) bg-(--surface) transition-shadow hover:shadow-sm" : "relative overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-sm"}`}>
			<div className="flex flex-row items-center gap-2 w-full">
				<div className="bg-(--secondary) p-1 rounded-lg">
					<GripVertical
						{...listeners}
						style={{ cursor: "grab" }}
						className="w-4 h-4 text-(--muted-foreground)"
					/>
				</div>
				<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--foreground)/80 text-sm font-semibold text-(--background)">
					{index}
				</div>
				<img
					src={image.preview}
					alt={image.file.name}
					className="w-12 h-12 rounded-lg object-cover"
				/>
				<div className="flex flex-col text-sm text-(--foreground)">
					<p className="truncate text-base font-medium">
						{image.file.name}
					</p>
					<p className="text-(--muted-foreground) text-sm">
						{formatFileSize(image.file.size)}
					</p>
				</div>

				<button
					onClick={onRemove}
					className="shrink-0 rounded p-1.5 text-(--muted-foreground) transition-colors hover:bg-(--destructive)/10 hover:text-(--destructive) cursor-pointer ml-auto">
					<Trash2 className="w-4 h-4" />
				</button>
			</div>
		</li>
  );
}
