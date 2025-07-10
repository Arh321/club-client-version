"use client";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";

const InvoiceDetailHeader: React.FC<{
  transactionID?: string;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  downloadPdf: () => void;
  print: () => void;
}> = ({ onClose, downloadPdf, print }) => (
  <div className="flex justify-between px-2 items-center py-2 text-lg font-Light ">
    <span>رسید فاکتور</span>
    <div className="flex gap-8 items-center">
      <button onClick={print}>
        <PrinterOutlined />
      </button>
      <button onClick={downloadPdf}>
        <DownloadOutlined />
      </button>
      {!!onClose && (
        <button onClick={() => onClose(false)}>
          <i role="button" className="pi pi-times"></i>
        </button>
      )}
    </div>
  </div>
);

export default InvoiceDetailHeader;
