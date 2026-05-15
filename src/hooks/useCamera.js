import { useRef } from 'react'

export function useCamera() {
    const videoRef = useRef(null)

    async function startCamera() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false
        })
        videoRef.current.srcObject = stream
        await videoRef.current.play()
    }
    
    function stopCamera() {
        const stream = videoRef.current?.srcObject
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
            videoRef.current.srcObject = null
        }
    }

    function capturePhoto() {
        const video = videoRef.current
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0)
        return new Promise((resolve) => {
            canvas.toBlob(blob => {
                const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' })
                resolve(file)
            }, 'image/jpeg', 0.92)
        })
    }

    return { videoRef, startCamera, stopCamera, capturePhoto }
}