"use client";

import { Skeleton } from "antd";
import dynamic from "next/dynamic";

// Lazy-load BannerSlidersComponent
const ProfileInfoSectionLazy = dynamic(() => import("./profile-info-section"), {
  ssr: false, // Disable SSR for this client-side component
  loading: () => (
    <div className="w-full h-[302px] rounded-[10px] p-[10px]">
      <Skeleton.Node className="!flex !w-full !h-full" active />
    </div>
  ), // Fallback while loading
});

const ProfileInfoAddressSectionLazy = dynamic(
  () => import("./profile-info-address-section"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full h-[302px] rounded-[10px] p-[10px]">
        <Skeleton.Node className="!flex !w-full !h-full" active />
      </div>
    ), // Fallback while loading
  }
);

const ProfileCompleteInfoSectionLazy = dynamic(
  () => import("./profile-complete-info-section"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full h-[302px] rounded-[10px] p-[10px]">
        <Skeleton.Node className="!flex !w-full !h-full" active />
      </div>
    ), // Fallback while loading
  }
);

const ProfileFirstViewComponentLazy = dynamic(
  () => import("../profile-first-view/profile-first-view"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full h-[302px] rounded-[10px] p-[10px]">
        <Skeleton.Node className="!flex !w-full !h-full" active />
      </div>
    ), // Fallback while loading
  }
);

export {
  ProfileInfoSectionLazy,
  ProfileInfoAddressSectionLazy,
  ProfileCompleteInfoSectionLazy,
  ProfileFirstViewComponentLazy,
};
