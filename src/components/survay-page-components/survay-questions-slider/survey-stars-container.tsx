"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Rate } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import clsx from "clsx";

import style from "./survay-questions-slider.module.css";

const CUSTOM_ITEM_LABELS = ["بـــد", "متوسط", "خوب", "خیلی خوب", "عالی"];
const CUSTOM_ITEM_COLORS = [
  "#FF4D4F",
  "#FFA940",
  "#FAAD14",
  "#52C41A",
  "#389E0D",
];
interface CustomRateProps {
  score: number;
  index: number;
  getValue: (value: number) => void;
  reset: boolean;
  setLable: Dispatch<SetStateAction<string[]>>;
}

const CustomRate: React.FC<CustomRateProps> = ({
  score,
  getValue,
  reset,
  setLable,
}) => {
  const [currentValue, setCurrentValue] = useState(score);

  const handleChange = (value) => {
    setCurrentValue(value);
    setLable([CUSTOM_ITEM_LABELS[value - 1], CUSTOM_ITEM_COLORS[value - 1]]);
  };

  useEffect(() => {
    if (reset) {
      setCurrentValue(score);
      setLable([
        CUSTOM_ITEM_LABELS[currentValue - 1],
        CUSTOM_ITEM_COLORS[currentValue - 1],
      ]);
    }
  }, [reset]);

  useEffect(() => {
    setLable([
      CUSTOM_ITEM_LABELS[currentValue - 1],
      CUSTOM_ITEM_COLORS[currentValue - 1],
    ]);
  }, [currentValue]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Rate
        value={currentValue}
        onChange={(value) => {
          handleChange(value);
          getValue(value);
        }}
        character={({ index }) =>
          currentValue >= index + 1 ||
          (currentValue > index && currentValue < index + 1) ? (
            <StarFilled className="hover:text-yellow-500 transition-all" />
          ) : (
            <StarOutlined className="hover:text-yellow-500 transition-all" />
          )
        }
        className={clsx(
          style["custome-stars-container"],
          "w-full !text-[40px] !flex justify-center gap-2 [&.ant-rate-star-second]:!text-gray-300 "
        )}
      />
    </div>
  );
};

export default CustomRate;
