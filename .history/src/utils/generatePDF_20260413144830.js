import {PDFDocument} from 'pdf-lib'

export async function generatePDF(images) {
    const pdfDoc = await PDFDocument.create()

    for (const image of images) {
        const arrayBuffer = await image.file.arrayBuffer()
        let pdfImage
        if (image.file.type === 'image/jpeg') {
            pdfImage = await pdfDoc.
        }
    }

    const pdfBytes = await pdfDoc.save()
    return pdfBytes
}