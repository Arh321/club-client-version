import Image, { StaticImageData } from "next/image";
import CustomRate from "./survey-stars-container";
import { SurveySlide } from "@/hooks/useScore";
import { ISurveyQuestions } from "@/types/survet-types";
import { Badge } from "antd";
import { useState } from "react";

interface SurvayQuestionCartComponentProps {
  imageUrl: string | StaticImageData;
  title: string;
  score: number;
  index: number;
  tempSlides: ISurveyQuestions[];
  setTempSlides: (slides: ISurveyQuestions[]) => void;
  reset: boolean;
}

const SurvayQuestionCartComponent: React.FC<
  SurvayQuestionCartComponentProps
> = ({ imageUrl, title, index, score, setTempSlides, tempSlides, reset }) => {
  const [lable, setLable] = useState(["", ""]);
  const handleChange = (value: number, index: number) => {
    const find = tempSlides.map((item) => {
      if (item.id == index) {
        return {
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          givenPoint: value,
          applyDate: item.applyDate,
        };
      } else return item;
    });
    setTempSlides(find);
  };

  return (
    <>
      <Badge.Ribbon
        text={lable[0]}
        color={lable[1]}
        className="!text-2xl !leading-9 !font-Regular"
      >
        <div className="w-full aspect-[7/9] relative rounded-[24px] overflow-hidden">
          <Image
            src={"https://hubapi.loyaltyhub.ir" + imageUrl}
            width={200}
            height={400}
            className="w-full h-full object-cover"
            alt={title}
          />
          <span className="absolute py-4 bottom-0 right-0 bg-custom-gradient w-full font-Regular text-2xl text-center text-Highlighter">
            {title}
            <CustomRate
              score={score}
              index={index}
              getValue={(value) => handleChange(value, index)}
              reset={reset}
              setLable={setLable}
            />
          </span>
        </div>
      </Badge.Ribbon>
    </>
  );
};

export default SurvayQuestionCartComponent;
