import { IProfileInfo } from "@/types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const convertMinuteToDate = (expirationMinutes: number) => {
  return new Date(Date.now() + expirationMinutes * 60 * 1000);
};
export interface ProfileSliceType {
  info: IProfileInfo | undefined;
  customerToken: unknown;
  hasToken: boolean;
  loadingProfile: boolean;
  customerId: number;
}

const initialState: ProfileSliceType = {
  info: undefined,
  customerToken: "",
  hasToken: false,
  loadingProfile: false,
  customerId: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    onSetToken: (
      state,
      payload: PayloadAction<{
        token: string;
        expireMinute: number;
      }>
    ) => {
      state.customerToken = payload.payload.token;
      cookies.set("token", payload.payload.token, {
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: convertMinuteToDate(payload.payload.expireMinute),
      });
      state.hasToken = true;
    },
    // onProfileCompleteDialog: (state) => {
    //   state.profileCompleteDialog = !state.profileCompleteDialog;
    // },
    onCheckHasToken: (state) => {
      const token = cookies.get("token");
      if (!!token) {
        state.customerToken = token;
        state.hasToken = true;
      } else {
        state.hasToken = false;
      }
    },

    onLogOut: (state) => {
      cookies.remove("token", {
        path: "/",
      });
      state.hasToken = false;
    },
    onSetProfile: (state, payload: PayloadAction<IProfileInfo>) => {
      state.info = payload.payload;
    },
    onLoadingProfile: (state, payload: PayloadAction<boolean>) => {
      state.loadingProfile = payload.payload;
    },
    onSetCustomerID: (state, payload: PayloadAction<number>) => {
      state.customerId = payload.payload;
    },
  },
});

export const {
  onSetToken,
  onCheckHasToken,
  onLogOut,
  onSetProfile,
  onLoadingProfile,
  onSetCustomerID,

  // onCheckProfile,

  // onProfileCompleteDialog,
} = profileSlice.actions;

export default profileSlice.reducer;
