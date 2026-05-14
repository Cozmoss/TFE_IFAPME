import { useState } from 'react'
import { useImages } from '../context/imageContext.jsx'
import { generatePDF } from '../utils/generatePDF.js'
import { downloadPDF } from '../utils/downloadPDF.js'
import Button from './ui/button.jsx';
import { FileDown, Share2, Trash2 } from 'lucide-react';
import { formatFileSize } from '../utils/formatFileSize.js';


export default function ActionBar() {
    const { images, setImages } = useImages();
    const [isGenerating, setIsGenerating] = useState(false)
    const [isSharing, setIsSharing] = useState(false)
    const estimatedSize = images.reduce((total, image) => {
        return total + (image.compressed?.size ?? image.file.size)
    }, 0)

    async function handleGeneratePDF() {
        if (images.length === 0) {
            alert('No images to generate PDF')
            return
        }
        try {
            setIsGenerating(true)
            const date = new Date().toISOString().slice(0, 10)
            const pdfBytes = await generatePDF(images)
            downloadPDF(pdfBytes, date)
        } catch (error) {
            console.error(error);
            alert('Failed to generate PDF')
        } finally {
            setIsGenerating(false)
        }
    }

    async function handleShare() {
        if (images.length === 0) {
            alert('No images to share')
            return
        }
        try {
            setIsSharing(true)
            const pdfBytes = await generatePDF(images)
            const date = new Date().toISOString().slice(0, 10)
            const file = new File([pdfBytes], `pixmerge_${date}.pdf`, { type: 'application/pdf' })
            if (navigator.canShare &&navigator.canShare({ files: [file] })) {
                await navigator.share({title: 'PixMerge PDF', files: [file]})
            } else {
                downloadPDF(pdfBytes, date);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to share PDF')
        } finally {
            setIsSharing(false)
        }


    }

    function handleRemoveAll() {
        if (window.confirm('Are you sure you want to delete all images?')) {
            setImages([])
        }
    }
    return (
		<div className="rounded-lg border border-(--border) bg-(--surface) p-5">
			<h3 className="text-base font-semibold text-(--foreground)">
				Export
			</h3>
			<div className="mt-4 space-y-2.5">
				<div className="flex items-center justify-between text-base">
					<span className="text-(--muted-foreground)">Images</span>
					<span className="font-medium text-(--foreground)">
						{images.length}
					</span>
				</div>
				<div className="flex items-center justify-between text-base">
					<span className="text-(--muted-foreground)">Page PDF</span>
					<span className="font-medium text-(--foreground)">
						{images.length === 0 ? "—" : images.length}
					</span>
				</div>
				<div className="flex items-center justify-between text-base">
					<span className="text-(--muted-foreground)">
						Taille estimée
					</span>
					<span className="font-medium text-(--foreground)">
						{images.length === 0
							? "—"
							: formatFileSize(estimatedSize)}
					</span>
				</div>
			</div>
			<div className="mt-5 space-y-2">
				<Button
					onClick={handleGeneratePDF}
					variant="default"
					className="w-full gap-2"
					disabled={isGenerating || images.length === 0}>
					<FileDown className="h-4 w-4" />
					{isGenerating ? "Génération..." : "Générer le PDF"}
				</Button>
				<Button
					onClick={handleShare}
					variant="ghost"
					className="w-full gap-2"
					disabled={isSharing || images.length === 0}>
					<Share2 className="h-4 w-4" />
					{isSharing ? "Partage..." : "Partager le PDF"}
				</Button>
			</div>
			<div className="mt-4 border-t border-(--border) pt-4">
				<Button
					onClick={handleRemoveAll}
					variant="ghost"
					className="w-full gap-2 text-(--destructive) hover:bg-(--destructive)/10 hover:text-(--destructive)">
					<Trash2 className="h-4 w-4" />
					Tout supprimer
				</Button>
			</div>
		</div>
	);
}
