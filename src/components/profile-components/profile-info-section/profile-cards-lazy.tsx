import { Skeleton } from "antd";
import { lazyWithFallback } from "@/components/shared-components/lazyWithFallback/lazyWithFallback";

// Lazy-load BannerSlidersComponent
const ProfileInfoSectionLazy = lazyWithFallback(
  () => import("./profile-info-section"),
  {
    fallback: (
      <div className="w-full h-[302px] rounded-[10px] p-[10px]">
        <Skeleton.Node className="!flex !w-full !h-full" active />
      </div>
    ),
  }
);

const ProfileInfoAddressSectionLazy = lazyWithFallback(
  () => import("./profile-info-address-section"),
  {
    fallback: (
      <div className="w-full h-[302px] rounded-[10px] p-[10px]">
        <Skeleton.Node className="!flex !w-full !h-full" active />
      </div>
    ),
  }
);

const ProfileCompleteInfoSectionLazy = lazyWithFallback(
  () => import("./profile-complete-info-section"),
  {
    fallback: (
      <div className="w-full h-[302px] rounded-[10px] p-[10px]">
        <Skeleton.Node className="!flex !w-full !h-full" active />
      </div>
    ),
  }
);

const ProfileFirstViewComponentLazy = lazyWithFallback(
  () => import("../profile-first-view/profile-first-view"),
  {
    fallback: (
      <div className="w-full h-[302px] rounded-[10px] p-[10px]">
        <Skeleton.Node className="!flex !w-full !h-full" active />
      </div>
    ),
  }
);

export {
  ProfileInfoSectionLazy,
  ProfileInfoAddressSectionLazy,
  ProfileCompleteInfoSectionLazy,
  ProfileFirstViewComponentLazy,
};
