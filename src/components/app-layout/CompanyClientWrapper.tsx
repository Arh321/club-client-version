// components/company-wrapper.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanyInfo } from "@/redux/companySlice/companySlice";
import { ICompanyInfo } from "@/types/company-info-type";

export default function CompanyClientWrapper({
  children,
  companyInfo,
}: {
  children: React.ReactNode;
  companyInfo: ICompanyInfo;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCompanyInfo(companyInfo));

    // theme setup
    const root = document.documentElement;
    Object.entries(companyInfo.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // localStorage cache
    localStorage.setItem(
      "companyInfo",
      JSON.stringify({ data: companyInfo, timestamp: Date.now() })
    );
    localStorage.setItem("logo", companyInfo.logoUrl);
  }, [companyInfo]);

  return <>{children}</>;
}
