import { useImages } from '../context/imageContext.jsx'
import generatePDF from '../utils/generatePDF.js'

async function handleGeneratePDF(images) {
    generatePDF(images)
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const date = new Date().toISOString().slice(0, 10)
    link.href = url
    link.download = `pixmerge_${date}.pdf`
    link.click()
    URL.revokeObjectURL(url)
}

export default function ActionBar() {
    const { setImages } = useImages();

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
