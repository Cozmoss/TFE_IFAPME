import { useEffect } from 'react'
import { useCamera } from '../hooks/useCamera.js'
import { useImages } from '../context/imageContext.jsx'
import { nanoid } from 'nanoid'
import imageCompression from 'browser-image-compression';
import { COMPRESSION_OPTIONS } from '../utils/compressionOptions.js';
import Button from './ui/button.jsx';
import { Camera, CircleX } from "lucide-react";


export default function CameraModal({isOpen, onClose}) {
    const { videoRef, startCamera, stopCamera, capturePhoto } = useCamera()
    const { setImages } = useImages()

    useEffect(() => {
        if (isOpen) {
            startCamera() 
        } else {
            stopCamera()
        }
    }, [isOpen])

    async function handleCapture() {
        const file = await capturePhoto()
        const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
        setImages(prevImages => [...prevImages, {
            id: nanoid(),
            file: file,
            compressed: compressedFile,
            preview: URL.createObjectURL(compressedFile)
        }])
    }

    if (!isOpen) return null
    return (
        <div className="relative">
            <video ref={videoRef} />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <Button onClick={handleCapture} variant='outline'><Camera className="h-4 w-4" />Capturer</Button>
                <Button onClick={onClose} variant='outline'><CircleX className="h-4 w-4" />Fermer</Button>
            </div>
        </div>
    )
}
