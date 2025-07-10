"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./level-slider.module.css";
import clsx from "clsx";
import { Skeleton } from "antd";
import LevelPerviewCart from "./level-perview-cart";
import useLevels from "@/hooks/useLevels";
import { memo, useMemo } from "react";

const LevelsSlider = () => {
  const {
    error,
    loading,
    getLevelStates,
    getRemainingPointsAndPercent,
    levels,
  } = useLevels();
  const levelStates = useMemo(
    () => getLevelStates(levels),
    [levels, getLevelStates]
  );
  if (loading)
    return (
      <div className="w-2/3 mx-auto flex justify-center">
        <Skeleton.Node className="!flex !w-full !h-full aspect-square" active />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!loading && levels.length > 0)
    return (
      <div dir="ltr" className="w-full h-full relative ">
        <Swiper
          slidesPerView={1}
          pagination={true}
          navigation={true}
          modules={[Navigation, Pagination]}
          className={clsx(style["LevelsSlider-swiper"])}
        >
          {levels.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="w-full flex justify-center items-center "
              >
                <LevelPerviewCart
                  level={item}
                  getRemainingPointsAndPercent={getRemainingPointsAndPercent}
                  levelStatus={getLevelStates(levels)[item.id]}
                  levelsStatus={Object.entries(levelStates)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
};

const MemoizedLevelsSlider = memo(LevelsSlider);

export default MemoizedLevelsSlider;
