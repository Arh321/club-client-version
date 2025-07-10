"use client";
import { ProfileEditIcon } from "@/components/sharedIcons/icons-index";
import clsx from "clsx";

interface ProfileOneRowInfoProps {
  items: {
    title: string;
    value: string;
  }[];

  onEditMethod?: () => void;
}

const ProfileOneRowInfo: React.FC<ProfileOneRowInfoProps> = ({
  items,
  onEditMethod,
}) => {
  return (
    <div className="w-full relative border border-Highlighter-Faded rounded-[10px] flex ">
      {items.map((item, index) => {
        return (
          <p
            key={index}
            className={clsx(
              "w-full h-full flex flex-col gap-[10px] p-[10px] ",
              index > 0 && "border-r border-Highlighter-Faded"
            )}
          >
            <span className="text-Tritary font-Regular">{item.title}</span>
            <span
              className={clsx(
                "font-Medium",
                !item.value && "text-Focus !font-Regular"
              )}
            >
              {item.value ? item.value : "ثبت نشده"}
            </span>
          </p>
        );
      })}
      {onEditMethod && (
        <button
          onClick={onEditMethod}
          className="absolute left-[10px] top-[10px]"
        >
          <ProfileEditIcon width="21" height="20" color="var(--cta)" />
        </button>
      )}
    </div>
  );
};

export default ProfileOneRowInfo;
