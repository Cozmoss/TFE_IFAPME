import { useImages } from '../context/imageContext.jsx'

export default function ImageList() {
  const { images } = useImages();

  console.log('images in ImageList:', images);


  return (
    <div>
        <ul>
            {images.length > 0 ?}
        </ul>
    </div>
  )
}
