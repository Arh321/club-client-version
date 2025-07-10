"use client";
import { Modal } from "antd";
import {
  ProfileFirstViewLeftBorder,
  ProfileFirstViewRightBorder,
} from "@/components/sharedIcons/icons-index";
import { useState, useCallback } from "react";
import { CloseOutlined } from "@ant-design/icons";
import ProfileFirstViewInfo from "./profile-first-view-info";
import AntdLazyImage from "../../image-with-loader/image-with-loader";

type BackgroundImage = {
  id: number;
  url: string;
};

export interface ProfileFirstViewComponentProps {
  name: string;
  familyName: string;
  level: string;
  levelId: number;
}

const IMAGE_BACKGROUNDS: ReadonlyArray<BackgroundImage> = [
  { id: 1, url: "https://s8.uupload.ir/files/profile-bg-1_z9yt.jpg" },
  { id: 2, url: "https://s8.uupload.ir/files/profile-bg-2_5jus.jpg" },
  { id: 3, url: "https://s8.uupload.ir/files/profile-bg-3_c30i.jpg" },
  { id: 4, url: "https://s8.uupload.ir/files/profile-bg-4_rjkz.jpg" },
] as const;

const MODAL_STYLES = {
  direction: "rtl",
  width: "95vw !important",
  maxWidth: "450px",
  height: "95dvh",
} as const;

const MODAL_CLASS_NAMES = {
  header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
  content: "!p-2 !bg-BG !h-full",
  footer: "!hidden",
} as const;

const ProfileFirstViewComponent: React.FC<ProfileFirstViewComponentProps> = ({
  familyName,
  level,
  levelId,
  name,
}) => {
  const [selectedBG, setSelectedBG] = useState<BackgroundImage>(
    IMAGE_BACKGROUNDS[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const ModalTitle = () => (
    <div className="w-full flex items-center justify-center relative">
      <span>تغییر تصویر</span>
      <CloseOutlined
        className="!text-Alert !absolute top-0 bottom-0 my-auto left-2"
        role="button"
        onClick={handleToggleModal}
      />
    </div>
  );

  return (
    <div className="w-full">
      <div className="w-full h-[102px] flex items-center justify-between gap-[10px]">
        <ProfileFirstViewLeftBorder width="23" height="102" color="" />
        <div className="grow h-full relative rounded-[10px] overflow-hidden">
          <div className="w-full h-full">
            <AntdLazyImage
              className="!w-full !h-full object-cover [&_.mainImage]:w-full"
              src={selectedBG.url}
              alt="Profile background"
              width={200}
              height={200}
            />
          </div>
          <ProfileFirstViewInfo
            name={name}
            familyName={familyName}
            level={level}
            levelId={levelId}
          />
        </div>
        <ProfileFirstViewRightBorder width="23" height="102" color="" />
      </div>

      <Modal
        open={isModalOpen}
        title={<ModalTitle />}
        onCancel={handleToggleModal}
        style={MODAL_STYLES}
        classNames={MODAL_CLASS_NAMES}
        closeIcon={false}
        footer={false}
      />
    </div>
  );
};

export default ProfileFirstViewComponent;
