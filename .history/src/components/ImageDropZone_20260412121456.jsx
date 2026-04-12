import {useImages} from '../context/imageContext.jsx'

export default function ImageDropZone() {
    const { images, setImages } = useImages();

    function handleFileSelect(event) {
        const files = event.target.files
        const newImages = Array.from(files).map(file => ({
            id: nanoid(), // Generate a unique ID for each image
            file: file,
            preview: URL.createObjectURL(file) // Create a preview URL for the image
        }))
    }
  return (
    <section>
        <form action="">
            <input type="file" id="imagesList" name="imagesList" accept="image/png, image/jpeg, image/webp, image/gif, image/bmp, image/svg+xml" multiple />
        </form>
    </section>
  )
}
