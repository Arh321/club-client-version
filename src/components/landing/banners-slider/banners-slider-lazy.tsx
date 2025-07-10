"use client";

import dynamic from "next/dynamic";

// Lazy-load BannerSlidersComponent
const BannerSlidersComponent = dynamic(() => import("./banners-slider"), {
  ssr: false, // Disable SSR for this client-side component
  loading: () => (
    <div>
      <div className="!flex !w-full !h-full aspect-[16/7] rounded-[10px] animate-skeleton" />
    </div>
  ), // Fallback while loading
});

export default BannerSlidersComponent;
