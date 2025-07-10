import type { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import type { IBanners } from "@/types/banners-type";

const getLandingBanners = async (): Promise<IHttpResult<IBanners[]>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IBanners[]>>(
      `${controlers.Banner}/GetBannerList`,
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

export { getLandingBanners };
