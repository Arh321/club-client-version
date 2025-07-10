import { Skeleton } from "antd";
import dynamic from "next/dynamic";

const LazyHeader = dynamic(() => import("./header"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[56px]">
      <Skeleton.Node active className="!w-full !h-full" />
    </div>
  ),
});

export default LazyHeader;
