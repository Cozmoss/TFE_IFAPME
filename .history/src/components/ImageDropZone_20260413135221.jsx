import {useImages} from '../context/imageContext.jsx'
import { nanoid } from 'nanoid'

export default function ImageDropZone() {
    const { setImages } = useImages();

    function processFiles (files) {
        const newImages = Array.from(files).map((file) => ({
			id: nanoid(), // Generate a unique ID for each image
			file: file, // Store the original file object
			preview: URL.createObjectURL(file), // Create a preview URL for the image
		}));
        setImages((prevImages) => [...prevImages, ...newImages]);
    }

    function onDragOver(event) {
        event.preventDefault();
    }

    function onDrop (event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        processFiles(files);
    }
 
    function handleFileSelect(event) {
        const files = event.target.files
        processFiles(files);
    }
  return (
    <section onDragOver={onDragOver} onDrop={onDrop} onDragOver={(e) => e.preventDefault()} className="border-2 border-dashed border-gray-400 p-4 text-center">
        <input type="file" id="imagesList" name="imagesList" accept="image/png, image/jpeg, image/webp" multiple onChange={handleFileSelect} />
    </section>
  )
}
