import html2pdf from "html2pdf.js";
import "../../public/public_fonts_Yekan-normal.js";
export const downloadToPDF = (
  elementId: string,
  fileName?: string,
  handleLoading?: () => void
) => {
  const element = document.getElementById(elementId);
  if (handleLoading) handleLoading();
  if (!element) {
    // مخفی کردن لودینگ در صورت خطا
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).hideLoading) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).hideLoading();
    }
    return;
  }
  const style = document.createElement("style");
  style.innerHTML = `
    #${elementId} {
      font-family: 'Yekan', sans-serif;
      direction: rtl;
    }
  `;
  document.head.appendChild(style);
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${fileName}.pdf`,

    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    enableLinks: true,

    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // 👈 افزایش کیفیت رندر با scale بالا
      useCORS: true, // در صورتی که فونت یا عکس از CDN لود می‌کنی
    },
    jsPDF: {
      unit: "mm",
      format: "a5",
      orientation: "portrait",
    },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .toPdf()
    .get("pdf")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((pdf: any) => {
      const totalPages = pdf.internal.getNumberOfPages();

      pdf.setFont("Yekan");

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(
          `صفحه ${i} از ${totalPages}`,
          pdf.internal.pageSize.getWidth() - 30,
          pdf.internal.pageSize.getHeight() - 5,
          {
            align: "right",
          }
        );
      }
    })
    .then(() => {
      console.log("PDF downloaded successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).hideLoading) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).hideLoading();
      }
    })
    .save();
};
