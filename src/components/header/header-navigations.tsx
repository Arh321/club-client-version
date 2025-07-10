import { Icon } from "@iconify/react/dist/iconify.js";
import MemoizedCtaButton from "../shared-components/cta-button";
import { LogoutOutlined } from "@ant-design/icons";
import { memo } from "react";

const NavigationButtons = ({
  isInMainRoute,
  onBack,
  onLogOut,
}: {
  isInMainRoute: boolean;
  onBack: () => void;
  onLogOut: () => void;
}) => (
  <div className="flex items-center gap-8">
    {!isInMainRoute ? (
      <MemoizedCtaButton onClick={onBack} className="text-Highlighter">
        <Icon
          icon="mingcute:left-fill"
          width="32"
          height="32"
          className="text-Highlighter"
        />
      </MemoizedCtaButton>
    ) : (
      <MemoizedCtaButton
        onClick={onLogOut}
        endIcon={<LogoutOutlined />}
        className="text-Highlighter !gap-1"
      >
        <span className="font-Regular">خروج</span>
      </MemoizedCtaButton>
    )}
  </div>
);

const MemoizedNavigationButtons = memo(NavigationButtons);

export default MemoizedNavigationButtons;
