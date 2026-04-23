import {PDFDocument} from 'pdf-lib'

function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file)
        const image = new Image()
        image.onload = () => {
            URL.revokeObjectURL(url)
            resolve(image)
        }
        image.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Failed to load WEBP image'))
        }
        image.src = url
    })
}

async function convertWebpToPng(file) {
    const img = await loadImageFromFile(file)
    const canvas = document.createElement('canvas')
    canvas.width = img.width
}

export async function generatePDF(images) {
    const pdfDoc = await PDFDocument.create()

    for (const image of images) {
        const arrayBuffer = await image.file.arrayBuffer()
        let pdfImage
        if (image.file.type === 'image/jpeg') {
            pdfImage = await pdfDoc.embedJpg(arrayBuffer);
        } else if (image.file.type === 'image/png') {
            pdfImage = await pdfDoc.embedPng(arrayBuffer);
        }

        const page = pdfDoc.addPage([595.28, 841.89]) // A4 size in points
        const pageWidth = page.getWidth()
        const pageHeight = page.getHeight()

        const imgWidth = pdfImage.width
        const imgHeight = pdfImage.height

        const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
        const scaleWidth = imgWidth * scale
        const scaleHeight = imgHeight * scale

        const x = (pageWidth - scaleWidth) / 2
        const y = (pageHeight - scaleHeight) / 2

        page.drawImage(pdfImage, {
            x,
            y,
            width: scaleWidth,
            height: scaleHeight
        })
    }

    const pdfBytes = await pdfDoc.save()
    return pdfBytes
}