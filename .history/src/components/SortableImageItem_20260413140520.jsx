import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: image.id})


export default function SortableImageItem() {

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

  return (
    <div>SortableImageItem</div>
  )
}
