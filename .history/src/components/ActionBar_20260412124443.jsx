import { useImages } from '../context/imageContext.jsx'

export default function ActionBar() {
    const { setImages } = useImages();
  return (
    <div>
        <button onClick={() => handleRemoveAll()}>Delete all</button>
    </div>
  )
}
