import { Modal } from "antd";

import { useEffect, useState } from "react";
import starGroupImage from "/images/Group 366323.webp";
import AntdLazyImage from "@/components/image-with-loader/image-with-loader";
import TextArea from "antd/es/input/TextArea";

import { LoadingOutlined } from "@ant-design/icons";
import { useNotify } from "@/components/notife/notife";
import { IConfirmSurveyPoints } from "@/types/survet-types";
import { applyCompletedSurveyInvoice } from "@/utils/surveyService";
import MemoizedCtaButton from "@/components/shared-components/cta-button";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

interface SurveySubmitModalProps {
  paramsData: {
    average: string;
    survey: string;
    invoiceId: string;
    surveyId: string;
  };
}

const useApplySurveyPoints = () => {
  return useMutation({
    mutationFn: (payload: IConfirmSurveyPoints) =>
      applyCompletedSurveyInvoice(payload),
  });
};

const SurveySubmitModal: React.FC<SurveySubmitModalProps> = ({
  paramsData,
}) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [opinion, setOpinion] = useState("");
  // Memoized values for average and survey
  const { average, survey, invoiceId, surveyId } = paramsData;
  const { notify } = useNotify();

  const showModal = () => {
    setOpen(true);
  };

  const { mutate: applyPoints, isPending } = useApplySurveyPoints();

  const onApplyPoints = () => {
    const payload = {
      additionalOpinion: opinion,
      invoiceId: invoiceId,
      surveyId: +surveyId,
    };

    applyPoints(payload, {
      onSuccess: (response) => {
        if (response.status) {
          notify("success", response.statusMessage);
          setOpen(false);
          navigate("/");
        } else {
          notify("error", response.statusMessage || "خطا در ثبت پاسخ");
        }
      },
      onError: () => {
        notify("error", "خطا در ثبت پاسخ");
      },
    });
  };

  const handleOk = () => {
    onApplyPoints();
  };

  const handleCancel = () => {
    onApplyPoints();
  };

  useEffect(() => {
    if (average && survey) {
      showModal();
    }
  }, []);
  return (
    <Modal
      open={open}
      title="دیدگاه شما ثبت شد"
      onOk={handleOk}
      onCancel={handleCancel}
      style={{
        direction: "rtl",
      }}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
        content: " !p-2 !bg-BG !w-[95vw] !max-w-[375px]",
        footer: "!w-full",
        body: "!w-full !h-max",
        wrapper: clsx(
          "!w-max !h-max m-auto",
          "[&_.ant-modal]:!w-full [&_.ant-modal]:!inset-0 [&_.ant-modal]:!m-auto [&_.ant-modal]:!h-full [&_.ant-modal]:!overflow-hidden [&_.ant-modal]:flex [&_.ant-modal]:justify-center [&_.ant-modal]:items-center"
        ),
      }}
      footer={
        <div className="w-full flex justify-center">
          <MemoizedCtaButton
            onClick={handleOk}
            disabled={isPending}
            className="font-Bold hover:bg-cta-hover disabled:!opacity-50 transition-all text-xl bg-cta !text-Highlighter p-3 rounded-lg w-[202px]"
          >
            متوجه شدم
            {isPending && <LoadingOutlined />}
          </MemoizedCtaButton>
        </div>
      }
    >
      <div className="py-[18px] w-full flex flex-col gap-[18px]">
        <p className="w-full text-center text-Primary font-Regular text-lg">
          نظر شما مستقیما باعث بهبود عملکرد فروشگاه میشود
        </p>
        <div className="w-full flex items-center justify-center">
          <AntdLazyImage src={starGroupImage} alt="" className="w-[176px]" />
        </div>
        <p className="w-full text-center text-Secondary font-Regular text-lg px-[11px]">
          شما همچنین میتوانید انتقادات یا پیشنهادات خود را در کادر زیر بنویسید.
        </p>
        <TextArea
          rows={4}
          autoFocus={true}
          autoSize={true}
          onChange={(e) => setOpinion(e.target.value)}
          disabled={isPending}
          placeholder="دیدگاه خود را اینجا بنویسید..."
          maxLength={200}
          className="!h-[100px] disabled:!opacity-70 !font-Medium placeholder:text-Secondary text-Primary placeholder:font-Regular !shadow-none !border-Highlighter focus:!border-cta"
        />
      </div>
    </Modal>
  );
};

export default SurveySubmitModal;
