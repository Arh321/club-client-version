import { Input, InputProps } from "antd";
import clsx from "clsx";
import { ChangeEvent } from "react";

interface CtaInputProps extends Omit<InputProps, "onChange"> {
  value?: string | number;
  onChange?: (value: string) => void;
  loading?: boolean;
  fieldName?: string;
}

const CtaInput = ({
  value,
  onChange,
  loading,
  fieldName = "input",
  className = "",
  classNames,
  ...props
}: CtaInputProps) => {
  const handleInputChange = (value: string) => {
    onChange?.(value);
  };

  return (
    <Input
      style={{ direction: "ltr" }}
      value={value}
      classNames={{
        input: clsx(
          "!font-Medium !bg-Highlighter placeholder:gray-40 focus-within:!bg-cta-30",
          classNames.input
        ),
        wrapper: clsx(classNames.wrapper),
      }}
      autoComplete="off"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e.target.value)
      }
      onPaste={(e) => {
        e.preventDefault();
        handleInputChange(e.clipboardData.getData("Text"));
      }}
      disabled={loading}
      {...props}
    />
  );
};

export default CtaInput;
