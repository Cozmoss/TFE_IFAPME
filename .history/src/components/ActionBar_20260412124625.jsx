import { useImages } from '../context/imageContext.jsx'

export default function ActionBar() {
    const { setImages } = useImages();

    function handleRemoveAll() {
        if (windows.confirm(''))
        setImages([])
    }
    return (
        <div>
            <button onClick={handleRemoveAll}>Delete all</button>
        </div>
    )
}
