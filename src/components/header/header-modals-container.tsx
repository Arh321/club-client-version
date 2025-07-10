"use client";

import useAuth from "@/hooks/useAuth";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import CancelSurveyModal from "./cancel-survey-modal";
import InvoiceModalDetail from "../invoice-page/invoice-detail/invoice-detai-modal";
import SurveySubmitModal from "../landing/modals/survey-submit-modal";
import { useSearchParams } from "next/navigation";

interface HeaderModalsContainerProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
}

const HeaderModalsContainer: React.FC<HeaderModalsContainerProps> = ({
  isModalOpen,
  setIsModalOpen,
  pathname,
}) => {
  const searchParams = useSearchParams();
  const paramsData = useMemo(() => {
    const avg = searchParams.get("average");
    const srv = searchParams.get("survey");
    const invoiceId = searchParams.get("invoiceId");
    const surveyId = searchParams.get("surveyId");
    return invoiceId && surveyId
      ? { average: avg, survey: srv, invoiceId, surveyId }
      : undefined;
  }, [searchParams]);
  const {
    invoiceDetail,
    loadingInvoice,
    showInvoice,
    invoiceId,
    setShowInvoice,
  } = useAuth();
  useEffect(() => {
    setShowInvoice(false);
    if (invoiceDetail) {
      setShowInvoice(true);
    }
  }, [pathname, invoiceDetail, setShowInvoice]);
  return (
    <>
      <CancelSurveyModal setOpen={setIsModalOpen} open={isModalOpen} />

      <InvoiceModalDetail
        setOpen={setShowInvoice}
        open={showInvoice}
        loadingInvoice={loadingInvoice}
        invoiceDetail={invoiceDetail}
        transactionID={invoiceId}
      />
      {paramsData && <SurveySubmitModal paramsData={paramsData} />}
    </>
  );
};

export default HeaderModalsContainer;
