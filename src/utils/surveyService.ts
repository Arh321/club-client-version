import type { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import type {
  IApplySurveyPoint,
  IConfirmSurveyPoints,
  ISurveyInfo,
} from "@/types/survet-types";

const getSurveyInfoByInvoiceId = async (payload: {
  invoiceId: string;
}): Promise<IHttpResult<ISurveyInfo>> => {
  const response = await axiosInstance.get<IHttpResult<ISurveyInfo>>(
    `${controlers.Survey}/GetDefaultInvoiceSurvey/${payload.invoiceId}`,
    { headers: { auth: true } }
  );
  return response.data;
};

const applyAnswerToSurveyInvoice = async (
  payload: IApplySurveyPoint
): Promise<IHttpResult<boolean>> => {
  const response = await axiosInstance.post<IHttpResult<boolean>>(
    `${controlers.Survey}/ApplyAnswerToSurveyInvoice/`,
    payload,
    { headers: { auth: true } }
  );
  return response.data;
};

const applyCompletedSurveyInvoice = async (
  payload: IConfirmSurveyPoints
): Promise<IHttpResult<boolean>> => {
  const response = await axiosInstance.post<IHttpResult<boolean>>(
    `${controlers.Survey}/ApplyCompletedSurveyInvoice`,
    payload,
    { headers: { auth: true } }
  );
  return response.data;
};

export {
  getSurveyInfoByInvoiceId,
  applyAnswerToSurveyInvoice,
  applyCompletedSurveyInvoice,
};
