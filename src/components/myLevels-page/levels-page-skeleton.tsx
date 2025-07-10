import { Skeleton } from "antd";

const LevelsPageSkelton = () => {
  return (
    <div className="w-full  mx-auto flex flex-col justify-center gap-4">
      <Skeleton.Node className="!flex !w-full !h-full aspect-[3/2]" active />
      <Skeleton.Node className="!flex !w-full !h-full aspect-[16/3]" active />
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <Skeleton.Node
            key={index}
            className="!flex !w-full !h-full aspect-[16/7]"
            active
          />
        );
      })}
    </div>
  );
};

export default LevelsPageSkelton;
