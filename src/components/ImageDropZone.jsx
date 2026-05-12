import {useImages} from '../context/imageContext.jsx'
import { nanoid } from 'nanoid'
import { useState, useRef } from 'react';
import CameraModal from './CameraModal.jsx';
import imageCompression from 'browser-image-compression';

export default function ImageDropZone() {
    const { setImages } = useImages();
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const inputRef = useRef(null);

    const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};

    async function processFiles (files) {
        const newImages = await Promise.all(
            Array.from(files).map(async (file) => {
                const compressedFile = await imageCompression(file, options);
                return {
                    id: nanoid(),
                    file: file, // Store the original file object
                    compressed: compressedFile, // Store the compressed file object
                    preview: URL.createObjectURL(compressedFile), // Create a preview URL for the image
                };
            })
        );
        setImages((prevImages) => [...prevImages, ...newImages]);
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
    <section onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="border-2 border-dashed border-gray-400 p-4 text-center">
        <button onClick={() => inputRef.current.click()} className="cursor-pointer">Parcourir</button>
        <input ref={inputRef} type="file" id="imagesList" name="imagesList" accept='image/png, image/jpeg, image/webp' multiple style={{display: 'none' }} onChange={handleFileSelect} />
        <button onClick={() => setIsCameraOpen(true)} className="cursor-pointer">Capturer</button>
        {isCameraOpen && <CameraModal isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} />}
    </section>
  )
}
