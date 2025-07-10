"use client";

import dynamic from "next/dynamic";

const GiftsAndCoponsContainerLAzy = dynamic(
  () => import("./gifts-and-copons-container"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full grid grid-cols-2 gap-[20px]">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="!flex !w-full aspect-square rounded-[10px] animate-skeleton"
          />
        ))}
      </div>
    ), // Fallback while loading
  }
);

export default GiftsAndCoponsContainerLAzy;
