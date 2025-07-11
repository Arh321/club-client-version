import { Skeleton } from "antd";
import { lazyWithFallback } from "../shared-components/lazyWithFallback/lazyWithFallback";

const LazyHeader = lazyWithFallback(() => import("./header"), {
  fallback: (
    <div className="w-full h-[56px]">
      <Skeleton.Node active className="!w-full !h-full" />
    </div>
  ),
});

export default LazyHeader;
