// utils/downloadToPdfWrapper.ts
export const safeDownloadToPdf = async (
  elementId: string,
  fileName?: string,
  handleLoading?: () => void
) => {
  if (typeof window === "undefined") return;

  const { downloadToPDF } = await import("./exportPdf");
  return downloadToPDF(elementId, fileName, handleLoading);
};
