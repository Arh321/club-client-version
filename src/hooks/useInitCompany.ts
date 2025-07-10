import { useNotify } from "@/components/notife/notife";
import { setCompanyInfo } from "@/redux/companySlice/companySlice";
import { CompanyColors, ICompanyInfo } from "@/types/company-info-type";
import { IHttpResult } from "@/types/http-result";
import { getCompanyInfo } from "@/utils/companyInfoService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const STORAGE_KEY = "companyInfo";

const useGetCompanyInfo = () => {
  return useMutation<IHttpResult<ICompanyInfo>, AxiosError, void, unknown>({
    mutationKey: ["CompanyInfo"],
    mutationFn: () => getCompanyInfo(),
  });
};

const useInitCompany = () => {
  const { mutate: getCoInfo, isPending, isError } = useGetCompanyInfo();
  const dispatch = useDispatch();
  const { notify } = useNotify();

  const handleSetTheme = useCallback((theme: CompanyColors) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, []);

  const saveToLocalStorage = (data: ICompanyInfo) => {
    const storageData = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    localStorage.setItem("logo", data.logoUrl);
  };

  const getFromLocalStorage = (): {
    data: ICompanyInfo;
    isValid: boolean;
  } | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const { data, timestamp } = JSON.parse(stored);
    const now = new Date().getTime();
    const isValid = now - timestamp < CACHE_DURATION;

    return { data, isValid };
  };

  const handleGetCompanyInfo = useCallback(() => {
    const storedData = getFromLocalStorage();

    if (storedData && storedData.isValid) {
      // Use cached data if it's still valid
      dispatch(setCompanyInfo(storedData.data));
      handleSetTheme(storedData.data.colors);
      return;
    }

    // Fetch new data if cache is invalid or doesn't exist
    getCoInfo(undefined, {
      onSuccess(data) {
        const res = data?.result;
        if (res) {
          dispatch(setCompanyInfo(res));
          handleSetTheme(res.colors);
          saveToLocalStorage(res);
        }
      },
      onError(error) {
        notify("error", `خطا در دریافت اطلاعات مجموعه ${error.message}`);
      },
    });
  }, []);

  useEffect(() => {
    handleGetCompanyInfo();
  }, []);

  return {
    handleGetCompanyInfo,
    loadingCompanyInfo: isPending,
    errorCompanyInfo: isError,
  };
};

export default useInitCompany;
