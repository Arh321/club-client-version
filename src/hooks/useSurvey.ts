import { useNotify } from "@/components/notife/notife";
import {
  onCheckHasToken,
  ProfileSliceType,
} from "@/redux/profile/profileSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { IInvoiceDetail } from "@/types/invoice";
import { ISurveyInfo } from "@/types/survet-types";
import { getInvoiceById, validateInvoiceById } from "@/utils/invoiceService";
import { getSurveyInfoByInvoiceId } from "@/utils/surveyService";
import { error } from "console";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

const useSurvey = () => {
  const [loadingSurvey, setLoadingSurvey] = useState(false);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [surveyInfo, setSurveyInfo] = useState<ISurveyInfo | undefined>(
    undefined
  );
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState<
    IInvoiceDetail | undefined
  >();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notify } = useNotify();
  const cookies = new Cookies();

  const invoiceId = searchParams.get("invoiceId");
  const { hasToken } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  const onLoadSearchedInvoice = useCallback(async () => {
    if (!invoiceId) return;

    setLoadingInvoice(true);

    try {
      // const valid = await validateInvoiceById({ invoiceId });

      // if (!valid.status) {
      //   notify("error", valid.statusMessage || "اطلاعات فاکتور مطابقت ندارد");

      //   return;
      // }

      const response = await getInvoiceById({ invoiceId });

      if (response.status) {
        setInvoiceDetail(() => response.result);
        onGetSurveyInfo();
      } else {
        notify("error", response.statusMessage || "خطا در دریافت فاکتور");
        setErrorState(true);
      }
    } catch (error) {
      notify("error", "خطا در دریافت فاکتور");
      setErrorState(true);
    } finally {
      setLoadingInvoice(false);
    }
  }, [invoiceId, notify]);

  const onGetSurveyInfo = useCallback(async () => {
    if (!invoiceId) return;

    try {
      setLoadingSurvey(true);
      const response = await getSurveyInfoByInvoiceId({
        invoiceId: invoiceId,
      });

      if (response.status) {
        setSurveyInfo(response.result);
      } else {
        notify(
          "error",
          response.statusMessage || "خطا در دریافت اطلاعات نظرسنجی"
        );
        setErrorState(true);

        router.push("/");
      }
    } catch (error) {
      notify("error", "خطا در دریافت اطلاعات نظرسنجی");
      setErrorState(true);

      router.push("/");
    } finally {
      setLoadingSurvey(false);
    }
  }, [invoiceId]); // ✅ Dependency added to avoid stale closures

  useEffect(() => {
    if (hasToken) {
      onLoadSearchedInvoice();
    } else {
      dispatch(onCheckHasToken());
    }
  }, [hasToken, onGetSurveyInfo, dispatch]); // ✅ Dependency fixed

  return {
    loadingSurvey,
    loadingInvoice,
    surveyInfo,
    invoiceId,
    errorState,
    invoiceDetail,
  };
};

export default useSurvey;
