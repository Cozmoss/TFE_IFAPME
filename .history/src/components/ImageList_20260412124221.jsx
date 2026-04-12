import { useImages } from '../context/imageContext.jsx'

export default function ImageList() {
  const { images, setImages } = useImages();

 function formatFileSize(bytes) {
    if (bytes >= 1048576) {
        return (bytes / 1048576).toFixed(1) + ' MB';
    }
    return (bytes / 1024).toFixed(1) + ' KB';
 }

 function handleRemoveImage(id) {
    setImages(prevImages)
 }

  return (
    <div>
        <ul>
            {images.length === 0 ? <li>No images available</li> : images.map(image => (
                <li key={image.id}>
                    <img src={image.preview} alt={image.file.name} width="100" height="100" />
                    <p>{image.file.name}</p>
                    <p>{formatFileSize(image.file.size)}</p>
                    <button onClick={() => handleRemoveImage(image.id)}>Remove</button>
                </li>
            ))}
        </ul>
    </div>
  )
}
