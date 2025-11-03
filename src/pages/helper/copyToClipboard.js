export function copyToClipboard(copiedText) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(copiedText).then(() => {
      return true;
    });
  }
}
