import type { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import type { ICompanySettings } from "@/types/company-setting";

const getAppSettings = async (): Promise<IHttpResult<ICompanySettings>> => {
  const response = await axiosInstance.get<IHttpResult<ICompanySettings>>(
    `${controlers.Setting}/GetSettings`
  );
  return response.data;
};

export { getAppSettings };
