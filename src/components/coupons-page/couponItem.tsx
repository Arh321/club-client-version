"use client";
import { IGifts } from "@/types/coupon-and-gift";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { CopyOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { message } from "antd";
import clsx from "clsx";

interface CouponItemProps {
  coupon: IGifts;
  index: number;
  type: "used" | "unused";
}

const CouponItem: React.FC<CouponItemProps> = ({ coupon, index, type }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      messageApi.open({
        type: "success",
        content: "سریال کوپن کپی شد",
        duration: 2,
        style: {
          zIndex: 999999999999,
          fontFamily: "Medium",
        },
      });
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "کپی کردن سریال با خطا مواجه شد",
        duration: 2,
        style: { zIndex: 999999999999, fontFamily: "Medium" },
      });
    }
  };
  return (
    <div
      dir="rtl"
      style={{
        animationDelay: `${(index + 10) * 0.05}s`,
        animationFillMode: "forwards",
        animationDuration: "200ms",
      }}
      className={clsx(
        "w-full rounded-[10px] flex flex-col items-center bg-Highlighter p-4 gap-4 relative ",
        {
          "!opacity-70 animate-fadeIn": type == "used",
          "animate-fadeUp opacity-0 !duration-75 translate-y-[100px]":
            type == "unused",
        }
      )}
    >
      {contextHolder}
      {type == "used" && (
        <div className="w-full h-full absolute top-0 right-0 flex justify-center items-center">
          <Icon
            icon="mdi:forbid"
            width="100"
            height="100"
            style={{ color: "#9a4c4c" }}
          />
        </div>
      )}
      <button
        disabled={type == "used"}
        onClick={() => copyToClipboard(coupon.serial)}
        className="w-10 h-10 rounded-full border-Secondary border absolute left-4 top-4 bg-[rgb(30,156,81,0.1)] "
      >
        <CopyOutlined width={"2rem"} className="text-xl" />
      </button>
      <div className="bg-[rgb(30,156,81,0.1)] rounded-full w-16 h-16 flex flex-col justify-center items-center gap-1 text-cta">
        <span className="font-Medium text-lg">{coupon.discountPercent}%</span>
        <span className="text-xs font-Regular">تخفیف</span>
      </div>
      <p className="font-Medium flex items-center justify-center gap-4">
        <span className="flex flex-col items-center gap-1">
          <span className="!text-xs">بیشترین مبلغ خرید:</span>
          <span className="!text-sm">
            {numberToPersianPrice(coupon.minimumPurchase)}
          </span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <span className="!text-xs">کمترین مبلغ خرید:</span>
          <span className="!text-sm">
            {coupon.ceilingLimitation != 0
              ? numberToPersianPrice(coupon.ceilingLimitation)
              : "بدون محدودیت"}
          </span>
        </span>
      </p>
      <div className="border-dotted border-b-4 w-full border-Secondary"></div>
      <div className="w-full flex justify-center gap-1 font-Medium">
        <span>سریال:</span>
        <span>#{coupon.serial}</span>
      </div>
    </div>
  );
};

export default CouponItem;
