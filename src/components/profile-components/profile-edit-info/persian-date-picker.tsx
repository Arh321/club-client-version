import React, { useState } from "react";

import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { DatePicker } from "antd-jalali";
import persianDate from "persian-date";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import fa_IR from "@/utils/common-methods/persian-locales";
import jalaliPlugin from "jalali-plugin-dayjs";

dayjs.extend(jalaliday);
dayjs.extend(jalaliPlugin);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tehran");
// این تابع همیشه تاریخ درست می‌ده حتی اگر ساعت سیستم 2 صبح باشه 😏

export const getJalaliDate = (date?: string) => {
  return date
    ? dayjs.utc(date).tz("Asia/Tehran").calendar("jalali")
    : dayjs().tz("Asia/Tehran").calendar("jalali");
};

interface PersianDatePickerProps {
  defaultValue?: string; // Default Gregorian date (e.g., "2025-01-01")
  setDate: (date: string) => void; // Function to update the selected date in Gregorian
}

const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  defaultValue,
  setDate,
}) => {
  // ✅ Force correct timezone conversion
  const getInitialDate = () => {
    if (defaultValue) {
      return getJalaliDate(defaultValue);
    }
    return dayjs().tz("Asia/Tehran").calendar("jalali"); // ✅ Ensures correct Jalali date
  };

  const [date, setDateState] = useState<dayjs.Dayjs>(getInitialDate);
  const handleDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      // ✅ Ensure correct Jalali date and fix one-day lag
      const correctJalaliDate = value.calendar("jalali");
      setDateState(correctJalaliDate);

      // ✅ Convert back to Gregorian
      const gregorianDate = correctJalaliDate
        .calendar("gregory")
        .format("YYYY-MM-DD");

      // ✅ Get Jalali day name
      const jalaliDayName = correctJalaliDate.locale("fa").format("dddd"); // e.g., "شنبه"

      setDate(gregorianDate);
      console.log("📅 Selected Date:", gregorianDate);
      console.log("📆 Jalali Date:", correctJalaliDate.format("YYYY-MM-DD"));
      console.log("🕌 Jalali Day Name:", jalaliDayName);
    } else {
      setDateState(getInitialDate());
    }
  };

  return (
    <DatePicker
      value={date}
      onChange={handleDateChange}
      locale={fa_IR}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      format={(value: any) =>
        new persianDate(value?.toDate()).format("YYYY/MM/DD")
      }
      placeholder="تاریخ انتخاب"
      className="!font-Regular placeholder:!text-secondary !p-1"
      dropdownClassName="!font-Regular general-rtl-class"
    />
  );
};

export default PersianDatePicker;
