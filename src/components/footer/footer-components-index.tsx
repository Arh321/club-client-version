"use client";

import { Skeleton } from "antd";
import { lazyWithFallback } from "../shared-components/lazyWithFallback/lazyWithFallback";

const LazyFooterComponent = lazyWithFallback(
  () => import("./footer-container"),
  {
    fallback: (
      <div className="w-full max-w-[470px] h-[80px] fixed bottom-0 right-0 left-0 mx-auto z-50">
        <Skeleton.Node
          className="!flex !w-full !h-full rounded-t-[20px]"
          active
        />
      </div>
    ), // Fallback while loading
  }
);

export { LazyFooterComponent };
