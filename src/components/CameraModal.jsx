import { useEffect, useState } from 'react'
import { useCamera } from '../hooks/useCamera.js'
import { useImages } from '../context/imageContext.jsx'
import { nanoid } from 'nanoid'
import imageCompression from 'browser-image-compression';
import { COMPRESSION_OPTIONS } from '../utils/compressionOptions.js';
import Button from './ui/button.jsx';
import { Camera, CircleX } from "lucide-react";
import { useI18n } from '../i18n/i18nContext.jsx';


export default function CameraModal({isOpen, onClose}) {
    const { t } = useI18n()
    const { videoRef, startCamera, stopCamera, capturePhoto } = useCamera()
    const { setImages } = useImages()
    const [flashKey, setFlashKey] = useState(0)

    useEffect(() => {
        if (isOpen) {
            startCamera() 
        } else {
            stopCamera()
        }
    }, [isOpen, startCamera, stopCamera])

    async function handleCapture() {
        setFlashKey(key => key + 1)
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
        <div className="fixed inset-0 z-50 flex flex-col bg-black sm:relative sm:z-auto sm:bg-transparent">
            <video ref={videoRef} autoPlay muted playsInline className="flex-1 min-h-0 w-full object-cover sm:flex-none sm:h-auto sm:object-contain" />
            {flashKey > 0 && (
                <div key={flashKey} className="absolute inset-0 bg-white animate-camera-flash pointer-events-none" />
            )}
            <div className="flex justify-center gap-4 p-4 bg-black sm:absolute sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:p-0 sm:bg-transparent">
                <Button onClick={handleCapture} variant='outline' className="text-base px-6 py-3 [&_svg]:size-5"><Camera className="h-5 w-5" />{t('cameraModal.capture')}</Button>
                <Button onClick={onClose} variant='outline' className="text-base px-6 py-3 [&_svg]:size-5"><CircleX className="h-5 w-5" />{t('cameraModal.close')}</Button>
            </div>
        </div>
    )
}
