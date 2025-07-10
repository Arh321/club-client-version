"use client";
import { Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import style from "@/styles/ant-custom-styles.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import MemoizedCtaButton from "../shared-components/cta-button";

interface CancelSurveyModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const CancelSurveyModal: React.FC<CancelSurveyModalProps> = ({
  setOpen,
  open,
}) => {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const navigate = useRouter();
  // Memoized values for average and survey
  const { average, survey } = useMemo(() => {
    const avg = searchParams.get("average");
    const srv = searchParams.get("survey");
    return { average: avg, survey: srv };
  }, [searchParams]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      navigate.push("/");
    }, 3000);
  };

  useEffect(() => {
    if (average && survey) {
      showModal();
    }
  }, []);
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="لغو ثبت دیدگاه"
      style={{
        direction: "rtl",
        width: "95vw",
        maxWidth: "450px",
      }}
      classNames={{
        wrapper: style["survey-modal-wrapper"],

        header: "w-full text-center font-Medium !bg-transparent",
        content: style["modal-close-button"] + " !px-[23px] !bg-BG ",
      }}
      footer={
        <div className="w-full flex flex-col gap-4 items-center">
          <MemoizedCtaButton
            onClick={handleOk}
            disabled={loading}
            className="font-Bold hover:bg-cta-hover disabled:!opacity-50 transition-all text-xl bg-cta !text-Highlighter p-3 rounded-lg w-[202px]"
          >
            <span>متوجه شدم</span>
          </MemoizedCtaButton>
          <MemoizedCtaButton
            onClick={handleCancel}
            disabled={loading}
            loading={loading}
            className="font-Bold  disabled:!opacity-50 transition-all text-xl text-cta !bg-transparent p-3 rounded-lg w-[202px]"
          >
            <span>بعدا نظر می دهم</span>
          </MemoizedCtaButton>
        </div>
      }
    >
      <div className="py-[18px] w-full flex flex-col gap-[18px]">
        <p className="w-full text-center text-Primary font-Regular text-lg">
          همراه گرامی، این نظرسنجی جهت بررسی عملکرد مجموعه با انتظارات شماست.
        </p>

        <p className="w-full text-center  font-Regular text-sm px-[11px] text-Alert">
          شما همواره میتوانید با رفتن به منو “فاکتورها” در نظرسنجی شرکت کنید.
        </p>
      </div>
    </Modal>
  );
};

export default CancelSurveyModal;
