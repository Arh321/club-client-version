"use client";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import React, { useEffect } from "react";
import MemoizedCtaButton from "../shared-components/cta-button";
import DotsLoading from "../shared-components/dots-loader";

interface SendOtpByInvoiceProps {
  handleSendOtpByInvoiceId: () => void;
  loading: boolean;
  getOtpError: boolean;
}

const SendOtpByInvoice: React.FC<SendOtpByInvoiceProps> = ({
  handleSendOtpByInvoiceId,
  loading,
  getOtpError,
}) => {
  useEffect(() => {
    handleSendOtpByInvoiceId();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 items-center mt-4">
      <span className="w-full text-center whitespace-nowrap text-cta font-Medium">
        {!getOtpError
          ? "در حال ارسال کد تایید به سر شماره فاکتور"
          : "خطا در ارسال کد تایید"}
      </span>
      {loading && <DotsLoading />}
      {getOtpError && (
        <MemoizedCtaButton
          onClick={handleSendOtpByInvoiceId}
          className={clsx(
            "font-Medium bg-cta animate-fadeIn hover:bg-cta-hover disabled:opacity-70 text-Highlighter py-3 w-2/3 text-lg rounded-lg fixed bottom-8 right-0 left-0 mx-auto max-w-[250px]"
          )}
        >
          دریافت مجدد کد تایید
          {loading && <LoadingOutlined />}
        </MemoizedCtaButton>
      )}
    </div>
  );
};
export default SendOtpByInvoice;
