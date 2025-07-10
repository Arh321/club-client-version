import React, { memo } from "react";
import clsx from "clsx";
import { LoadingOutlined } from "@ant-design/icons";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isValid?: boolean;
  loading?: boolean;
  isOutLine?: boolean;
  children?: React.ReactNode;
  endIcon?: React.JSX.Element;
  startIcon?: React.JSX.Element;
}

const CtaButton: React.FC<CtaButtonProps> = ({
  isValid = true,
  loading = false,
  children,
  isOutLine,
  className,
  disabled,
  type,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "font-Medium disabled:cursor-not-allowed active:scale-90 transition-all rounded-[10px] flex items-center gap-2 justify-center",
        {
          "bg-cta disabled:!bg-cta-disabled hover:bg-cta-hover text-Highlighter":
            !isOutLine,
          "bg-transparent border border-cta disabled:opacity-60": isOutLine,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {!loading && (
        <>
          {props.startIcon && props.startIcon} {children}
          {props.endIcon && props.endIcon}
        </>
      )}
      {loading && (
        <span className="ml-2">
          <LoadingOutlined />
        </span>
      )}
    </button>
  );
};

const MemoizedCtaButton = memo(CtaButton);

export default MemoizedCtaButton;
