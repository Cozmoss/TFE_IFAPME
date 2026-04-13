import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { formatFileSize } from '../utils/formatFileSize.js'
import { Dn }

export default function SortableImageItem({image, onRemove}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: image.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

  return (
		<li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="flex items-center gap-2">
                <div>
                    <img
                        src={image.preview}
                        alt={image.file.name}
                        width="100"
                        height="100"
                    />
                    <p>{image.file.name}</p>
                    <p>{formatFileSize(image.file.size)}</p>
                </div>
			    <button onClick={onRemove}>Remove</button>
            </div>
		</li>
  );
}
