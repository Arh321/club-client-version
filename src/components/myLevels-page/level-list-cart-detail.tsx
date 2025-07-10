"use client";

import { IClubStatusNew } from "@/types/club-status";
import { Dispatch, SetStateAction } from "react";
import MemoizedCtaButton from "../shared-components/cta-button";
import AntdLazyImage from "../image-with-loader/image-with-loader";

export type LevelStatesComponentsProps = {
  status: IClubStatusNew | undefined;
  levelImege: string | undefined;
  onClose?: Dispatch<SetStateAction<boolean>>;
  levelsStatus: [string, string][];
  levelTitle?: string;
};

const LevelDetailPopUp: React.FC<LevelStatesComponentsProps> = ({
  status,
  levelImege,
  onClose,
  levelTitle,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 grow pt-[10px] pb-[20px] px-4 rounded-[6px] relative animate-fadeIn">
      {onClose && (
        <MemoizedCtaButton className="absolute !bg-transparent  top-4 left-6 z-10 text-primary">
          <i className="pi pi-times" style={{ fontSize: "1rem" }}></i>
        </MemoizedCtaButton>
      )}
      <p className="regular-16 w-full flex flex-col gap-2 items-center relative">
        <AntdLazyImage
          src={"https://hubapi.loyaltyhub.ir" + levelImege}
          width={100}
          height={100}
          alt={levelTitle ?? "Next"}
          className={"!size-[100px] [&_img]:!object-contain"}
        />
      </p>

      <p className="font-Regular text-center">{status.description}</p>
      <span className="w-max py-1 font-Bold text-lg px-3 flex items-center gap-1 text-primary ">
        <span>:مزایا و هدایای این سطح</span>
        <i className="pi pi-gift"></i>
      </span>
      <ul dir="rtl" className="px-4">
        {status.levelBenefits.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                listStyle: "outside",
              }}
              className="font-Medium"
            >
              {item.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LevelDetailPopUp;
