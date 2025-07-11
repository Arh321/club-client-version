import { lazyWithFallback } from "@/components/shared-components/lazyWithFallback/lazyWithFallback";

// Lazy-load BannerSlidersComponent
const BannerSlidersComponent = lazyWithFallback(
  () => import("./banners-slider"),
  {
    fallback: (
      <div>
        <div className="!flex !w-full !h-full aspect-[16/7] rounded-[10px] animate-skeleton" />
      </div>
    ), // Fallback while loading
  }
);

export default BannerSlidersComponent;
