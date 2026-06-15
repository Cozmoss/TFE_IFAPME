 export function formatFileSize(bytes) {
	if (bytes >= 1048576) {
		return (bytes / 1048576).toFixed(1) + " MB";
	}
	return (bytes / 1024).toFixed(1) + " KB";
}

