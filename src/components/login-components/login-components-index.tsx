"use client";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

const MemoizedLoginHeaderLAzy = dynamic(() => import("./login-header"), {
  ssr: false, // Disable SSR for this client-side component
  loading: () => (
    <div className="w-full flex flex-col gap-4">
      <Skeleton.Node
        className="!flex !w-full !h-[160px] aspect-square rounded-[10px]"
        active
      />
      <Skeleton.Node
        className="!flex !w-full !h-[40px] aspect-square rounded-[10px]"
        active
      />
    </div>
  ), // Fallback while loading
});

const MemoizedLoginStepsContainerLAzy = dynamic(
  () => import("./login-steps-container"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full flex flex-col gap-[200px]">
        <Skeleton.Node
          className="!flex !w-full !h-[74px] aspect-square rounded-[10px]"
          active
        />
        <Skeleton.Node
          className="!flex !w-full !h-[44px] aspect-square rounded-[10px]"
          active
        />
      </div>
    ), // Fallback while loading
  }
);

export { MemoizedLoginHeaderLAzy, MemoizedLoginStepsContainerLAzy };
