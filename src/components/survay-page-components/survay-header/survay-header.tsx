"use client";

import InvoiceModalDetail from "@/components/invoice-page/invoice-detail/invoice-detai-modal";
import MemoizedCtaButton from "@/components/shared-components/cta-button";
import { IInvoiceDetail } from "@/types/invoice";
import moment from "jalali-moment";
import { useState } from "react";

interface SurvayHeaderProps {
  invoiceDate: string;
  invoiceId: string;
  survayDescription: string;
  survayTopic: string;
  invoiceDetail: IInvoiceDetail;
}

const SurvayHeader: React.FC<SurvayHeaderProps> = ({
  invoiceDate,
  invoiceId,
  survayDescription,
  survayTopic,
  invoiceDetail,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col gap-2 py-2 border-b border-gray-300 sm:px-4"
    >
      <h1 className="w-full font-Medium text-Primary text-center !m-0">
        {survayTopic}
      </h1>
      <div className="w-full flex items-center justify-between">
        <span className="font-Regular border-r-2 border-cta px-[10px] flex items-end gap-1">
          <span>فاکتور</span>
          <span>،</span>
          <span>
            {moment(invoiceDate, "jYYYY/jMM/jDD")
              .locale("fa")
              .format("dddd jD jMMMM")}
          </span>
        </span>
        <MemoizedCtaButton
          onClick={() => setOpen(true)}
          className="w-[136px] h-[40px] text-cta font-Medium flex justify-center items-center rounded-[8px] border border-cta !bg-transparent"
        >
          مشاهده فاکتور
        </MemoizedCtaButton>
      </div>
      <p className="text-center w-full text-Secondary font-Regular !m-0">
        {survayDescription}
      </p>
      <InvoiceModalDetail
        setOpen={setOpen}
        open={open}
        loadingInvoice={false}
        invoiceDetail={invoiceDetail}
        transactionID={""}
        showSurveyButton={false}
      />
    </div>
  );
};

export default SurvayHeader;
