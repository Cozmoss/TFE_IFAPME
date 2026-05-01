export function downloadPDF(pdfBytes, date) {
	const blob = new Blob([pdfBytes], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `pixmerge_${date}.pdf`;
	link.click();
	URL.revokeObjectURL(url);
}
