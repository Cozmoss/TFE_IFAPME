import { useImages } from '../context/imageContext.jsx'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import SortableImageItem from './SortableImageItem.jsx'
import { useState } from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';

export default function ImageList() {
  const { images, setImages } = useImages();
  const [viewMode, setViewMode] = useState('list')

 function handleRemoveImage(id) {
    setImages(prevImages => prevImages.filter(image => image.id !== id))
 }

 function handleDragEnd(event) {
    const {active, over} = event

    if (active.id !== over.id) {
        setImages((prevImages) => {
            const oldIndex = prevImages.findIndex(img => img.id === active.id)
            const newIndex = prevImages.findIndex(img => img.id === over.id)
            return arrayMove(prevImages, oldIndex, newIndex)
        })
    }
 }

//  if (images.length === 0) return null

  return (
		<div className="mt-4">
			<div className="flex items-center justify-between mb-3">
				<p className="text-base text-(--muted-foreground)">
					{images.length} image{images.length > 1 ? "s" : ""}
				</p>
				<div className="flex gap-1 bg-(--surface) border border-(--border) rounded-lg p-0.5">
					<button
						onClick={() => setViewMode("list")}
						className={`p-1.5 cursor-pointer rounded hover:text-(--foreground) ${viewMode === "list" ? "bg-(--secondary) text-(--primary) hover:text-(--primary)/80" : "text-(--muted-foreground)"}`}>
						<LayoutList className="h-4 w-4" />
					</button>
					<button
						onClick={() => setViewMode("grid")}
						className={`p-1.5 cursor-pointer rounded hover:text-(--foreground) ${viewMode === "grid" ? "bg-(--secondary) text-(--primary) hover:text-(--primary)/80" : "text-(--muted-foreground)"}`}>
						<LayoutGrid className="h-4 w-4" />
					</button>
				</div>
			</div>
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}>
				<SortableContext items={images.map((image) => image.id)}>
					<ul
						className={
							viewMode === "grid"
								? "grid grid-cols-2 sm:grid-cols-3 gap-3"
								: "flex flex-col gap-3"
						}>
						{images.map((image, index) => (
							<SortableImageItem
								key={image.id}
								image={image}
								index={index + 1}
								onRemove={() => handleRemoveImage(image.id)}
								viewMode={viewMode}
							/>
						))}
					</ul>
				</SortableContext>
			</DndContext>
		</div>
  );
}
