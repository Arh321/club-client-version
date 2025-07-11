import MemoizedErrorComponent from "@/components/shared-components/error-component";
import { CouponIcon, GiftIcon } from "@/components/sharedIcons/icons-index";
import useGiftCardLabels from "@/hooks/useGetGiftCardLabels";
import { lazyWithFallback } from "@/components/shared-components/lazyWithFallback/lazyWithFallback";
import React from "react";
// Extracted loading skeleton component to reduce code duplication
const LoadingSkeleton = () => (
  <div className="!flex !w-full aspect-square rounded-[10px] animate-skeleton" />
);

// Use dynamic import with no SSR for faster initial load
const CoponsAndGiftsSummeryComponentItem = lazyWithFallback(
  () => import("./copon-summery"),
  { fallback: <LoadingSkeleton /> }
);

const GiftsAndCoponsContainerComponent = () => {
  const { isError, isFetching, labels, refetch } = useGiftCardLabels();

  // Memoized icons to prevent unnecessary re-renders
  const couponIcon = React.useMemo(
    () => (
      <CouponIcon
        width="70"
        height="32"
        color="var(--cta)"
        className="text-cta"
      />
    ),
    []
  );

  const giftIcon = React.useMemo(
    () => (
      <GiftIcon
        width="70"
        height="32"
        color="var(--cta)"
        className="text-cta"
      />
    ),
    []
  );

  if (isFetching)
    return (
      <div className="w-full grid grid-cols-2 gap-[20px]">
        {[0, 1].map((index) => (
          <div key={index} className="col-span-1 w-full aspect-square">
            <LoadingSkeleton />
          </div>
        ))}
      </div>
    );

  if (isError)
    return (
      <MemoizedErrorComponent
        refetch={refetch}
        containerClass="w-full aspect-[3/1]"
      />
    );

  if (!labels) return null;

  return (
    <div dir="rtl" className="w-full grid grid-cols-2 gap-[20px]">
      <CoponsAndGiftsSummeryComponentItem
        title={"کوپـن خـریـد"}
        icon={couponIcon}
        value={labels.couponsCount.toString()}
        type={"copon"}
        loading={isFetching}
      />
      <CoponsAndGiftsSummeryComponentItem
        title={"کارت هدیه"}
        icon={giftIcon}
        value={labels.giftCardCount.toString()}
        type={"gift"}
        loading={isFetching}
      />
    </div>
  );
};

const MemoizedGiftsContainer = React.memo(GiftsAndCoponsContainerComponent);

export default MemoizedGiftsContainer;
