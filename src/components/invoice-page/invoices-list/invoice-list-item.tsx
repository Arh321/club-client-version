"use client";
import { FactorIcon } from "@/components/sharedIcons/icons-index";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react";
import InvoiceModalDetail from "../invoice-detail/invoice-detai-modal";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { IInvoice } from "@/types/invoice";
import moment from "jalali-moment";
import { CheckOutlined, WarningOutlined } from "@ant-design/icons";

interface InvoiceListItemProps {
  index: number;
  invoice: IInvoice;
}

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({
  index,
  invoice,
}) => {
  const [open, setOpen] = useState(false);

  // 🔹 Memoized survey status
  const surveyStatus = useMemo(() => {
    if (!invoice.surveyEnable)
      return {
        text: "نظرسنجی در دسترس نیست",
        bgClass: "bg-[#ECFAF4] text-[#1EA97C] ",
      };
    if (invoice.surveyCompleted)
      return {
        text: "نظرسنجی تکمیل شده",
        bgClass: "bg-[#ECFAF4] text-[#1EA97C] ",
      };
    if (invoice.surveyAction)
      return {
        text: "نظرسنجی در حال انجام",
        bgClass: "bg-[#FFF6EB] text-[#CC8925]",
      };
    return {
      text: "نظرسنجی شروع نشده",
      bgClass: "bg-[#FFF6EB] text-[#CC8925]",
    };
  }, [invoice.surveyEnable, invoice.surveyCompleted, invoice.surveyAction]);

  // 🔹 Render survey icon based on status
  const renderSurveyIcon = () =>
    invoice.surveyEnable && !invoice.surveyCompleted ? (
      <WarningOutlined width={28} className="!text-[#CC8925] text-xl" />
    ) : (
      <CheckOutlined width={28} className="!text-[#1EA97C] text-xl" />
    );

  return (
    <>
      <div
        dir="rtl"
        role="button"
        onClick={() => setOpen(true)}
        style={{
          animationDelay: `${(index + 1) * 0.05}s`,
          animationFillMode: "forwards",
          transform: "translateY(250px)",
        }}
        className="w-full flex flex-col opacity-0 gap-[12px] px-[10px] pt-[12px] pb-[50px] shadow bg-Highlighter rounded-[10px] relative animate-fadeUp overflow-hidden"
      >
        {/* 🔹 Branch Name & Payment */}
        <div className="w-full flex items-center justify-between">
          <span className="flex items-center gap-1 text-cta font-Regular">
            <Icon
              icon="ph:map-pin"
              width="24"
              height="24"
              style={{ color: "var(--cta)" }}
            />
            <span>{invoice.branchName}</span>
          </span>
          <span className="px-[10px] min-w-[123px] py-1 flex items-start justify-center gap-1 bg-transparent border border-Focus rounded-[50px] text-Focus">
            <span className="font-Medium text-base">
              {numberToPersianPrice(invoice.payAmount)}
            </span>
            <span className="font-Regular text-xs">تومان</span>
          </span>
        </div>

        {/* 🔹 Invoice ID & Purchase Date */}
        <div className="w-full flex items-center justify-between">
          <span className="flex items-center gap-1 text-cta font-Regular">
            <FactorIcon width="24" height="28" color="var(--cta)" fill={""} />
            <span>#{invoice.sourceId}</span>
          </span>
          <span dir="ltr" className="text-cta font-Regular">
            {moment(invoice.purchaseDate, "YYYY/MM/DD")
              .locale("fa")
              .format("YYYY/MM/DD hh:mm")}
          </span>
        </div>

        {/* 🔹 Survey Status */}
        <div
          className={clsx(
            "w-full flex items-center justify-between absolute bottom-0 right-0 px-[10px] py-1",
            surveyStatus.bgClass
          )}
        >
          {renderSurveyIcon()}
          <span className=" font-Regular">{surveyStatus.text}</span>
          <span></span>
        </div>
      </div>

      {/* 🔹 Invoice Modal */}
      <InvoiceModalDetail
        setOpen={setOpen}
        open={open}
        showSurveyButton={invoice.surveyEnable && !invoice.surveyCompleted}
        loadingInvoice={false}
        transactionID={invoice.sourceId.toString()}
        invoiceDetail={undefined}
      />
    </>
  );
};

export default InvoiceListItem;
