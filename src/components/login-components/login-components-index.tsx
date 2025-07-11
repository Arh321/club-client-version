import { Skeleton } from "antd";
import { lazyWithFallback } from "@/components/shared-components/lazyWithFallback/lazyWithFallback";

const MemoizedLoginHeaderLAzy = lazyWithFallback(
  () => import("./login-header"),
  {
    fallback: (
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
    ),
  }
);

const MemoizedLoginStepsContainerLAzy = lazyWithFallback(
  () => import("./login-steps-container"),
  {
    fallback: (
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
    ),
  }
);

export { MemoizedLoginHeaderLAzy, MemoizedLoginStepsContainerLAzy };
