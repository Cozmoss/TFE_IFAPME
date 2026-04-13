import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: image.id})


export default function SortableImageItem() {

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

  return (
		<li ref={image.id}>
			<img
				src={image.preview}
				alt={image.file.name}
				width="100"
				height="100"
			/>
			<p>{image.file.name}</p>
			<p>{formatFileSize(image.file.size)}</p>
			<button onClick={() => handleRemoveImage(image.id)}>Remove</button>
		</li>
  );
}
