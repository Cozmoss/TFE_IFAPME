import { useImages } from '../context/imageContext.jsx'

export default function ImageList() {
  const { images } = useImages();


  return (
    <div>
        <ul></ul>
    </div>
  )
}
