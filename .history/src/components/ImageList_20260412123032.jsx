import { useImages } from '../context/imageContext.jsx'

export default function ImageList() {
  const { images } = useImages();

  console


  return (
    <div>
        <ul>
            {images.length > 0 ?}
        </ul>
    </div>
  )
}
