"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import DotsLoading from "@/components/shared-components/dots-loader";
import AntdLazyImage from "@/components/image-with-loader/image-with-loader";
const AppLoading = () => {
  const [logo] = useLocalStorage("logo", "", true);

  return (
    <div className="w-full h-dvh bg-BG fixed top-0 z-[99999999] max-w-[470px] mx-auto left-0 right-0 flex flex-col items-center justify-center gap-4 ">
      {logo && (
        <div className="w-full flex flex-col gap-4 items-center animate-flicker ">
          <AntdLazyImage
            src={logo}
            alt="برادران حسینی"
            className=""
            width={200}
            height={200}
          />
        </div>
      )}
      <DotsLoading />
    </div>
  );
};

export default AppLoading;
