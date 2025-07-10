import { CloseOutlined } from "@ant-design/icons";
import LevelStatusIcon from "./level-status-icon";

// Extracted component for modal title
const ModalTitle: React.FC<{
  levelTitle: string;
  levelStatus: string | undefined;
  handleCancel: () => void;
}> = ({ levelTitle, levelStatus, handleCancel }) => (
  <div className="w-full flex items-center justify-center relative">
    <span className="!absolute top-0 bottom-0 my-auto right-2">
      <LevelStatusIcon status={levelStatus || ""} />
    </span>
    <span>{levelTitle}</span>
    <CloseOutlined
      className="!text-Alert !absolute top-0 bottom-0 my-auto left-2"
      role="button"
      aria-label="Close"
      tabIndex={0}
      onClick={handleCancel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCancel();
      }}
    />
  </div>
);

export default ModalTitle;
