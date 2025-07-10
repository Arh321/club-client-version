"use client";

import { useMemo, useState } from "react";
import { Input } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import clsx from "clsx";
import useInterval from "@/hooks/useTimer";
import useValidateOtp from "@/hooks/useValidateOtp";
import DotsLoading from "../shared-components/dots-loader";
import MemoizedCtaButton from "../shared-components/cta-button";
import { useRouter } from "next/navigation";

const INITIAL_TIMER = 120;
const OTP_LENGTH = 5;

interface GetOtpCodeComponentProps {
  onGetOtpCode: (phone: string) => void;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  phone: string;
  loadingResend: boolean;
  isWithInvoiceId: boolean;
  handleSendOtpByInvoiceId: () => void;
  invoiceId: string;
}

const GetOtpCodeComponent: React.FC<GetOtpCodeComponentProps> = ({
  onGetOtpCode,
  phone,
  setActiveStep,
  loadingResend,
  isWithInvoiceId,
  handleSendOtpByInvoiceId,
  invoiceId,
}) => {
  const navigate = useRouter();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(INITIAL_TIMER);
  const [active, setActive] = useState(true);

  const { handleValidateOtp, isLoading } = useValidateOtp(
    isWithInvoiceId,
    phone,
    invoiceId
  );

  useInterval(() => setSeconds((prev) => Math.max(prev - 1, 0)), 1000, active);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === OTP_LENGTH) {
      handleValidateOtp(value);
    }
  };

  const handleResendClick = () => {
    if (seconds !== 0) return;

    setOtp("");
    if (isWithInvoiceId) {
      handleSendOtpByInvoiceId();
    } else {
      onGetOtpCode(phone);
    }
    setSeconds(INITIAL_TIMER);
    setActive(true);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const isTimerExpired = seconds === 0;
  const isInputDisabled = useMemo(() => {
    return isLoading || loadingResend;
  }, [isLoading, loadingResend]);

  return (
    <div className="w-full h-max flex flex-col items-center gap-4 pt-4 [&_input]:!aspect-square [&_input]:!text-[1.13rem] [&_input]:!font-Medium">
      <Input.OTP
        length={OTP_LENGTH}
        value={otp}
        onChange={handleOtpChange}
        className="mt-4 !font-Medium"
        size="large"
        autoFocus
        dir="ltr"
        inputMode="numeric"
        disabled={isInputDisabled}
      />

      <div className="w-full flex items-center justify-center gap-8 mt-4">
        <MemoizedCtaButton
          onClick={() => {
            if (isWithInvoiceId) {
              navigate.push("/");
              return;
            }
            setActiveStep(0);
          }}
          className="regular-18 !bg-transparent text-cta flex items-center gap-2 cursor-pointer"
          endIcon={
            <Icon
              icon="lets-icons:edit-light"
              width="1.3rem"
              className="text-cta"
            />
          }
        >
          <span>{!isWithInvoiceId ? "ویرایش شماره" : "شماره من نیست"}</span>
        </MemoizedCtaButton>

        <p className="flex items-center gap-4">
          <span>{isTimerExpired ? "ارسال مجدد" : "زمان باقی‌مانده"}</span>
          {isTimerExpired && (
            <button
              role="button"
              className={clsx(
                "flex items-center gap-2",
                isTimerExpired
                  ? "text-cta"
                  : "text-Secondary cursor-not-allowed opacity-70"
              )}
              onClick={handleResendClick}
            >
              {loadingResend ? <LoadingOutlined /> : <SyncOutlined />}
            </button>
          )}
          <span
            dir="ltr"
            className={clsx("w-10 text-cta", isTimerExpired && "!text-Alert")}
          >
            {formatTime(seconds)}
          </span>
        </p>
      </div>
      {isInputDisabled && <DotsLoading />}
    </div>
  );
};

export default GetOtpCodeComponent;
