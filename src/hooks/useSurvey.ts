import { useNotify } from "@/components/notife/notife";
import {
  onCheckHasToken,
  ProfileSliceType,
} from "@/redux/profile/profileSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { IInvoiceDetail } from "@/types/invoice";
import { ISurveyInfo } from "@/types/survet-types";
import { getInvoiceById } from "@/utils/invoiceService";
import { getSurveyInfoByInvoiceId } from "@/utils/surveyService";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

const useSurvey = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const { notify } = useNotify();
  const [errorState, setErrorState] = useState(false);

  const invoiceId = searchParams.get("invoiceId");
  const { hasToken } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  // Query for invoice
  const invoiceQuery = useQuery({
    queryKey: ["invoice-detail", invoiceId],
    queryFn: () => getInvoiceById({ invoiceId }),
    enabled: !!invoiceId && hasToken,
  });

  // Query for survey info (only after invoice is successful)
  const surveyQuery = useQuery({
    queryKey: ["survey-info", invoiceId],
    queryFn: () => getSurveyInfoByInvoiceId({ invoiceId }),
    enabled: !!invoiceId && invoiceQuery.data?.status === true,
  });

  // 🔥 Handle invoice errors
  useEffect(() => {
    if (
      invoiceQuery.error ||
      (invoiceQuery.data && !invoiceQuery.data.status)
    ) {
      notify(
        "error",
        invoiceQuery.data?.statusMessage || "خطا در دریافت فاکتور"
      );
      setErrorState(true);
    }
  }, [invoiceQuery.error, invoiceQuery.data]);

  // 🔥 Handle survey errors
  useEffect(() => {
    if (surveyQuery.error || (surveyQuery.data && !surveyQuery.data.status)) {
      notify(
        "error",
        surveyQuery.data?.statusMessage || "خطا در دریافت اطلاعات نظرسنجی"
      );
      setErrorState(true);
      router("/");
    }
  }, [surveyQuery.error, surveyQuery.data]);

  // ✅ Auth check
  useEffect(() => {
    if (!hasToken) {
      dispatch(onCheckHasToken());
    }
  }, [hasToken, dispatch]);

  return {
    loadingInvoice: invoiceQuery.isPending,
    loadingSurvey: surveyQuery.isPending,
    invoiceId,
    invoiceDetail: invoiceQuery.data?.result as IInvoiceDetail,
    surveyInfo: surveyQuery.data?.result as ISurveyInfo,
    errorState,
  };
};

export default useSurvey;
