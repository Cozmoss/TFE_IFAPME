import {PDFDocument} from 'pdf-lib'

export async function generatePDF(images) {
    const pdfDoc = await PDFDocument.create()

    for (const image of images) {
        const arrayBuffer = await image.file.arrayBuffer()
        let pdfImage
        if (image.file.type === 'image/jpeg') {
            pdfImage = await pdfDoc.embedJpeg(arrayBuffer);
        } else if (image.file.type === 'image/png') {
            pdfImage = await pdfDoc.embedPng(arrayBuffer);
        }

        const page = pdfDoc.addPage([595.28, 841.89]) // A4 size in points
        const pageWidth = page.getWidth()
        const pageHeight = page.getHeight()

        const imgWidth = pdfImage.width
        const imgHeight = pdfImage.height

        const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
        const scaleWidth = imgWidth * 
    }

    const pdfBytes = await pdfDoc.save()
    return pdfBytes
}