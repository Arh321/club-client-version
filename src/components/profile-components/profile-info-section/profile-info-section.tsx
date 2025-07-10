"use client";
import { Radio, RadioChangeEvent } from "antd";
import ProfileOneRowInfo from "./profile-each-row";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useMemo } from "react";
import { OpenEditPayload } from "@/hooks/useEditProfile";
import moment from "jalali-moment";

interface MandatoryFields {
  firstName?: string;
  lastName?: string;
  gender?: boolean;
  birthdate?: string;
}

interface ProfileInfoSectionProps {
  mandatory: MandatoryFields;
  cellPhone: string;
  headerTitle: string;
  showEditModal: (payload: OpenEditPayload) => void;
}

const EDIT_MODAL_PAYLOAD = {
  inputId: "",
  sectionName: "mandatory" as const,
  show: true,
};

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  headerTitle,
  mandatory,
  cellPhone,
  showEditModal,
}) => {
  const [genderValue, setGenderValue] = useState(!!mandatory.gender);

  const handleGenderChange = (e: RadioChangeEvent) => {
    setGenderValue(!e.target.value);
    showEditModal(EDIT_MODAL_PAYLOAD);
  };

  const genderOptions = useMemo(
    () => [
      {
        value: false,
        label: (
          <span
            dir="rtl"
            className="w-full justify-center flex items-center gap-2 font-Medium text-lg"
          >
            <Icon icon="fontisto:male" width="24" height="24" />
            <span>آقا</span>
          </span>
        ),
      },
      {
        value: true,
        label: (
          <span
            dir="rtl"
            className="w-full justify-center flex items-center gap-2 font-Medium text-lg"
          >
            <Icon icon="foundation:torso-female" width="26" height="26" />
            <span>خانم</span>
          </span>
        ),
      },
    ],
    []
  );

  const formattedBirthDate = useMemo(
    () =>
      mandatory.birthdate
        ? moment
            .from(mandatory.birthdate, "YYYY-MM-DD")
            .locale("fa")
            .format("YYYY/MM/DD")
        : "",
    [mandatory.birthdate]
  );

  const personalInfo = useMemo(
    () => [
      {
        title: "نام",
        value: mandatory.firstName,
      },
      {
        title: "نام خانوادگی",
        value: mandatory.lastName,
      },
    ],
    [mandatory.firstName, mandatory.lastName]
  );

  const contactInfo = useMemo(
    () => [
      {
        title: "شماره همراه",
        value: cellPhone,
      },
      {
        title: "تاریخ تولد",
        value: formattedBirthDate,
      },
    ],
    [cellPhone, formattedBirthDate]
  );

  return (
    <div
      dir="rtl"
      style={{
        animationFillMode: "forwards",
        transform: "translateY(150px)",
      }}
      className="w-full flex flex-col opacity-0 gap-[10px] bg-Highlighter rounded-[10px] p-[10px] animate-fadeUp !duration-500"
    >
      <h2 className="text-cta text-lg font-Medium mb-[10px]">{headerTitle}</h2>

      <ProfileOneRowInfo
        items={personalInfo}
        onEditMethod={() => showEditModal(EDIT_MODAL_PAYLOAD)}
      />

      <ProfileOneRowInfo
        items={contactInfo}
        onEditMethod={() => showEditModal(EDIT_MODAL_PAYLOAD)}
      />

      <div
        role="button"
        onClick={() => showEditModal(EDIT_MODAL_PAYLOAD)}
        className="w-full relative border border-Highlighter-Faded rounded-[10px] flex"
      >
        <Radio.Group
          onChange={handleGenderChange}
          value={genderValue}
          buttonStyle="solid"
          className="!w-full !flex !items-center gap-[10px] !p-[10px] [&_.ant-radio-button-wrapper-checked]:!bg-cta [&_.ant-radio-button-wrapper]:text-cta"
        >
          {genderOptions.map((option, index) => (
            <Radio.Button
              className="!w-full !border-none !shadow-none before:!hidden !rounded-[6px]"
              key={index}
              value={option.value}
            >
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
