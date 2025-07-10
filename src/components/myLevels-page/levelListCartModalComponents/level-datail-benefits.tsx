import { IClubStatusNew } from "@/types/club-status";
import Modal from "antd/es/modal/Modal";
import { Dispatch, SetStateAction, Suspense } from "react";
import dynamic from "next/dynamic";
import ModalTitle from "./level-detail-benefits-modal-title";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";

// Dynamically import LevelDetailPopUp for code splitting
const LevelDetailPopUp = dynamic(() => import("../level-list-cart-detail"), {
  loading: () => (
    <div className="w-full h-[300px] flex justify-center items-center">
      <span className="block !w-max !h-max text-5xl">
        <LoadingOutlined className="!text-cta" />
      </span>
    </div>
  ),
  ssr: false,
});

interface LevelsListCartProps {
  level: IClubStatusNew;
  levelsStatus: [string, string][];
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleCancel: () => void;
  open: boolean;
}

const LevelDetailBenefitsModal: React.FC<LevelsListCartProps> = ({
  level,
  levelsStatus,
  handleCancel,
  setOpen,
  open,
}) => {
  const levelStatus = levelsStatus.find((item) => +item[0] === level.id)?.[1];

  return (
    <Modal
      open={!!open}
      title={
        <ModalTitle
          levelTitle={level.title}
          levelStatus={levelStatus}
          handleCancel={handleCancel}
        />
      }
      onCancel={handleCancel}
      style={{
        direction: "rtl",
      }}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
        content:
          " !p-2 !bg-BG !w-[95vw] !max-w-[375px] !max-h-[85vh] overflow-y-auto",
        footer: "!hidden",
        body: "!w-full !h-max",
        wrapper: clsx(
          "!w-full !h-full m-auto",
          "[&_.ant-modal]:!w-full [&_.ant-modal]:!inset-0 [&_.ant-modal]:!m-auto [&_.ant-modal]:!h-full [&_.ant-modal]:!overflow-hidden [&_.ant-modal]:flex [&_.ant-modal]:justify-center [&_.ant-modal]:items-center"
        ),
      }}
      closeIcon={false}
      footer={false}
      destroyOnClose
      aria-modal="true"
      maskClosable
    >
      <Suspense
        fallback={
          <div className="w-full h-[300px] flex justify-center items-center">
            <span className="block !w-max !h-max text-5xl">
              <LoadingOutlined className="!text-cta" />
            </span>
          </div>
        }
      >
        <LevelDetailPopUp
          levelImege={level.imageUrl}
          status={level}
          onClose={setOpen}
          levelsStatus={levelsStatus}
        />
      </Suspense>
    </Modal>
  );
};

export default LevelDetailBenefitsModal;
