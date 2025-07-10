"use client";

import PagesContainer from "@/components/pages-container/pages-container";
import border from "@/public/images/level-custom-border.webp";
import Image from "next/image";
import { lazy, Suspense, useMemo } from "react";
import { Skeleton } from "antd";
import LevelsPageSkelton from "@/components/myLevels-page/levels-page-skeleton";
import useLevels from "@/hooks/useLevels";

// Lazy load components
const LevelPerviewCart = lazy(
  () => import("@/components/landing/level-slider-container/level-perview-cart")
);
const LevelsLostContainer = lazy(
  () => import("@/components/myLevels-page/llevels-list-container")
);

export default function InvoicesPage() {
  const {
    error,
    loading,
    getLevelStates,
    getRemainingPointsAndPercent,
    levels,
    info,
  } = useLevels();
  // Ensure hooks are called at the top level
  const levelStates = useMemo(
    () => getLevelStates(levels),
    [levels, getLevelStates]
  );

  const currentLevel = useMemo(
    () => levels.find((level) => levelStates[level.id] === "Current"),
    [levels, levelStates]
  );

  const nextLevel = useMemo(
    () => levels.find((level) => levelStates[level.id] === "Next"),
    [levels, levelStates]
  );
  if (loading)
    return (
      <PagesContainer>
        <div className="w-full h-full overflow-y-auto pt-4 gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]">
          <LevelsPageSkelton />
        </div>
      </PagesContainer>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <PagesContainer>
      <div className="w-full h-full overflow-y-auto pt-4 gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]">
        {/* Profile Card */}
        <div className="w-3/4 aspect-[8/6] relative sm:px-5 sm:pt-3 lsm:px-4 lsm:pt-3 flex flex-col justify-end mx-auto animate-fadeIn">
          <Image
            src={border}
            className="absolute top-0 right-0 w-full z-0"
            alt="border"
          />
          <div className="w-full flex flex-col pt-4 gap-0 items-center justify-center aspect-square rounded-t-full bg-Highlighter z-10 shadow-lg rounded-b-[999px] overflow-hidden">
            <p className="font-Regular text-sm text-Primary">
              {info?.mandatory?.firstName} {info?.mandatory?.lastName}
            </p>
            <Suspense
              fallback={
                <Skeleton.Node
                  className="!w-full !h-full aspect-[3/2]"
                  active
                />
              }
            >
              {currentLevel && (
                <LevelPerviewCart
                  level={currentLevel}
                  getRemainingPointsAndPercent={getRemainingPointsAndPercent}
                  levelStatus={levelStates[currentLevel.id]}
                  inLevelPAge={true}
                  levelsStatus={Object.entries(levelStates)}
                />
              )}
            </Suspense>
          </div>
        </div>

        {/* Next Level Remaining Points */}
        {nextLevel && (
          <div className="w-full flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-transparent via-white to-transparent border-2 border-transparent border-t-white/50 border-b-white/50 backdrop-blur-md text-center p-3 rounded-md">
            <span className="font-Regular">تا فعال شدن سطح بعدی</span>
            <span className=" text-lg text-cta border border-cta rounded-full px-6 font-Medium flex items-center gap-2">
              <span className="text-sm">امتیاز مانده</span>
              {getRemainingPointsAndPercent(nextLevel)[1]}
            </span>
          </div>
        )}

        {/* Levels List */}
        <Suspense fallback={<LevelsPageSkelton />}>
          <LevelsLostContainer
            levels={levels.filter((level) => level.id !== currentLevel?.id)}
            levelsStatus={Object.entries(levelStates)}
            getRemainingPointsAndPercent={getRemainingPointsAndPercent}
          />
        </Suspense>
      </div>
    </PagesContainer>
  );
}
