import { useImages } from '../context/imageContext.jsx'

export default function ImageList() {
  const { images } = useImages();

 function 

  return (
    <div>
        <ul>
            {images.length === 0 ? <li>No images available</li> : images.map(image => (
                <li key={image.id}>
                    <img src={image.preview} alt={image.file.name} width="100" height="100" />
                    <p>{image.file.name}</p>
                    <p>{(image.file.size / 1024 / 1024).toFixed(1)} MB</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
