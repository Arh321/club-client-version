import clsx from "clsx";
import MemoizedCtaButton from "../shared-components/cta-button";
import { FooterItemType } from "./footer-items-data";
import { memo, useCallback } from "react";

interface FooterItemComponentProps {
  item: FooterItemType;
  handleNavigation: (pathName: string) => void;
  onRedirectToShop: () => void;
}

const FooterItemComponent: React.FC<FooterItemComponentProps> = ({
  item,
  handleNavigation,
  onRedirectToShop,
}) => {
  const { shop, path, isActive, label, icon } = item;

  const handleClick = useCallback(() => {
    if (shop) {
      onRedirectToShop();
    } else {
      handleNavigation(path);
    }
  }, [shop, onRedirectToShop, handleNavigation, path]);

  const buttonClassName = clsx(
    "col-span-1 !bg-transparent h-full flex flex-col items-center !gap-1 py-[10px] focus:outline-none !rounded-none",
    shop && "!justify-center !py-0 -translate-y-1/2 active:!scale-100 !h-max"
  );

  const labelClassName = clsx(
    "text-Highlighter",
    isActive ? "!font-Bold" : "font-Regular"
  );

  return (
    <MemoizedCtaButton
      onClick={handleClick}
      className={buttonClassName}
      aria-current={isActive ? "page" : undefined}
      aria-label={label}
    >
      <span>{icon}</span>
      {!shop && <span className={labelClassName}>{label}</span>}
      {isActive && (
        <span className="w-[70px] h-[6px] rounded-t-[40px] bg-Highlighter absolute bottom-0" />
      )}
    </MemoizedCtaButton>
  );
};

const MemoizedFooterItemComponent = memo(FooterItemComponent);

export default MemoizedFooterItemComponent;
