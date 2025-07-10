import { useMutation } from "@tanstack/react-query";
import { getInvoiceById } from "../utils/invoiceService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileSliceType } from "@/redux/profile/profileSlice";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { IInvoiceDetail } from "@/types/invoice";
import { IHttpResult } from "@/types/http-result";
import { AxiosError } from "axios";
import { useNotify } from "@/components/notife/notife";
import { safeDownloadToPdf } from "@/utils/common-methods/downloadToPdfWrapper";

const useGetInvoiceDetail = () => {
  return useMutation<
    IHttpResult<IInvoiceDetail>,
    AxiosError<IHttpResult<unknown>>,
    { invoiceId: string }
  >({
    mutationKey: ["GetInvoiceDetail"],
    mutationFn: (payLoad: { invoiceId: string }) => getInvoiceById(payLoad),
  });
};

const useInvoiceDetail = (
  transactionID?: string,
  onClose?: Dispatch<SetStateAction<boolean>>,
  invoiceDetail?: IInvoiceDetail
) => {
  const { info } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  const {
    mutate: getInvoice,
    isPending,
    isError,
    reset,
    data,
  } = useGetInvoiceDetail();
  const { notify } = useNotify();
  const onLoadSearchedInvoice = useCallback(async () => {
    getInvoice(
      { invoiceId: transactionID },
      {
        onError(error) {
          notify(
            "error",
            error.response.data.statusMessage || "خطا در دریافت فاکتور"
          );
        },
      }
    );
  }, [transactionID, onClose]);

  useEffect(() => {
    if (!invoiceDetail) {
      onLoadSearchedInvoice();
    }
  }, [transactionID]);

  const invoice = useMemo(() => {
    if (invoiceDetail) return invoiceDetail;
    const res = data?.result;
    return res;
  }, [invoiceDetail, data]);

  const downloadPdfDocument = async () => {
    await safeDownloadToPdf("testId", `فاکتور ${invoice.id}`);
  };

  const print = () => window.print();
  return {
    invoice,
    downloadPdfDocument,
    print,
    isPending,
    isError,
    reset,
    info,
  };
};

export default useInvoiceDetail;
