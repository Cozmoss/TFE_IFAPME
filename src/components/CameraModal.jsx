import { useEffect } from 'react'
import { useCamera } from '../hooks/useCamera.js'
import { useImages } from '../context/imageContext.jsx'
import { nanoid } from 'nanoid'
import imageCompression from 'browser-image-compression';
import { COMPRESSION_OPTIONS } from '../utils/compressionOptions.js';


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
        onClose()
    }

    if (!isOpen) return null
    return (
        <div>
            <video ref={videoRef} />
            <button onClick={handleCapture}>Capture</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}
