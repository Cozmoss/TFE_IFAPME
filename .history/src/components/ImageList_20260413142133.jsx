import { useImages } from '../context/imageContext.jsx'
import {formatFileSize} from '../utils/formatFileSize.js'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import SortableImageItem from './SortableImageItem.jsx'

export default function ImageList() {
  const { images, setImages } = useImages();

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

  return (
    <div>
        <ul>
            <DndContext collisionDetection={closestCenter} onDrag>
        </ul>
    </div>
  )
}
