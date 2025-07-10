import Cookies from "universal-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { AppDispatch } from "@/redux/store";
import { onLoadingProfile, onSetProfile } from "@/redux/profile/profileSlice";
import { useNotify } from "@/components/notife/notife";
import { IInvoiceDetail } from "@/types/invoice";

import {
  useInvoiceById,
  useValidateInvoiceId,
  useGetProfile,
} from "./useAuthHooks";
import { checkCookieExists } from "@/utils/common-methods/cookiesMethodes";
import { useHandleApi } from "./useHandleApi";
const useAuth = () => {
  const [invoiceDetail, setInvoiceDetail] = useState<
    IInvoiceDetail | undefined
  >();
  const [showInvoice, setShowInvoice] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const cookies = new Cookies();
  const { notify } = useNotify();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeRef = useRef<any>(null);

  const invoiceId = searchParams.get("invoiceId") ?? "";
  const avg = searchParams.get("average");

  const { mutate: validateInvoice, isPending: loadingValidateInvoice } =
    useValidateInvoiceId();
  const { mutate: getProfile, isPending: profileLoading } = useGetProfile();
  const { mutate: getInvoice, isPending: loadingInvoice } = useInvoiceById();

  const handleProfileError = (message?: string) => {
    clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      notify("error", message || "خطا در دریافت اطلاعات کاربر");
      cookies.remove("token");
      router.push("/login");
    }, 50);
  };

  const { handleResponse, handleError } = useHandleApi();

  const loadProfile = useCallback(() => {
    dispatch(onLoadingProfile(true));
    getProfile(undefined, {
      onSuccess: (res) => {
        if (res.statusCode == 200) {
          dispatch(onSetProfile(res.result));
          const fullName = `${res?.result?.mandatory?.firstName} ${res?.result?.mandatory?.lastName} خوش آمدید`;
          notify("success", fullName);
        } else {
          handleProfileError(res.statusMessage);
        }
        dispatch(onLoadingProfile(false));
      },
      onError: (err) => {
        handleProfileError(err.response?.data?.resultMessage);
        dispatch(onLoadingProfile(false));
      },
    });
  }, [getProfile]);

  const loadInvoice = useCallback(() => {
    getInvoice(
      { invoiceId },
      {
        onSuccess: (res) => {
          handleResponse({
            response: res,
            successMsg: "فاکتور با موفقیت دریافت شد",
            errorMsg: "خطا در دریافت فاکتور",
            setShowInvoice,
            onSuccess: () => {
              setInvoiceDetail(res.result);
            },
          });
        },
        onError: (err) => {
          handleError(err, "خطای فاکتور", setShowInvoice);
        },
      }
    );
  }, [getInvoice, invoiceId]);

  const loadInvoiceFlow = useCallback(() => {
    if (!invoiceId) {
      loadProfile();
      return;
    }

    validateInvoice(
      { invoiceId },
      {
        onSuccess: (res) => {
          handleResponse({
            response: res,
            errorMsg: "اطلاعات فاکتور مطابقت ندارد",
            setShowInvoice,
            onSuccess: () => {
              dispatch(onLoadingProfile(true));
              getProfile(undefined, {
                onSuccess: (res) => {
                  if (res.statusCode == 401 || !res.result) {
                    handleProfileError(res.statusMessage);
                    return;
                  }
                  dispatch(onSetProfile(res.result));
                  dispatch(onLoadingProfile(false));
                  loadInvoice();
                },
                onError: (err) => {
                  handleProfileError(err.response?.data?.resultMessage);
                },
              });
            },
          });
        },
        onError: (err) => {
          handleError(err, "خطا در بررسی فاکتور", setShowInvoice);
        },
      }
    );
  }, [invoiceId, validateInvoice, getProfile, getInvoice]);

  useEffect(() => {
    if (checkCookieExists("token") && !path.includes("login")) {
      loadInvoiceFlow();
    } else {
      handleProfileError("لطفا دوباره ورود کنید");
    }
  }, []);

  return {
    loadingInvoice,
    loadingValidateInvoice,
    profileLoading,
    invoiceDetail,
    showInvoice,
    invoiceId,
    setShowInvoice,
    cookies,
  };
};
export default useAuth;
