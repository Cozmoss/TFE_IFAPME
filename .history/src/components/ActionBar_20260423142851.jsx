import { useState } from 'react'
import { useImages } from '../context/imageContext.jsx'
import { generatePDF } from '../utils/generatePDF.js'


export default function ActionBar() {
    const { images, setImages } = useImages();
    const [isGenerating, setIsGenerating] = useState(false)

    async function handleGeneratePDF() {
        if (images.length === 0) {
            alert('No images to generate PDF')
            return
        }
        try {
            setIsGenerating(true)
            const pdfBytes = await generatePDF(images)
            const blob = new Blob([pdfBytes], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            const date = new Date().toISOString().slice(0, 10)
            const link = document.createElement('a')
            link.href = url
            link.download = `pixmerge_${date}.pdf`
            link.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error(error);
            alert
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
            <button onClick={handleGeneratePDF} className="cursor-pointer">Generate PDF</button>
        </div>
    )
}
