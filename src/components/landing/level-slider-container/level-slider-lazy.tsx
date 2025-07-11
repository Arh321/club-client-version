import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { lazyWithFallback } from "@/components/shared-components/lazyWithFallback/lazyWithFallback";

// Lazy-load BannerSlidersComponent
const CurrentLevelSliderContainerLazy = lazyWithFallback(
  () => import("./level-slider-container"),
  {
    fallback: (
      <div className="w-full aspect-[8/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ),
  }
);

const MemoizedLevelsSliderLazy = lazyWithFallback(
  () => import("./level-slider"),
  {
    fallback: (
      <div className="!w-full !h-[180px] flex items-center justify-center">
        <span className="w-max h-max block">
          <LoadingOutlined className="text-cta text-2xl" />
        </span>
      </div>
    ),
  }
);

export { CurrentLevelSliderContainerLazy, MemoizedLevelsSliderLazy };
