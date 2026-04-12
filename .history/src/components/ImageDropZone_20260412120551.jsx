import useImage from '../context/imageContext.jsx'

export default function ImageDropZone() {
  return (
    <section>
        <form action="">
            <input type="file" id="imagesList" name="imagesList" accept="image/png, image/jpeg" />
        </form>
    </section>
  )
}
