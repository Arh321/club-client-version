"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import SurvayQuestionCartComponent from "./survey-question-cart";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useScore from "@/hooks/useScore";
import style from "./survay-questions-slider.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { ISurveyQuestions } from "@/types/survet-types";

interface SurveyQuestionsSliderProps {
  questions: ISurveyQuestions[];
  surveyId: number;
}

const SurveyQuestionsSlider: React.FC<SurveyQuestionsSliderProps> = ({
  questions,
  surveyId,
}) => {
  const [loading, setLoading] = useState(true);

  const {
    setActiveIndex,
    setReset,
    setSlides,
    setTempSlides,
    state,
    applyLoading,
    onApplyPoints,
    loadingNavigate,
  } = useScore(questions);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const navigate = useRouter();

  // Handle loading state
  useEffect(() => {
    navigate.prefetch("/");

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle slide submission

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!swiperInstance) return;
    onApplyPoints(
      state.tempSlides[state.activeIndex],
      surveyId,
      swiperInstance
    );
    setReset(false);
  }, [swiperInstance, state, setSlides, setReset]);

  const handlePrev = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
      setReset(true);
    }
  }, [swiperInstance, setReset]);

  if (loading) {
    return (
      <div className="w-full flex justify-center gap-[10px] p-[20px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton.Node
            key={index}
            className="!flex !w-[370px] aspect-[2/3] !h-auto"
            active
          />
        ))}
      </div>
    );
  }

  return (
    <div dir="ltr" className="w-full grow relative pt-[10px] animate-fadeIn">
      <Swiper
        slidesPerView={1.3}
        centeredSlides
        pagination
        spaceBetween={10}
        speed={500}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Pagination]}
        className={clsx(style["survey-swiper"])}
      >
        {state.slides.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col gap-[8px]">
            <SurvayQuestionCartComponent
              imageUrl={item.imageUrl}
              title={item.title}
              score={item.givenPoint}
              index={item.id}
              setTempSlides={setTempSlides}
              tempSlides={state.tempSlides}
              reset={state.reset}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full flex flex-col gap-[20px]">
        <div
          className={clsx(
            "w-full flex gap-[10px] items-center px-4 pt-1",
            state.activeIndex === 0 ? "justify-center" : "justify-between"
          )}
        >
          <button
            disabled={applyLoading || loadingNavigate}
            onClick={handlePrev}
            className={clsx(
              "font-Medium bg-Highlighter text-cta p-2 text-lg rounded-lg w-[200px]",
              state.activeIndex === 0 && "hidden"
            )}
          >
            قبلی
          </button>
          <button
            disabled={applyLoading || loadingNavigate}
            onClick={handleNext}
            className=" font-Medium bg-cta text-Highlighter p-2 text-lg rounded-lg w-[284px]"
          >
            {(applyLoading || loadingNavigate) && <LoadingOutlined />}
            {state.activeIndex === state.slides.length - 1
              ? "ثبت و پایان"
              : "ثبت و بعدی"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestionsSlider;
