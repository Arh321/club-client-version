import dynamic from "next/dynamic";
import LevelPerviewCart from "./level-perview-cart";
import useLevels from "@/hooks/useLevels";
import { Skeleton } from "antd";

const LazyLevelsSlider = dynamic(
  () => import("@/components/landing/level-slider-container/level-slider"),
  {
    ssr: false,
    loading: () => <Skeleton active />,
  }
);

const LevelsPage = () => {
  const {
    loading,
    error,
    levels,
    getRemainingPointsAndPercent,
    getLevelStates,
  } = useLevels();

  const levelStates = getLevelStates(levels);
  const firstLevel = levels?.[0];

  if (loading) return <Skeleton.Image active />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Hero LCP Section */}
      <div className="mb-8 w-full flex justify-center">
        <LevelPerviewCart
          level={firstLevel}
          getRemainingPointsAndPercent={getRemainingPointsAndPercent}
          levelStatus={levelStates[firstLevel.id]}
          levelsStatus={Object.entries(levelStates)}
        />
      </div>

      {/* Lazy load the Swiper */}
      <LazyLevelsSlider />
    </div>
  );
};

export default LevelsPage;
