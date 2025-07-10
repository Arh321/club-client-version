import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { StaticImageData } from "next/image";
import SilverLevel from "../../../public/images/SilverLevel.webp";
import BronzeLevel from "../../../public/images/BronzeLevel.webp";
import GoldLevel from "../../../public/images/GoldLevel.webp";
import { ProfileFirstViewComponentProps } from "./profile-first-view";
import useLevels from "@/hooks/useLevels";
import { useMemo } from "react";
import { Skeleton } from "antd";
import AntdLazyImage from "@/components/image-with-loader/image-with-loader";

const levelImages = [
  {
    id: 0,
    src: BronzeLevel,
  },
  {
    id: 1,
    src: SilverLevel,
  },
  ,
  {
    id: 2,
    src: GoldLevel,
  },
];
const ProfileFirstViewInfo: React.FC<ProfileFirstViewComponentProps> = ({
  familyName,
  level,
  levelId,
  name,
}) => {
  const { levels, info, getLevelStates, loading } = useLevels();
  const levelStates = useMemo(
    () => getLevelStates(levels),
    [levels, getLevelStates]
  );
  const currentLevel = useMemo(
    () => levels.find((level) => levelStates[level.id] === "Current"),
    [levels, levelStates]
  );

  if (loading)
    return (
      <div
        dir="rtl"
        className="absolute w-full h-full flex items-center justify-between px-4 right-0 top-0 bottom-0 my-auto bg-custom-gradient-white"
      >
        <div className="w-max h-max flex flex-col justify-center gap-1">
          <Skeleton.Node active className="!w-6" />
        </div>
        <Skeleton.Node active className="!w-[58px]" />
      </div>
    );

  return (
    <div
      dir="rtl"
      className="absolute w-full h-full flex items-center justify-between px-4 right-0 top-0 bottom-0 my-auto bg-custom-gradient-white"
    >
      <div className="w-max h-max flex flex-col justify-center gap-1">
        <p dir="rtl" className="flex items-center gap-1 text-Highlighter">
          <span className="w-6 flex justify-center">
            <Icon icon="mingcute:user-3-line" width="24" height="24" />
          </span>
          <span className="font-Bold text-lg">
            {name} {familyName}
          </span>
        </p>
        <p dir="rtl" className="flex items-center gap-1 text-Highlighter-Faded">
          <span className="w-6 flex justify-center">
            <Icon
              icon="material-symbols:crown-outline-rounded"
              width="20"
              height="20"
            />
          </span>
          <span className="font-Regular text-sm">{level} امتیاز</span>
        </p>
      </div>
      {!!currentLevel && (
        <div className="!size-[70px] flex items-center animate-movable">
          <AntdLazyImage
            src={"https://hubapi.loyaltyhub.ir" + currentLevel.imageUrl}
            alt={currentLevel?.title ?? "back-ground"}
            className="!w-full !h-full object-cover"
            loadingPriority={true}
            width={70}
            height={70}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileFirstViewInfo;
