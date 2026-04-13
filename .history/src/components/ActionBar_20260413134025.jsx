import { useImages } from '../context/imageContext.jsx'

export default function ActionBar() {
    const { setImages } = useImages();

    function handleRemoveAll() {
        if (window.confirm('Are you sure you want to delete all images?')) {
            setImages([])
        }
    }
    return (
        <div>
            <button onClick={handleRemoveAll} className="button cursor-">Delete all</button>
        </div>
    )
}
