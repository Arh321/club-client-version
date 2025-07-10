import type { IHttpResult } from "@/types/http-result";

import axiosInstance, { controlers } from "./apiConfig";
import type { IClubStatusNew, IPreviewLevels } from "@/types/club-status";

const getLevelsPreview = async (): Promise<IHttpResult<IPreviewLevels[]>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IPreviewLevels[]>>(
      `${controlers.Ranking}/GetRankingList`,
      { headers: { auth: true } }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error(
      "Failed to send OTP. Please check the mobile number and try again."
    );
  }
};

const getLevelList = async (payload: {
  rankingId: string;
}): Promise<IHttpResult<IClubStatusNew[]>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IClubStatusNew[]>>(
      `${controlers.Level}/GetLevelList/${payload.rankingId}`,
      { headers: { auth: true } }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error(
      "Failed to send OTP. Please check the mobile number and try again."
    );
  }
};

export { getLevelsPreview, getLevelList };
