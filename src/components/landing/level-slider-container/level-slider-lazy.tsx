"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

// Lazy-load BannerSlidersComponent
const CurrentLevelSliderContainerLazy = dynamic(
  () => import("./level-slider-container"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full aspect-[8/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ), // Fallback while loading
  }
);

const MemoizedLevelsSliderLazy = dynamic(() => import("./level-slider"), {
  ssr: false, // Disable SSR for this client-side component
  loading: () => (
    <div className="!w-full !h-[180px] flex items-center justify-center">
      <span className="w-max h-max block">
        <LoadingOutlined className="text-cta text-2xl" />
      </span>
    </div>
  ), // Fallback while loading
});

export { CurrentLevelSliderContainerLazy, MemoizedLevelsSliderLazy };
