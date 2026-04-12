import { useImages } from '../context/imageContext.jsx'

export default function ImageList() {
  const { images } = useImages();

  console.log


  return (
    <div>
        <ul>
            {images.length > 0 ?}
        </ul>
    </div>
  )
}
