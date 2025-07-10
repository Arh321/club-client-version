import type { IHttpResult } from "@/types/http-result";
import type { IProfileInfo, IUpdateProfilePayload } from "@/types/profile";
import axiosInstance, { controlers } from "./apiConfig";

const getProfile = async (): Promise<IHttpResult<IProfileInfo>> => {
  const response = await axiosInstance.get<IHttpResult<IProfileInfo>>(
    `${controlers.EndUser}/GetProfile`,
    { headers: { auth: true } }
  );
  return response.data;
};
const updateProfile = async (
  payload: IUpdateProfilePayload
): Promise<IHttpResult<IProfileInfo>> => {
  const response = await axiosInstance.post<IHttpResult<IProfileInfo>>(
    `${controlers.EndUser}/UpdateProfile`,
    payload,
    { headers: { auth: true } }
  );
  return response.data;
};

export { getProfile, updateProfile };
