import useImage from '../context/imageContext.jsx'

export default function ImageDropZone() {
    
  return (
    <section>
        <form action="">
            <input type="file" id="imagesList" name="imagesList" accept="image/png, image/jpeg, image/webp, image/gif, image/bmp, image/svg+xml" multiple />
        </form>
    </section>
  )
}
