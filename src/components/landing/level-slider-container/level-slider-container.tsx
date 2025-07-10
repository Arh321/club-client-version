"use client";
// import border from "../../../public/images/level-custom-border.webp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileSliceType } from "@/redux/profile/profileSlice";
import { MemoizedLevelsSliderLazy } from "./level-slider-lazy";
import Image from "next/image";

const CurrentLevelSliderContainer = () => {
  const { info, loadingProfile } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  return (
    <div className="w-full px-[25px]">
      <div className="w-full aspect-[8/6] relative sm:px-5 lsm:px-6 sm:pt-4  lsm:pt-4 flex flex-col justify-end">
        <div className="w-full h-full absolute top-0 right-1/2 translate-x-1/2 z-0 flex items-center justify-center">
          <Image
            src={"/images/level-custom-border.webp"}
            className="!w-full !h-full !object-contain"
            width={300}
            height={300}
            alt="border"
            fetchPriority="high"
            loading="eager"
          />
        </div>
        <div className="w-full flex flex-col pt-4 gap-0 items-center justify-center aspect-square rounded-t-full bg-Highlighter z-[1] shadow-lg rounded-b-[999px] overflow-hidden">
          {info && (
            <p className="font-Regular text-sm text-Primary">
              <span>
                {info.mandatory.firstName} {info.mandatory.lastName}
              </span>
            </p>
          )}
          <div className="w-full aspect-[16/5]">
            <MemoizedLevelsSliderLazy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentLevelSliderContainer;
