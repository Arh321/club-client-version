import { memo } from "react";

const PagesContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      style={{
        userSelect: "none",
      }}
      className="w-full grow no-scrollbar overflow-y-auto bg-BG rounded-t-[20px] animate-up"
    >
      <div className=" w-full h-max relative flex flex-col">{children}</div>
    </div>
  );
};

export default memo(PagesContainer);
