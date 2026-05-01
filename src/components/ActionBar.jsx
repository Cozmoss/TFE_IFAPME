import { useState } from 'react'
import { useImages } from '../context/imageContext.jsx'
import { generatePDF } from '../utils/generatePDF.js'
import { downloadPDF } from '../utils/downloadPDF.js'


export default function ActionBar() {
    const { images, setImages } = useImages();
    const [isGenerating, setIsGenerating] = useState(false)
    const [isSharing, setIsSharing] = useState(false)

    async function handleGeneratePDF() {
        if (images.length === 0) {
            alert('No images to generate PDF')
            return
        }
        try {
            setIsGenerating(true)
            const date = new Date().toISOString().slice(0, 10)
            const pdfBytes = await generatePDF(images)
            downloadPDF(pdfBytes, date)
        } catch (error) {
            console.error(error);
            alert('Failed to generate PDF')
        } finally {
            setIsGenerating(false)
        }
    }

    async function handleShare() {
        if (images.length === 0) {
            alert('No images to share')
            return
        }
        try {
            setIsSharing(true)
            const pdfBytes = await generatePDF(images)
            const date = new Date().toISOString().slice(0, 10)
            const file = new File([pdfBytes], `pixmerge_${date}.pdf`, { type: 'application/pdf' })
            if (navigator.canShare &&navigator.canShare({ files: [file] })) {
                await navigator.share({title: 'PixMerge PDF', files: [file]})
            } else {
                downloadPDF(pdfBytes, date);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to share PDF')
        } finally {
            setIsSharing(false)
        }


    }

    function handleRemoveAll() {
        if (window.confirm('Are you sure you want to delete all images?')) {
            setImages([])
        }
    }
    return (
        <div>
            <button onClick={handleRemoveAll} className="cursor-pointer">Delete all</button>
            <button onClick={handleGeneratePDF} className="cursor-pointer" disabled={isGenerating || images.length === 0}>
                {isGenerating ? 'Generating...' : 'Generate PDF'}
            </button>
            <button onClick={handleShare} className="cursor-pointer" disabled={isSharing || images.length === 0}>
                {isSharing ? 'Sharing...' : 'Share PDF'}
            </button>
        </div>
    )
}
