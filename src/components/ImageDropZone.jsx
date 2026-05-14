import {useImages} from '../context/imageContext.jsx'
import { nanoid } from 'nanoid'
import { useState, useRef } from 'react';
import CameraModal from './CameraModal.jsx';
import imageCompression from 'browser-image-compression';
import { COMPRESSION_OPTIONS } from '../utils/compressionOptions.js';
import {Upload, Camera, ImagePlus  } from 'lucide-react';
import Button from './ui/button.jsx';

export default function ImageDropZone() {
    const { setImages } = useImages();
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    async function processFiles (files) {
        const newImages = await Promise.all(
            Array.from(files).map(async (file) => {
                const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
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
		<section
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				setIsDragging(false);
				onDrop(e);
			}}
			onDragEnter={() => setIsDragging(true)}
			onDragLeave={() => setIsDragging(false)}
			className={`flex flex-col items-center bg-(--card) border-2 border-dashed px-6 py-8 text-center rounded-xl ${isDragging ? "border-(--primary) bg-(--secondary)" : "border-(--border)"} transition-colors hover:border-(--primary)/40 hover:bg-(--primary)/3`}>
			<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--primary)/10">
				<ImagePlus className="h-7 w-7 text-(--primary)" />
			</div>
			<p className="text-base text-(--muted-foreground)">
				Glissez et déposez vos images ici
			</p>
			<div className="flex gap-2 mt-4">
				<Button
					onClick={() => inputRef.current.click()}
					variant="outline">
                    <Upload className="h-4 w-4" /> Parcourir
                </Button>
				<input
					ref={inputRef}
					type="file"
					id="imagesList"
					name="imagesList"
					accept="image/png, image/jpeg, image/webp"
					multiple
					style={{ display: "none" }}
					onChange={handleFileSelect}
				/>
				<Button
					onClick={() => setIsCameraOpen(true)}
                    variant='outline'>
                    <Camera className="h-4 w-4" /> Capturer
                </Button>
				{isCameraOpen && (
					<CameraModal
						isOpen={isCameraOpen}
						onClose={() => setIsCameraOpen(false)}
					/>
				)}
			</div>
		</section>
  );
}
