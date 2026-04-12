import {useImages} from '../context/imageContext.jsx'

export default function ImageDropZone() {
    const { images, setImages } = useImages();

    function handleFileSelect(event) {
        const files = event.target.files
        const newImages = Array.from(files).map(file => ({
            id: nanoid(), // Generate a unique ID for each image
            file: file, // Store the original file object
            preview: URL.createObjectURL(file) // Create a preview URL for the image
        }))
        setImages(prevImages => [...prevImages, ...newImages])
    }
  return (
    <section>
        <input type="file" id="imagesList" name="imagesList" accept="image/png, image/jpeg, image/webp, image/bmp, image/svg+xml" multiple onChange={handleFileSelect} />
    </section>
  )
}
