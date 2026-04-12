import {useImages} from '../context/imageContext.jsx'

export default function ImageDropZone() {
    const { images, setImages } = useImages();

    function handleFileSelect(event) {
        const files = event.target.files
        const 
    }
  return (
    <section>
        <form action="">
            <input type="file" id="imagesList" name="imagesList" accept="image/png, image/jpeg, image/webp, image/gif, image/bmp, image/svg+xml" multiple />
        </form>
    </section>
  )
}
