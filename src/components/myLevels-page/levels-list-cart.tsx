"use client";
import { IClubStatusNew } from "@/types/club-status";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import BronzeLevel from "@/publicimages/image 1372.png";
import GoldLevel from "@/publicimages/goldPeste.png";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { CloseOutlined } from "@ant-design/icons";
import LevelDetailPopUp from "./level-list-cart-detail";
import style from "./levels-list-style.module.css";
import LevelDetailBenefitsModal from "./levelListCartModalComponents/level-datail-benefits";
interface LevelsListCartProps {
  level: IClubStatusNew;
  levelsStatus: [string, string][];
  getRemainingPointsAndPercent: (level: IClubStatusNew) => [string, number];
}

const LevelsListCart: React.FC<LevelsListCartProps> = ({
  level,
  levelsStatus,
  getRemainingPointsAndPercent,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (open) {
        handleCancel(); // Close the modal
        event.preventDefault(); // Prevent the default back behavior
        window.history.pushState(null, ""); // Push state to avoid exiting the page
      }
    };

    if (open) {
      window.history.pushState(null, ""); // Push a new state to the history stack
      window.addEventListener("popstate", handlePopState); // Listen for the back button
    }

    return () => {
      window.removeEventListener("popstate", handlePopState); // Cleanup the event listener
    };
  }, [open]);
  return (
    <div
      dir="rtl"
      className={clsx(
        style["animate-glow"],
        "w-full rounded-[10px] aspect-[16/7] shadow bg-white"
      )}
      style={{
        boxShadow: "0 0 10px -1px rgba(30,156,81,0.5)",
      }}
    >
      <div
        onClick={() => setOpen(true)}
        className="w-full h-full flex flex-col justify-between pt-[20px]"
      >
        <div className="w-full flex items-center justify-between pr-[14px]">
          <span className="text-cta font-Medium text-xl">{level.title}</span>
          <span
            className={clsx(
              "w-[74px] h-[34px] flex items-center rounded-r-[50px] border-r border-y pr-[10px]",
              levelsStatus.find((item) => +item[0] == level.id)[1] == "Done"
                ? "border-cta"
                : "border-Alert"
            )}
          >
            {levelsStatus.find((item) => +item[0] == level.id)[1] == "Done" ? (
              <Icon
                icon="simple-line-icons:check"
                width="24"
                height="24"
                style={{ color: "var(--Secondary2)" }}
              />
            ) : (
              <Icon
                icon="lets-icons:lock-light"
                width="28"
                height="28"
                style={{ color: "var(--Alert)" }}
              />
            )}
          </span>
        </div>
        <div className="w-full flex justify-center">
          <div
            className={clsx(
              "w-[132px] h-[66px] rounded-t-full bg-Highlighter  border-x border-t flex items-end justify-center",
              levelsStatus.find((item) => +item[0] == level.id)[1] == "Done"
                ? "border-cta"
                : "border-Alert"
            )}
          >
            <div
              style={{
                background: `linear-gradient(to top, ${
                  levelsStatus.find((item) => +item[0] == level.id)[1] == "Done"
                    ? "var(--Secondary2)"
                    : "#FF0004"
                }, transparent)`,
              }}
              className="w-[120px] h-[60px]  rounded-t-full relative"
            >
              <div className="absolute bottom-full translate-y-1/2 left-0 right-0 mx-auto w-max">
                {levelsStatus.find((item) => +item[0] == level.id)[1] ==
                  "Next" && (
                  <Image src={GoldLevel} width={60} height={60} alt="Next" />
                )}
                {levelsStatus.find((item) => +item[0] == level.id)[1] ==
                  "Done" && (
                  <Image src={BronzeLevel} width={60} height={60} alt="Next" />
                )}
              </div>
              {levelsStatus.find((item) => +item[0] == level.id)[1] ==
                "Next" && (
                <span
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                  className="w-[34px] h-[34px] bg-Highlighter text-Alert rounded-full p-2 text-sm font-Bold flex justify-center items-center absolute top-0 left-0 right-0 mx-auto translate-y-1/2 "
                >
                  {getRemainingPointsAndPercent(level)[0]}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <LevelDetailBenefitsModal
        handleCancel={handleCancel}
        level={level}
        levelsStatus={levelsStatus}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default LevelsListCart;
