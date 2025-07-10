import type { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import type { IGiftCardLabels, IGifts } from "@/types/coupon-and-gift";

const getUserGiftCards = async (payload: {
  customerId: number;
}): Promise<IHttpResult<IGifts[]>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IGifts[]>>(
      `${controlers.GiftCard}/GetGiftCardList/${payload.customerId}`,
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

const GetGiftCardLabels = async (payload: {
  customerId: number;
}): Promise<IHttpResult<IGiftCardLabels>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IGiftCardLabels>>(
      `${controlers.GiftCard}/GetGiftCardLabels/${payload.customerId}`,
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

export { getUserGiftCards, GetGiftCardLabels };
