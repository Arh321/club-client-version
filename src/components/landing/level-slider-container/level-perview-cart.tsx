"use client";
import { IClubStatusNew } from "@/types/club-status";
import styles from "../../../styles/ant-custom-styles.module.css";

import { FC, useState } from "react";
import { LevelState } from "@/hooks/useLevels";
import LevelStatesContainer from "./level-states/level-states.container";
import LevelPopUpDetail from "@/components/shared-components/level-detail-popup";
import AntdLazyImage from "@/components/image-with-loader/image-with-loader";

interface LevelPerviewCartProps {
  level: IClubStatusNew;
  inLevelPAge?: boolean;
  levelStatus: LevelState;
  levelsStatus: [string, string][];
  getRemainingPointsAndPercent: (level: IClubStatusNew) => [string, number];
}

const LevelPerviewCart: FC<LevelPerviewCartProps> = ({
  level,
  inLevelPAge,
  levelStatus,
  levelsStatus,
  getRemainingPointsAndPercent,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-[70%] flex flex-col items-center focus:outline-cta focus-visible:ring-2 focus-visible:ring-cta"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`level-popup-detail-${level.id}`}
        tabIndex={0}
      >
        <div className="w-[158px] flex items-center">
          <AntdLazyImage
            src={"https://hubapi.loyaltyhub.ir" + level.imageUrl}
            alt={`نشان سطح عضویت ${level.title}`}
            className="!w-full !h-[108px] [&_img]:!object-contain"
            loadingPriority={levelStatus === "Current"}
            width={158}
            height={158}
          />
        </div>

        {!inLevelPAge ? (
          <LevelStatesContainer
            styles={styles}
            levelDetails={getRemainingPointsAndPercent(level)}
            levelStatus={levelStatus}
          />
        ) : (
          <span className="min-w-[88px] bg-cta text-Highlighter font-Regular text-[14px] px-4 py-[0.3rem] rounded-[50px] text-center">
            مشاهده جزئیات
          </span>
        )}
      </button>
      <LevelPopUpDetail
        level={level}
        levelsStatus={levelsStatus}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default LevelPerviewCart;
