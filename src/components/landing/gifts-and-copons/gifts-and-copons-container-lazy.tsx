import { lazyWithFallback } from "@/components/shared-components/lazyWithFallback/lazyWithFallback";

const GiftsAndCoponsContainerLAzy = lazyWithFallback(
  () => import("./gifts-and-copons-container"),
  {
    fallback: (
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
