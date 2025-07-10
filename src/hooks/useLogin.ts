import { useNotify } from "@/components/notife/notife";
import { IHttpResult } from "@/types/http-result";
import { onGetOtpByInvoiceId, onGetOtpByPhone } from "@/utils/authService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Common mutation options for OTP handling
const OTP_MUTATION_OPTIONS = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (notify: any, errorMessage?: string) => () =>
    notify("error", errorMessage ?? "خطا در ارسال کد تایید"),
  handleSuccess:
    (notify: any, setActiveStep: any, setPhone?: any, navigate?: any) =>
    (data: any) => {
      if (data.status) {
        notify("success", "کد تایید با موفقیت ارسال شد");
        if (navigate && data?.statusCode == 404) {
          navigate.push("/login");
          return;
        }
        setActiveStep(1);
        setPhone?.(data.result);
      } else {
        notify("error", data.statusMessage || "خطا در ارسال کد تایید");
      }
    },
};

// Consolidated OTP mutation hooks
const useOtpMutations = () => {
  const phoneOtp = useMutation<
    IHttpResult<boolean>,
    AxiosError<IHttpResult<unknown>>,
    {
      mobile: string;
    },
    unknown
  >({
    mutationKey: ["GetOtpByPhone"],
    mutationFn: (payload: { mobile: string }) => onGetOtpByPhone(payload),
  });

  const invoiceOtp = useMutation<
    IHttpResult<string>,
    AxiosError<IHttpResult<unknown>>,
    {
      invoiceId: string;
    },
    unknown
  >({
    mutationKey: ["GetOtpByInvoiceId"],
    mutationFn: (payload: { invoiceId: string }) =>
      onGetOtpByInvoiceId(payload),
  });

  return { phoneOtp, invoiceOtp };
};

const useLoginHandlers = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [backUrl, setBackUrl] = useState<string | null>(null);
  const { notify } = useNotify();
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const { phoneOtp, invoiceOtp } = useOtpMutations();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBackUrl(searchParams.get("backUrl"));
    }
  }, [searchParams]);

  const handleSendOtp = () => {
    phoneOtp.mutate(
      { mobile: phone },
      {
        onSuccess: OTP_MUTATION_OPTIONS.handleSuccess(notify, setActiveStep),
        onError: (error) => {
          const message = error.response.data.resultMessage;
          OTP_MUTATION_OPTIONS.onError(notify, message);
        },
      }
    );
  };

  const handleSendOtpByInvoiceId = () => {
    invoiceOtp.mutate(
      { invoiceId: backUrl },
      {
        onSuccess: OTP_MUTATION_OPTIONS.handleSuccess(
          notify,
          setActiveStep,
          setPhone
        ),
        onError: (error) => {
          const message = error.response.data.resultMessage;
          notify(
            "error",
            error?.response?.data?.resultMessage ?? "خطا در ارسال کد تایید"
          );
          if (error?.response?.data?.statusCode == 404) {
            navigate.push("/login");
          }
        },
      }
    );
  };

  return {
    activeStep,
    setActiveStep,
    handleSendOtp,
    handleSendOtpByInvoiceId,
    otpLoading: phoneOtp.isPending || invoiceOtp.isPending,
    otpError: phoneOtp.isError || invoiceOtp.isError,
    backUrl,
    phone,
    setPhone,
  };
};

export default useLoginHandlers;
