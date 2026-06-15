import { useImages } from '../context/imageContext.jsx'
import { generatePDF } from '../utils/generatePDF.js'


export default function ActionBar() {
    const { images, setImages } = useImages();

    async function handleGeneratePDF() {
        const pdfBytes = await generatePDF(images)
        if (!pdfBytes) {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const date = new Date().toISOString().slice(0, 10)
        const link = document.createElement('a')
        link.href = url
        link.download = `pixmerge_${date}.pdf`
        link.click()
        URL.revokeObjectURL(url)
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
