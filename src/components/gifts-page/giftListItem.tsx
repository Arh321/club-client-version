"use client";
import { IGifts } from "@/types/coupon-and-gift";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { CopyOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { message } from "antd";
import clsx from "clsx";
import moment from "jalali-moment";
import { memo } from "react";
import logo from "@/publicLOGO.png";
import HoseinyLogoText from "@/components/sharedIcons/hosseinyIcon";

import Image from "next/image";
import { hexToOpacity } from "@/utils/common-methods/colorToRGB";
interface GiftItemProps {
  gift: IGifts;
  index: number;
}

const GiftListItemComponent: React.FC<GiftItemProps> = ({ gift, index }) => {
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

  const isExpired = (expDate) => {
    // Parse the expiration date in Jalali format
    const expiration = moment(expDate, "jYYYY/jMM/jDD");
    // Get the current Jalali date
    const today = moment().locale("fa").startOf("day");
    // Check if the expiration date is before today
    return expiration.isBefore(today, "day");
  };
  return (
    <div
      dir="rtl"
      style={{
        animationDelay: `${(index + 10) * 0.05}s`,
        animationFillMode: "forwards",
        animationDuration: "200ms",
        backgroundColor: hexToOpacity(gift.color)
          ? hexToOpacity(gift.color, 0.2)
          : "rgb(255 255 255)",
      }}
      className={clsx(
        "w-full rounded-[10px] flex flex-col items-center shadow p-4 gap-3 relative aspect-[22/14] overflow-hidden animate-fadeUp opacity-0 !duration-75 translate-y-[100px]"
      )}
    >
      {contextHolder}
      <div className="w-max h-max absolute top-4 right-4 flex justify-center items-center">
        <div className="w-full flex flex-col gap-1 items-center">
          <Image
            src={logo}
            alt="برادران حسینی"
            className="w-10"
            width={20}
            height={20}
          />
          <HoseinyLogoText width="50" height="24" color="" />
        </div>
      </div>
      {gift.ceilingLimitation == 0 ||
        (isExpired(gift.expDate) && (
          <div className="w-full h-full absolute top-0 right-0 flex justify-center items-center bg-[rgb(30,86,0,0.4)]">
            <Icon
              icon="mdi:forbid"
              width="100"
              height="100"
              style={{ color: "#9a4c4c" }}
            />
          </div>
        ))}
      <button
        disabled={gift.ceilingLimitation == 0 || isExpired(gift.expDate)}
        onClick={() => copyToClipboard(gift.serial)}
        className="w-10 h-10 rounded-full border-Secondary border absolute left-4 top-4 bg-[rgb(30,156,81,0.1)] "
      >
        <CopyOutlined width={"2rem"} className="text-xl" />
      </button>
      <div className="bg-[rgb(30,156,81,0.1)] rounded-full w-[110px] h-[110px] flex flex-col justify-center items-center gap-1 text-cta">
        <span className="font-Medium text-lg">
          <span>{numberToPersianPrice(gift.ceilingLimitation)}</span>
          <span className="font-Regular text-xs pr-1">تومان</span>
        </span>
        <span className="text-xs font-Regular">مبلغ کارت هدیه</span>
      </div>
      <p className="font-Medium flex items-center justify-center gap-8">
        <span className="flex flex-col items-center gap-1">
          <span className="!text-xs">باقی مانده</span>
          <span className="!text-sm">
            {numberToPersianPrice(gift.ceilingLimitation)}
            <span className="font-Regular text-xs pr-1">تومان</span>
          </span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <span className="!text-xs">حداقل خرید</span>
          <span className="!text-sm">
            {gift.minimumPurchase != 0
              ? numberToPersianPrice(gift.minimumPurchase)
              : "بدون محدودیت"}
            {gift.minimumPurchase != 0 && (
              <span className="font-Regular text-[10px] pr-1">تومان</span>
            )}
          </span>
        </span>
      </p>
      <div
        style={{
          backgroundImage: "url(/images/Vector.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full h-max flex justify-center items-center font-Bold text-sm"
      >
        {gift.missionTitle}
      </div>
      <div className="w-full flex justify-between items-center gap-1 font-Medium">
        <span className="text-xs">
          <span>سریال:</span>
          <span dir="ltr" className="pr-1">
            #{gift.serial}
          </span>
        </span>
        <span className="text-xs">
          <span>تاریخ انقضا:</span>
          <span className="pr-1">
            {moment
              .from(gift.expDate, "YYYY-MM-DD")
              .locale("fa")
              .format("YYYY/MM/DD")}
          </span>
        </span>
      </div>
    </div>
  );
};

export default memo(GiftListItemComponent);
