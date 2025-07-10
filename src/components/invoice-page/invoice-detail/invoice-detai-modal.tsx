"use client";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import InvoiceIdPage from "./invoice-detail-component";
import { IInvoiceDetail } from "@/types/invoice";
import clsx from "clsx";

interface InvoiceModalDetailProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  showSurveyButton?: boolean;
  loadingInvoice: boolean;
  invoiceDetail: IInvoiceDetail;
  transactionID: string;
}

const InvoiceModalDetail: React.FC<InvoiceModalDetailProps> = ({
  open,
  setOpen,
  showSurveyButton,
  loadingInvoice,
  invoiceDetail,
  transactionID,
}) => {
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (open) {
        handleCancel(); // Close the modal
        event.preventDefault(); // Prevent the default back behavior
        window.history.pushState(null, ""); // Push state to avoid exiting the page
      }
    };

    if (open) {
      window.history.pushState(null, ""); // Push a new state to the history stack
      window.addEventListener("popstate", handlePopState); // Listen for the back button
    }

    return () => {
      window.removeEventListener("popstate", handlePopState); // Cleanup the event listener
    };
  }, [open]);

  return (
    <Modal
      open={!!open}
      title={
        <div className="w-full flex items-center justify-center relative">
          <span>فاکتور</span>
          <CloseOutlined
            className="!text-Alert !absolute top-0 bottom-0 my-auto left-2"
            role="button"
            onClick={() => {
              setOpen(() => !open);
            }}
          />
        </div>
      }
      onCancel={handleCancel}
      style={{
        direction: "rtl",
      }}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
        content: " !p-2 !bg-BG",
        footer: "!hidden",
        body: "!w-[95vw] !max-w-[375px] !h-[85vh]",
        wrapper: clsx("!w-max !h-max m-auto", ""),
      }}
      className="!p-0 !top-0 !my-0 !mx-auto"
      closeIcon={false}
      footer={false}
    >
      <InvoiceIdPage
        onClose={setOpen}
        showServayButton={showSurveyButton}
        invoiceDetail={invoiceDetail}
        transactionID={transactionID}
        loadingInvoice={!!loadingInvoice}
      />
    </Modal>
  );
};

export default InvoiceModalDetail;
