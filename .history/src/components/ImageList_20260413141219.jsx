import { useImages } from '../context/imageContext.jsx'
import 

export default function ImageList() {
  const { images, setImages } = useImages();

 

 function handleRemoveImage(id) {
    setImages(prevImages => prevImages.filter(image => image.id !== id))
 }

  return (
    <div>
        <ul>
            {images.length === 0 ? <li>No images available</li> : images.map(image => (
                
            ))}
        </ul>
    </div>
  )
}
