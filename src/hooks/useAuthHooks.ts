import { useMutation } from "@tanstack/react-query";
import { getInvoiceById, validateInvoiceById } from "@/utils/invoiceService";
import { IHttpResult } from "@/types/http-result";
import { IInvoiceDetail, IInvoiceId } from "@/types/invoice";
import { AxiosError } from "axios";
import { IProfileInfo } from "@/types/profile";
import { getProfile } from "@/utils/userServise";

const useInvoiceById = () =>
  useMutation<
    IHttpResult<IInvoiceDetail>,
    AxiosError<IHttpResult<unknown>>,
    { invoiceId: string }
  >({
    mutationKey: ["GetInvoiceById"],
    mutationFn: getInvoiceById,
  });

const useValidateInvoiceId = () =>
  useMutation<
    IHttpResult<IInvoiceId>,
    AxiosError<IHttpResult<unknown>>,
    { invoiceId: string }
  >({
    mutationKey: ["validateInvoiceById"],
    mutationFn: validateInvoiceById,
  });

const useGetProfile = () =>
  useMutation<
    IHttpResult<IProfileInfo>,
    AxiosError<IHttpResult<unknown>>,
    void
  >({
    mutationKey: ["GetProfile"],
    mutationFn: getProfile,
  });

export { useInvoiceById, useValidateInvoiceId, useGetProfile };
