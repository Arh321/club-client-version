"use client";

import { Skeleton } from "antd";
import dynamic from "next/dynamic";

const LazyFooterComponent = dynamic(() => import("./footer-container"), {
  ssr: false, // Disable SSR for this client-side component
  loading: () => (
    <div className="w-full max-w-[470px] h-[80px] fixed bottom-0 right-0 left-0 mx-auto z-50">
      <Skeleton.Node
        className="!flex !w-full !h-full rounded-t-[20px]"
        active
      />
    </div>
  ), // Fallback while loading
});

export { LazyFooterComponent };
