import { useNotify } from "@/components/notife/notife";
import { IApplySurveyPoint, ISurveyQuestions } from "@/types/survet-types";
import { applyAnswerToSurveyInvoice } from "@/utils/surveyService";
import { StaticImageData } from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useReducer, useState } from "react";
import { Swiper } from "swiper/types";

export interface SurveySlide {
  id: number;
  mediuUrl: StaticImageData | string;
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

const useScore = (initialSlides: ISurveyQuestions[]) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    slides: initialSlides,
    tempSlides: initialSlides,
  });
  const [applyLoading, setApplyLoading] = useState<boolean>(false);
  const [loadingNavigate, setLoadingNAvigate] = useState(false);
  const navigate = useRouter();
  const searchParams = useSearchParams();
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

  const onApplyPoints = async (
    question: ISurveyQuestions,
    surveyId: number,
    swiperInstance: Swiper
  ) => {
    setApplyLoading(true);
    const payload: IApplySurveyPoint = {
      givenPoint: question.givenPoint,
      invoiceId: invoiceId,
      surveyDetailId: question.id,
      surveyId,
    };
    if (question.givenPoint > 0) {
      try {
        const response = await applyAnswerToSurveyInvoice(payload);
        if (response.status) {
          notify("success", response.statusMessage);
          setSlides(state.tempSlides);
          swiperInstance.slideNext();

          if (state.activeIndex === state.slides.length - 1) {
            handleSubmitSurvey(surveyId.toString());
          }
        } else {
          notify("error", response.statusMessage || "خطا در ثبت پاسخ");
        }
      } catch (error) {
        notify("error", "خطا در ثبت پاسخ");
      } finally {
        setApplyLoading(false);
      }
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
        navigate.push(`/?${query}`);
        setLoadingNAvigate(false);
      }, 750);
    },
    [state.slides, navigate]
  );

  return {
    state,
    applyLoading,
    setSlides,
    setTempSlides,
    setActiveIndex,
    setReset,
    onApplyPoints,
    loadingNavigate,
  };
};

export default useScore;
