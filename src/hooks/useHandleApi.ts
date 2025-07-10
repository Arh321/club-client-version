import { useNotify } from "@/components/notife/notife";

interface NotifyOptions<T> {
  response: T;
  successMsg?: string;
  errorMsg?: string;
  onSuccess?: (res: T) => void;
  onError?: (res: T) => void;
  setShowInvoice?: (value: boolean) => void;
}

export function useHandleApi<
  T extends { status?: boolean; statusMessage?: string }
>() {
  const { notify } = useNotify();

  const handleResponse = ({
    response,
    successMsg,
    errorMsg,
    onSuccess,
    onError,
    setShowInvoice,
  }: NotifyOptions<T>) => {
    if (response?.status) {
      notify(
        "success",
        successMsg ?? response.statusMessage ?? "عملیات موفق بود"
      );
      setShowInvoice?.(true);
      onSuccess?.(response);
    } else {
      notify(
        "error",
        errorMsg ?? response.statusMessage ?? "عملیات ناموفق بود"
      );
      setShowInvoice?.(false);
      onError?.(response);
    }
  };

  const handleError = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    fallbackMessage = "خطایی رخ داده است",
    setShowInvoice?: (value: boolean) => void
  ) => {
    const msg =
      error?.response?.data?.resultMessage ?? error?.message ?? fallbackMessage;

    notify("error", msg);
    setShowInvoice?.(false);
  };

  return {
    handleResponse,
    handleError,
  };
}
