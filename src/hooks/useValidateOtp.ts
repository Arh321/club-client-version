import { useNotify } from "@/components/notife/notife";

import { IHttpResult } from "@/types/http-result";
import {
  IAuthResult,
  onLoginWithOtp,
  onLoginWithOtpByInvoiceID,
} from "@/utils/authService";
import { setCookie } from "@/utils/common-methods/cookiesMethodes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useNavigate } from "react-router";

const useValidateOtp = (
  isWithInvoiceId: boolean,
  phone: string,
  invoiceId?: string
) => {
  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleNavigate = () => {
    const url = isWithInvoiceId ? `/?invoiceId=${invoiceId}` : "/";
    navigate(url);
  };

  const validateOtpMutation = useMutation<
    IHttpResult<IAuthResult>,
    AxiosError<IHttpResult<unknown>>,
    { otp: string },
    unknown
  >({
    mutationFn: async (data: { otp: string }) => {
      const response = isWithInvoiceId
        ? await onLoginWithOtpByInvoiceID({
            invoiceId: invoiceId,
            otp: data.otp,
          })
        : await onLoginWithOtp({ mobile: phone, otp: data.otp });
      return response;
    },
    onSuccess: (response) => {
      if (response.status) {
        setCookie("token", response.result.token, response.result.expiresIn);

        handleNavigate();
        notify("success", "موفق خوش آمدید");
      } else {
        notify("error", response.statusMessage || "کد تایید نادرست است");
      }
    },
    onError: (error) => {
      notify(
        "error",
        error.response.data.resultMessage ??
          "در ارسال کد تایید خطایی رخ داده است"
      );
    },
  });

  const handleValidateOtp = async (otp: string) => {
    validateOtpMutation.mutate({ otp });
  };

  return {
    handleValidateOtp,
    isLoading: validateOtpMutation.isPending,
  };
};

export default useValidateOtp;
