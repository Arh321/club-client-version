import { useNotify } from "@/components/notife/notife";
import { ICompanySettings } from "@/types/company-setting";
import { getAppSettings } from "@/utils/settingService";
import { useEffect, useState } from "react";
import useInitCompany from "./useInitCompany";
import { useMutation } from "@tanstack/react-query";
import { IHttpResult } from "@/types/http-result";
import { AxiosError } from "axios";

const useGetAppSettings = () => {
  return useMutation<
    IHttpResult<ICompanySettings>,
    AxiosError<IHttpResult<unknown>>,
    void,
    unknown
  >({
    mutationKey: ["AppSettings"],
    mutationFn: () => getAppSettings(),
  });
};

const useAppInitializer = () => {
  const [appSettings, setAppSettings] = useState<ICompanySettings>();
  const {
    mutate: onGetAppSettings,
    isPending: appSettingLoading,
    isError: appSettingError,
  } = useGetAppSettings();

  const { notify } = useNotify();

  const OnInitAppSettings = () => {
    onGetAppSettings(undefined, {
      onSuccess(data) {
        setAppSettings(data.result);
      },
      onError(error) {
        const errorRes = error.response;
        if (errorRes.data.errors) {
          Object.values(errorRes.data.errors).forEach((message) =>
            notify("error", message)
          );
        } else {
          notify(
            "error",
            errorRes.data.statusMessage || "در دریافت اطلاعات خطایی رخ داده است"
          );
        }
      },
    });
  };

  useEffect(() => {
    OnInitAppSettings();
  }, []);
  return {
    loading: appSettingLoading,
    error: appSettingError,
    appSettings,
  };
};

export default useAppInitializer;
