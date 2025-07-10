import { IClubStatusNew } from "@/types/club-status";
import LevelsListCart from "./levels-list-cart";

interface LevelsLostContainerProps {
  levels: IClubStatusNew[];
  levelsStatus: [string, string][];
  getRemainingPointsAndPercent: (level: IClubStatusNew) => [string, number];
}

const LevelsLostContainer: React.FC<LevelsLostContainerProps> = ({
  levels,
  levelsStatus,
  getRemainingPointsAndPercent,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {levels.map((level, index) => {
        return (
          <LevelsListCart
            levelsStatus={levelsStatus}
            key={index}
            level={level}
            getRemainingPointsAndPercent={getRemainingPointsAndPercent}
          />
        );
      })}
    </div>
  );
};

export default LevelsLostContainer;
