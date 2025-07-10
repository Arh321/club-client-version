"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import logo from "@/public404-club.webp";
import MemoizedCtaButton from "../shared-components/cta-button";
interface NotFoundComponentProps {
  topic?: string;
  title: string;
  image?: string | StaticImageData;
}

const NotFoundComponent: React.FC<NotFoundComponentProps> = ({
  title,
  image,
  topic,
}) => {
  return (
    <div className="w-[calc(100%-50px)] h-max flex flex-col items-center p-5 rounded-[10px] justify-center gap-4 m-auto bg-Highlighter">
      <div className="w-full flex flex-col gap-4 items-center">
        <Image
          src={image ? image : logo}
          alt="not-found"
          className=""
          width={200}
          height={200}
          priority
        />
      </div>
      <p className="w-full flex flex-col items-center text-cta justify-center gap-[10px] font-Medium">
        <span className="bold-16">{topic ? topic : "متاسفیم!"} </span>
        <span className="w-1/2 flex flex-col gap-2 text-tertiary regular-14 text-center">
          {title}
        </span>
      </p>
      <MemoizedCtaButton
        onClick={() => window.location.reload()}
        className="!text-Highlighter p-3 text-lg !rounded-[10px] w-max"
      >
        تلاش مجدد
      </MemoizedCtaButton>
    </div>
  );
};

export default NotFoundComponent;
