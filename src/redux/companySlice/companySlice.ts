import { ICompanyInfo } from "@/types/company-info-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICompanyInfoSlice {
  info: ICompanyInfo | undefined;
}

const initialState: ICompanyInfoSlice = {
  info: {
    backgroundDesign: "",
    companyAddress: "",
    companyEmail: "",
    companyName: "",
    companyWebSiteAddress: "",
    logoUrl: "",
    logoUrlFooter: "",
    phoneNumbers: [],
  },
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyInfo: (state, action: PayloadAction<ICompanyInfo>) => {
      state.info = action.payload;
    },
  },
});

export const { setCompanyInfo } = companySlice.actions;
export default companySlice.reducer;
