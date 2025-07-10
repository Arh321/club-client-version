"use client";
import { memo } from "react";
import SmartBackground from "../../shared-components/smart-background";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SideBarFooter = () => {
  const { info } = useSelector((state: RootState) => state.companySlice);
  return (
    <SmartBackground
      style={{
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
      }}
      externalUrl={
        info ? "https://hubapi.loyaltyhub.ir" + info["Background-design"] : ""
      }
      fallbackUrl={"/images/bg-art.webp"}
      className="absolute bottom-0 right-0 left-0 mx-auto w-full h-[250px]"
    >
      <div
        style={{
          background:
            "linear-gradient(165deg,#fff 20%, rgba(255,255,255,0.5) 80%)",
        }}
        className="w-full h-full flex items-end pb-12"
      >
        <div
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderImage:
              "linear-gradient(to right, transparent, rgb(255,255,255,0.5),transparent) 1",
          }}
          className="w-full font-Regular text-cta flex flex-col gap-2 backdrop-blur-md items-center justify-center "
        >
          <span>طراحی و تولید توسط</span>
          <span
            style={{
              letterSpacing: "4px",
            }}
          >
            LoyalityHub.ir
          </span>
        </div>
      </div>
    </SmartBackground>
  );
};

const MemoizedSideBarFooter = memo(SideBarFooter);

export default MemoizedSideBarFooter;
