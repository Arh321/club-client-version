"use client";
import ProfileOneRowInfo from "./profile-each-row";

interface ProfileInfoAddressSectionProps {
  defaultAddress: {
    cityId: number;
    provinceId: number;
    cityName: string;
    provinceName: string;
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    tel: string;
    address2: string;
    addressLine: string;
    postalCode: string;
    no: string;
    doorNo: string;
    latitude: string;
    longitude: string;
  };
  headerTitle: string;
}

const ProfileInfoAddressSection: React.FC<ProfileInfoAddressSectionProps> = ({
  headerTitle,
  defaultAddress,
}) => {
  return (
    <div
      dir="rtl"
      style={{
        animationDelay: `0.2s`,
        animationFillMode: "forwards",
        transform: "translateY(150px)",
      }}
      className="w-full flex flex-col opacity-0 gap-[10px] bg-Highlighter rounded-[10px] p-[10px]  animate-fadeUp !duration-500"
    >
      <h2 className="text-cta text-lg font-Medium mb-[10px]">{headerTitle}</h2>
      <ProfileOneRowInfo
        items={[
          {
            title: "استان",
            value: defaultAddress.provinceName,
          },
          {
            title: "شهر",
            value: defaultAddress.cityName,
          },
        ]}
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "آدرس",
            value: defaultAddress.addressLine,
          },
        ]}
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "کدپستی",
            value: defaultAddress.doorNo,
          },
        ]}
      />
    </div>
  );
};

export default ProfileInfoAddressSection;
