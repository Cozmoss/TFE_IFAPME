import { useEffect } from 'react'
import { useCamera } from '../hooks/useCamera.js'
import { useImages } from '../context/imageContext.jsx'
import { nanoid } from 'nanoid'
import imageCompression from 'browser-image-compression';


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
        setImages(prevImages => [...prevImages, {
            id: nanoid(),
            file: file,
            preview: URL.createObjectURL(file)
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
