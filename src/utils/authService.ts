import type { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";

export interface IAuthResult {
  token: string;
  expiresIn: number;
  tokenType: string;
}

const onGetOtpByPhone = async (payLoad: {
  mobile: string;
}): Promise<IHttpResult<boolean>> => {
  const response = await axiosInstance.post<IHttpResult<boolean>>(
    `${controlers.Auth}/SendOtp`,
    payLoad
  );
  return response.data; // Return only the data part of the response
};

const onGetOtpByInvoiceId = async (payLoad: {
  invoiceId: string;
}): Promise<IHttpResult<string>> => {
  const response = await axiosInstance.post<IHttpResult<string>>(
    `${controlers.Auth}/SendOtpByInvoice`,
    payLoad
  );
  return response.data; // Return only the data part of the response
};

const onLoginWithOtp = async (payLoad: {
  mobile: string;
  otp: string;
}): Promise<IHttpResult<IAuthResult>> => {
  const response = await axiosInstance.post<IHttpResult<IAuthResult>>(
    `${controlers.Auth}/LoginWithOtp`,
    payLoad
  );
  return response.data;
};

const onLoginWithOtpByInvoiceID = async (payLoad: {
  invoiceId: string;
  otp: string;
}): Promise<IHttpResult<IAuthResult>> => {
  const response = await axiosInstance.post<IHttpResult<IAuthResult>>(
    `${controlers.Auth}/LoginWithOtpByInvoice`,
    payLoad
  );
  return response.data;
};

export {
  onGetOtpByPhone,
  onLoginWithOtp,
  onGetOtpByInvoiceId,
  onLoginWithOtpByInvoiceID,
};
