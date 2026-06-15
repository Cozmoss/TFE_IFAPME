import { useEffect, useRef, useState } from "react";
import { useImages } from "../context/imageContext.jsx";
import { generatePDF } from "../utils/generatePDF.js";
import { downloadPDF } from "../utils/downloadPDF.js";
import Button from "./ui/button.jsx";
import { FileDown, Share2, Trash2 } from "lucide-react";
import { formatFileSize } from "../utils/formatFileSize.js";
import ConfirmDialog from "./ui/ConfirmDialog.jsx";
import { useI18n } from "../i18n/i18nContext.jsx";
import { toast } from "sonner";

export default function ActionBar() {
	const { images, setImages } = useImages();
	const { t } = useI18n();
	const [isGenerating, setIsGenerating] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [isExportBoxVisible, setIsExportBoxVisible] = useState(true);
	const exportBoxRef = useRef(null);

	useEffect(() => {
		const el = exportBoxRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => setIsExportBoxVisible(entry.isIntersecting),
			{ threshold: 0.3 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	const estimatedSize = images.reduce((total, image) => {
		return total + (image.compressed?.size ?? image.file.size);
	}, 0);
	const [showConfirm, setShowConfirm] = useState(false);

	async function handleGeneratePDF() {
		try {
			setIsGenerating(true);
			const date = new Date().toISOString().slice(0, 10);
			const pdfBytes = await generatePDF(images);
			downloadPDF(pdfBytes, date);
			toast.success(t("actionBar.generateSuccess"));
		} catch (error) {
			console.error(error);
			toast.error(t("actionBar.generateFailed"));
		} finally {
			setIsGenerating(false);
		}
	}

	async function handleShare() {
		try {
			setIsSharing(true);
			const pdfBytes = await generatePDF(images);
			const date = new Date().toISOString().slice(0, 10);
			const file = new File([pdfBytes], `pixmerge_${date}.pdf`, {
				type: "application/pdf",
			});
			if (navigator.canShare && navigator.canShare({ files: [file] })) {
				await navigator.share({ title: "PixMerge PDF", files: [file] });
			} else {
				downloadPDF(pdfBytes, date);
			}
		} catch (error) {
			console.error(error);
			toast.error(t("actionBar.shareFailed"));
		} finally {
			setIsSharing(false);
		}
	}

	function handleRemoveAll() {
		setShowConfirm(true);
	}
	return (
		<>
			<ConfirmDialog
				isOpen={showConfirm}
				title={t("confirmDialog.deleteTitle")}
				description={t("confirmDialog.deleteDescription")}
				onConfirm={() => {
					setImages([]);
					setShowConfirm(false);
				}}
				onCancel={() => setShowConfirm(false)}
			/>
			<div ref={exportBoxRef} className="rounded-lg border border-(--border) bg-(--surface) p-5">
				<h3 className="text-base font-semibold text-(--foreground)">
					{t("actionBar.exportTitle")}
				</h3>
				<div className="mt-4 space-y-2.5">
					<div className="flex items-center justify-between text-base">
						<span className="text-(--muted-foreground)">
							{t("actionBar.images")}
						</span>
						<span className="font-medium text-(--foreground)">
							{images.length}
						</span>
					</div>
					<div className="flex items-center justify-between text-base">
						<span className="text-(--muted-foreground)">
							{t("actionBar.pages")}
						</span>
						<span className="font-medium text-(--foreground)">
							{images.length === 0 ? "—" : images.length}
						</span>
					</div>
					<div className="flex items-center justify-between text-base">
						<span className="text-(--muted-foreground)">
							{t("actionBar.size")}
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
						{isGenerating
							? t("actionBar.generating")
							: t("actionBar.generate")}
					</Button>
					<Button
						onClick={handleShare}
						variant="ghost"
						className="w-full gap-2"
						disabled={isSharing || images.length === 0}>
						<Share2 className="h-4 w-4" />
						{isSharing
							? t("actionBar.sharing")
							: t("actionBar.share")}
					</Button>
				</div>
				<div className="mt-4 border-t border-(--border) pt-4">
					<Button
						onClick={handleRemoveAll}
						variant="ghost"
						className="w-full gap-2 text-(--destructive) hover:bg-(--destructive)/10 hover:text-(--destructive)">
						<Trash2 className="h-4 w-4" />
						{t("actionBar.removeAll")}
					</Button>
				</div>
			</div>
			{!isExportBoxVisible && images.length > 0 && (
				<div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-(--border) bg-(--surface) p-3 shadow-lg sm:hidden" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
					<Button
						onClick={handleGeneratePDF}
						variant="default"
						className="flex-1 gap-2"
						disabled={isGenerating || images.length === 0}>
						<FileDown className="h-4 w-4" />
						{isGenerating
							? t("actionBar.generating")
							: t("actionBar.generate")}
					</Button>
					<Button
						onClick={handleShare}
						variant="secondary"
						className="flex-1 gap-2"
						disabled={isSharing || images.length === 0}>
						<Share2 className="h-4 w-4" />
						{isSharing
							? t("actionBar.sharing")
							: t("actionBar.share")}
					</Button>
				</div>
			)}
		</>
	);
}
