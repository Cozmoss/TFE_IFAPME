import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: Image.id})


export default function SortableImageItem() {
  return (
    <div>SortableImageItem</div>
  )
}
