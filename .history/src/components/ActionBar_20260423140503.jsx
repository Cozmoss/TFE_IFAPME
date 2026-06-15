import { useImages } from '../context/imageContext.jsx'
import generatePDF from '../utils/generatePDF.js'

async function handleGeneratePDF() {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
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
