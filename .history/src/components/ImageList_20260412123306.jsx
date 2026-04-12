import { useImages } from '../context/imageContext.jsx'

export default function ImageList() {
  const { images } = useImages();



  return (
    <div>
        <ul>
            {images.length == 0 ? <li>No images available</li> : images.map(image => (
                <li key={image.id}>
                    <img src={image.preview} alt={image.}
                </li>
            ))}
        </ul>
    </div>
  )
}
