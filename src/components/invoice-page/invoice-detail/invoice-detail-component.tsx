"use client";
import React from "react";
import Link from "next/link";
import { IInvoiceDetail } from "@/types/invoice";
import { IProfileInfo } from "@/types/profile";
import InvoiceDetailHeader from "./invoice-detail-components/invoice-detail-header";
import InvoiceDetailSummary from "./invoice-detail-components/invoice-detail-summeries";
import InvoiceDetailItemsTable from "./invoice-detail-components/invoice-detail-table";
import InvoiceDetailsFooter from "./invoice-detail-components/invoice-detail-footer";
import useInvoiceDetail from "@/hooks/useInvoiceDetail";
import style from "@/styles/pages-loader-style.module.css";
type InvoiceIdPageProps = {
  transactionID?: string;
  invoiceDetail?: IInvoiceDetail;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  showServayButton: boolean;
  loadingInvoice?: boolean;
};

const InvoiceIdPage: React.FC<InvoiceIdPageProps> = ({
  transactionID,
  invoiceDetail,
  onClose,
  showServayButton,
  loadingInvoice,
}) => {
  const {
    invoice,
    downloadPdfDocument,
    print,
    isPending,
    isError,
    reset,
    info,
  } = useInvoiceDetail(transactionID, onClose, invoiceDetail);

  if (isPending || loadingInvoice) {
    return (
      <div className="w-full h-[90dvh] grow flex justify-center items-center">
        <div className={style["loader"]}></div>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        onClose={onClose}
        downloadPdf={downloadPdfDocument}
        print={print}
        onLoadSearchedInvoice={() => reset()}
      />
    );
  }

  if (invoice)
    return (
      <div
        dir="rtl"
        className="w-full flex flex-col h-full overflow-y-auto custome-scrool-bar animate-fadeIn bg-Highlighter p-1 rounded-lg"
      >
        <InvoiceDetailHeader
          transactionID={transactionID}
          onClose={onClose}
          downloadPdf={downloadPdfDocument}
          print={print}
        />
        <InvoiceDetails invoice={invoice} info={info} />
        {showServayButton && <SurveyButton invoiceId={+invoice.sourceId} />}
      </div>
    );
};

const InvoiceDetails: React.FC<{
  invoice: IInvoiceDetail;
  info: IProfileInfo;
}> = ({ invoice, info }) => (
  <div className="flex flex-col justify-between text-xs font-Light bg-Highlighter ">
    <div id="testId">
      <InvoiceDetailSummary
        transactionID={invoice.id}
        saleDate={invoice.purchaseDate}
        departmentName={"سجاد"}
        info={info}
      />
      <div className="w-full">
        <InvoiceDetailItemsTable items={invoice.body} />
      </div>
      <InvoiceDetailsFooter
        vatPrice={invoice.vatPrice}
        salePrice={invoice.totalPrice}
        finalPrice={invoice.totalPriceAfterDiscount}
        factorID={invoice.id}
      />
    </div>
  </div>
);

const SurveyButton: React.FC<{
  invoiceId: number;
}> = ({ invoiceId }) => (
  <Link
    href={`/survey?invoiceId=${invoiceId}`}
    className="py-3 flex justify-center rounded-md bg-cta text-Highlighter hover:!text-Highlighter w-2/3 mx-auto text-highlighter font-Bold"
  >
    ثبت نظر برای این فاکتور
  </Link>
);

const ErrorState: React.FC<{
  onLoadSearchedInvoice: () => void;
  downloadPdf: () => void;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  print: () => void;
}> = ({ onClose, onLoadSearchedInvoice, downloadPdf, print }) => (
  <div
    dir="rtl"
    className="w-full flex flex-col gap-20 h-[50dvh] overflow-hidden animate-fadeIn"
  >
    <InvoiceDetailHeader
      onClose={onClose}
      downloadPdf={downloadPdf}
      print={print}
    />
    <button
      onClick={() => onLoadSearchedInvoice()}
      className="font-Medium bg-cta text-Highlighter p-3 text-lg rounded-lg w-max"
    >
      تلاش مجدد
    </button>
  </div>
);

export default InvoiceIdPage;
