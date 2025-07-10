"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";
import style from "../invoice-page/invoices-list/invoice-list-style.module.css";

import React, { memo, useMemo } from "react";
import { Skeleton } from "antd";
import useUserGiftCards from "@/hooks/useGetGiftsLabels";

const GiftListItemComponent = React.lazy(() => import("./giftListItem"));

const GiftsContainerList = () => {
  const { data, isFetching, isError } = useUserGiftCards();

  const labels = useMemo(() => {
    const res = data?.result;
    return res ?? [];
  }, [data]);

  if (isFetching)
    return (
      <div className="w-full flex flex-col gap-[12px]">
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <Skeleton.Node
              key={index}
              className="!flex !w-full !h-full aspect-[22/10] rounded-[10px]"
              active
            />
          );
        })}
      </div>
    );

  if (isError || labels.length == 0) return null;
  return (
    <div className="w-full flex flex-col gap-[12px]">
      <TransitionGroup component="ul" className="space-y-2">
        {labels.map((item, index) => {
          return (
            <CSSTransition
              key={index}
              timeout={500}
              classNames={clsx(style["fade"])}
            >
              <GiftListItemComponent key={index} gift={item} index={index} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default memo(GiftsContainerList);
