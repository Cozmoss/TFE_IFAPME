import { useImages } from '../context/imageContext.jsx'
import { generatePDF } from '../utils/generatePDF.js'


export default function ActionBar() {
    async function handleGeneratePDF(images) {
        const pdfBytes = await generatePDF(images)
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        const date = new Date().toISOString().slice(0, 10)
        link.href = url
        link.download = `pixmerge_${date}.pdf`
        link.click()
        URL.revokeObjectURL(url)
    }
    const { images, setImages } = useImages();

    function handleRemoveAll() {
        if (window.confirm('Are you sure you want to delete all images?')) {
            setImages([])
        }
    }
    return (
        <div>
            <button onClick={handleRemoveAll} className="cursor-pointer">Delete all</button>
            <button onClick={() => handleGeneratePDF(images)} className="cursor-pointer">Generate PDF</button>
        </div>
    )
}
