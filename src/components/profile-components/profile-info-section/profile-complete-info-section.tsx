"use client";

import ProfileOneRowInfo from "./profile-each-row";

import { OpenEditPayload } from "@/hooks/useEditProfile";

interface ProfileCompleteInfoSectionProps {
  additional: {
    profilePhoto?: string;
    lastNameEn?: string;
    firstNameEn?: string;
    email?: string;
    nationalCode?: string;
    marriage?: boolean;
    spouseBirthdate?: string;
    educationTitle?: string;
    jobTitle?: string;
  };
  showEditModal: (payload: OpenEditPayload) => void;
  headerTitle: string;
}

const ProfileCompleteInfoSection: React.FC<ProfileCompleteInfoSectionProps> = ({
  headerTitle,
  additional,
  showEditModal,
}) => {
  return (
    <div
      dir="rtl"
      style={{
        animationDelay: `0.1s`,
        animationFillMode: "forwards",
        transform: "translateY(150px)",
      }}
      className="w-full flex flex-col opacity-0 gap-[10px] bg-Highlighter rounded-[10px] p-[10px] animate-fadeUp !duration-500"
    >
      <h2 className="text-cta text-lg font-Medium mb-[10px]">{headerTitle}</h2>
      <ProfileOneRowInfo
        items={[
          {
            title: "کد ملی",
            value: additional.nationalCode
              ? additional.nationalCode.toString()
              : "",
          },
          {
            title: "تحصیلات",
            value: additional.educationTitle,
          },
        ]}
        onEditMethod={() =>
          showEditModal({
            inputId: "",
            sectionName: "additional",
            show: true,
          })
        }
      />

      <ProfileOneRowInfo
        items={[
          {
            title: "ایمیل",
            value: additional.email,
          },
        ]}
        onEditMethod={() =>
          showEditModal({
            inputId: "",
            sectionName: "additional",
            show: true,
          })
        }
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "ازدواج",
            value: additional.marriage ? "متاهل" : "مجرد",
          },
          {
            title: "شغل",
            value: additional.jobTitle,
          },
        ]}
        onEditMethod={() =>
          showEditModal({
            inputId: "",
            sectionName: "additional",
            show: true,
          })
        }
      />
    </div>
  );
};

export default ProfileCompleteInfoSection;
