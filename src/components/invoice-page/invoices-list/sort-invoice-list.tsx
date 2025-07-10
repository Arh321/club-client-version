"use client";
import { DataOrdersType } from "@/hooks/useGetInvoiceList";
import { IInvoice } from "@/types/invoice";
import { CloseOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from "antd";
import clsx from "clsx";
import { useState } from "react";
const sortingOptions: {
  label: string;
  key: string;
  order: "asc" | "desc";
  id: 1 | 2 | 3 | 4;
}[] = [
  { label: "کمترین مبلغ", key: "payAmount", order: "asc", id: 1 },
  { label: "بالاترین مبلغ", key: "payAmount", order: "desc", id: 2 },
  { label: "اولین فاکتور", key: "purchaseDate", order: "asc", id: 3 },
  { label: "آخرین فاکتور", key: "purchaseDate", order: "desc", id: 4 },
];

interface SortInvoiceListItemsProps {
  sortData: (payload: DataOrdersType | null) => void;
}

const SortInvoiceListItems: React.FC<SortInvoiceListItemsProps> = ({
  sortData,
}) => {
  const [sortType, setSortType] = useState<1 | 2 | 3 | 4 | undefined>(
    undefined
  );
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <button
        onClick={toggleCollapsed}
        className="absolute left-7 top-0 bottom-0 my-auto"
      >
        <Icon
          icon="lets-icons:sort-down-light"
          width="32"
          height="32"
          style={{ color: "#9a4c4c" }}
        />
      </button>
      <Drawer
        title={false}
        placement={"bottom"}
        closable={false}
        onClose={toggleCollapsed}
        open={collapsed}
        className="p-0"
        classNames={{
          body: "!p-0 ",
          wrapper:
            "!w-full !max-w-[470px] rounded-t-[20px] overflow-hidden relative !mx-auto",
        }}
      >
        <button className="absolute top-4 left-4">
          <CloseOutlined
            className="!text-Alert text-xl"
            role="button"
            onClick={toggleCollapsed}
          />
        </button>
        <div className="flex flex-col gap-2 h-full justify-center font-Medium p-4">
          {sortingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                sortData({
                  key: option.key as "payAmount" | "purchaseDate",
                  order: option.order,
                });
                setSortType(option.id);
                toggleCollapsed();
              }}
              className={clsx(
                "px-4 py-2 rounded transition-all text-lg",
                sortType === option.id
                  ? "bg-cta text-Highlighter"
                  : "text-Secondary bg-transparent"
              )}
            >
              {option.label}
            </button>
          ))}
          <hr className="border border-gradient-secondary" />
          <button
            onClick={() => {
              sortData(null);
              setSortType(undefined);
              toggleCollapsed();
            }}
            className={clsx(
              "px-4 py-2 rounded transition-all text-lg",
              sortType === undefined
                ? "bg-cta text-Highlighter"
                : "text-Secondary bg-transparent"
            )}
          >
            حذف فیلتر
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default SortInvoiceListItems;
