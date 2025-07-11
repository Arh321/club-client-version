import { useNotify } from "@/components/notife/notife";
import { IApplySurveyPoint, ISurveyQuestions } from "@/types/survet-types";
import { applyAnswerToSurveyInvoice } from "@/utils/surveyService";

import { useCallback, useReducer, useState } from "react";
import { Swiper } from "swiper/types";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";

export interface SurveySlide {
  id: number;
  mediuUrl: string;
  question: string;
  score: number;
}

interface State {
  activeIndex: number;

  reset: boolean;
  slides: ISurveyQuestions[];
  tempSlides: ISurveyQuestions[];
}

type Action =
  | { type: "SET_SLIDES"; payload: ISurveyQuestions[] }
  | { type: "SET_TEMP_SLIDES"; payload: ISurveyQuestions[] }
  | { type: "SET_ACTIVE_INDEX"; payload: number }
  | { type: "SET_RESET"; payload: boolean }
  | { type: "NEXT_SLIDE" }
  | { type: "PREV_SLIDE" };

const initialState: State = {
  activeIndex: 0,
  reset: false,
  slides: [],
  tempSlides: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SLIDES":
      return { ...state, slides: action.payload };
    case "SET_TEMP_SLIDES":
      return { ...state, tempSlides: action.payload };
    case "SET_ACTIVE_INDEX":
      return { ...state, activeIndex: action.payload };
    case "SET_RESET":
      return { ...state, reset: action.payload };

    default:
      return state;
  }
};
const useApplyAnswerToSurvey = () => {
  return useMutation({
    mutationFn: (payload: IApplySurveyPoint) =>
      applyAnswerToSurveyInvoice(payload),
  });
};

const useScore = (initialSlides: ISurveyQuestions[]) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    slides: initialSlides,
    tempSlides: initialSlides,
  });

  const [loadingNavigate, setLoadingNAvigate] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { notify } = useNotify();
  const invoiceId = searchParams.get("invoiceId");

  const setSlides = (slides: ISurveyQuestions[]) =>
    dispatch({ type: "SET_SLIDES", payload: slides });

  const setTempSlides = (slides: ISurveyQuestions[]) =>
    dispatch({ type: "SET_TEMP_SLIDES", payload: slides });

  const setActiveIndex = (index: number) =>
    dispatch({ type: "SET_ACTIVE_INDEX", payload: index });

  const setReset = (reset: boolean) =>
    dispatch({ type: "SET_RESET", payload: reset });

  const { mutate: applyAnswer, isPending } = useApplyAnswerToSurvey();

  const onApplyPoints = (
    question: ISurveyQuestions,
    surveyId: number,
    swiperInstance: Swiper
  ) => {
    const givenPoint = question.givenPoint;

    const payload: IApplySurveyPoint = {
      givenPoint,
      invoiceId,
      surveyDetailId: question.id,
      surveyId,
    };

    if (givenPoint > 0) {
      applyAnswer(payload, {
        onSuccess: (response) => {
          if (response.status) {
            notify("success", response.statusMessage);
            setSlides(state.tempSlides); // 🧠 این احتمالا اسلایدهایی هستن که نیاز داری بعد از ثبت برگردونی
            swiperInstance.slideNext();

            if (state.activeIndex === state.slides.length - 1) {
              handleSubmitSurvey(surveyId.toString());
            }
          } else {
            notify("error", response.statusMessage || "خطا در ثبت پاسخ");
          }
        },
        onError: () => {
          notify("error", "خطا در ثبت پاسخ");
        },
      });
    } else {
      swiperInstance.slideNext();
      if (state.activeIndex === state.slides.length - 1) {
        handleSubmitSurvey(surveyId.toString());
      }
    }
  };

  const handleSubmitSurvey = useCallback(
    (surveyId: string) => {
      setLoadingNAvigate(true);

      const average = state.slides.reduce(
        (prev, curr) => prev + curr.givenPoint,
        0
      );
      const query = new URLSearchParams({
        average: (average / state.slides.length).toFixed(1),
        survey: "done",
        surveyId,
        invoiceId,
      }).toString();
      setTimeout(() => {
        navigate(`/?${query}`);
        setLoadingNAvigate(false);
      }, 750);
    },
    [state.slides, navigate]
  );

  return {
    state,
    applyLoading: isPending,
    setSlides,
    setTempSlides,
    setActiveIndex,
    setReset,
    onApplyPoints,
    loadingNavigate,
  };
};

export default useScore;
