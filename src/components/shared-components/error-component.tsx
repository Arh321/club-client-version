"use client";
import { RedoOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import clsx from "clsx";
import { memo } from "react";

interface ErrorComponentProps {
  refetch: () => void;
  containerClass?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  refetch,
  containerClass,
}) => {
  return (
    <div className={clsx("font-Regular relative", containerClass)}>
      <Alert
        message="خطا"
        description="در بارگذاری اطلاعات خطایی رخ داده است"
        type="error"
        className="!font-Medium !w-full !h-full"
        showIcon
      />
      <button onClick={refetch} className="absolute left-2 top-2 w-max h-max">
        <RedoOutlined />
      </button>
    </div>
  );
};

const MemoizedErrorComponent = memo(ErrorComponent);

export default MemoizedErrorComponent;
