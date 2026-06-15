import {PDFDocument} from 'pdf-lib'

export async function generatePDF(images) {
    const pdfDoc = await PDFDocument.create()

    for (const image of images) {
        const arrayBuffer = aw
    }

    const pdfBytes = await pdfDoc.save()
    return pdfBytes
}