import { useImages } from '../context/imageContext.jsx'

export default function ActionBar() {
  return (
    <div>
        <button onClick={() => handleRemoveAll()}>Delete all</button>
    </div>
  )
}
