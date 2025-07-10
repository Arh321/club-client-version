import { LevelState } from "@/hooks/useLevels";
import { Progress } from "antd";
import clsx from "clsx";

interface LevelStatesContainerProps {
  styles: {
    readonly [key: string]: string;
  };
  levelStatus: LevelState;
  levelDetails: [string, number]; // [remainingPercent, remainingPoints]
}

const LevelStatesContainer: React.FC<LevelStatesContainerProps> = ({
  levelDetails,
  levelStatus,
  styles,
}) => {
  const [remainingPercent, remainingPoints] = levelDetails;

  const levelComponents: Record<LevelState, JSX.Element> = {
    Done: (
      <span
        className="min-w-[88px] bg-BG font-Regular text-[14px] text-Primary px-4 py-[0.3rem] rounded-[50px] text-center"
        role="status"
      >
        تکمیل شده
      </span>
    ),

    Current: (
      <span
        className="min-w-[88px] bg-cta text-Highlighter font-Regular text-[14px] px-4 py-[0.3rem] rounded-[50px] text-center"
        role="status"
      >
        سطح من
      </span>
    ),

    Next: (
      <div className="relative w-full pb-4">
        <span
          className="min-w-[88px] text-cta bg-BG text-[12px] flex items-center gap-1 font-Bold px-4 py-2 rounded-[50px] text-center"
          role="status"
        >
          <span className="drop-shadow-sm whitespace-nowrap">امتیاز مانده</span>
          <span className="flex items-center gap-1">{remainingPoints}</span>
        </span>

        <span
          className="w-[34px] h-[34px] bg-Highlighter shadow-lg rounded-full p-2 text-sm font-Bold flex justify-center items-center absolute top-0 left-0 right-0 mx-auto -translate-y-[70%]"
          aria-label={`${remainingPercent}% Complete`}
          role="progressbar"
          aria-valuenow={Number(remainingPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {remainingPercent}
        </span>

        <div className="absolute w-full -bottom-2">
          <Progress
            percent={+remainingPercent}
            strokeColor="var(--cta)"
            strokeWidth={2}
            showInfo={false}
            trailColor="var(--BG)"
            rootClassName="!px-3 !-mt-8 !h-3 !relative"
            strokeLinecap="round"
            className={clsx(styles["next-progresBar"])}
          />
        </div>
      </div>
    ),
  };

  return (
    <div className="pt-[8px] relative">{levelComponents[levelStatus]}</div>
  );
};

export default LevelStatesContainer;
