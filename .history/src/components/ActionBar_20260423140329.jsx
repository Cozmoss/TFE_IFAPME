import { useImages } from '../context/imageContext.jsx'
import generatePDF from '../utils/generatePDF.js'

async function handleGeneratePDF() {
    
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
        </div>
    )
}
