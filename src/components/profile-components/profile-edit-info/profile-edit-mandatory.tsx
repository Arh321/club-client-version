import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Radio, RadioChangeEvent } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";

import PersianDatePicker from "./persian-date-picker";
import { IadditionalInfo, IMandatory } from "@/types/profile";
import { LoadingOutlined } from "@ant-design/icons";
// Define the shape of the form data
interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  gender?: boolean;
  birthdate?: string;
}

interface ProfileEditMandatoryFormProps {
  headerTitle: string;
  mandatory: ProfileFormValues;
  style: {
    readonly [key: string]: string;
  };
  updateProfileInfo: (
    mandatory?: IMandatory,
    additional?: IadditionalInfo
  ) => Promise<void>;
  loading: boolean;
}

// Define a validation schema using Yup
const validationSchema = yup.object().shape({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  gender: yup.boolean().required("جنسیت الزامی است"),
  birthdate: yup.string().required("تاریخ تولد الزامی است"),
  // .matches(/^\d{4}-\d{2}-\d{2}$/, "تاریخ تولد باید به فرمت YYYY-MM-DD باشد"),
});

const ProfileEditMandatoryForm: React.FC<ProfileEditMandatoryFormProps> = ({
  headerTitle,
  mandatory,
  style,
  loading,
  updateProfileInfo,
}) => {
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    defaultValues: mandatory,
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  const [selectedDate, setSelectedDate] = useState<string>(mandatory.birthdate);
  // Reset form values when `mandatory` changes
  useEffect(() => {
    reset(mandatory);
  }, [mandatory, reset]);

  const onChangeGender = (e: RadioChangeEvent) => {
    setValue("gender", e.target.value);
  };
  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    updateProfileInfo(data, undefined);
  };
  const options = [
    {
      value: false,
      label: (
        <span
          dir="rtl"
          className="w-full justify-center flex items-center gap-2 font-Medium text-lg  "
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
          className="w-full justify-center flex items-center gap-2 font-Medium text-lg  "
        >
          <Icon icon="foundation:torso-female" width="26" height="26" />
          <span>خانم</span>
        </span>
      ),
    },
  ];
  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-[15px] p-[4px]"
    >
      <h3 className="text-cta text-lg font-Medium mb-[10px]">{headerTitle}</h3>
      <div className="w-full grid grid-cols-2 gap-2">
        {/* First Name Input */}
        <div
          className={clsx(
            "col-span-1 relative w-full flex",
            style["input-wrapper"]
          )}
        >
          <label
            htmlFor="firstName"
            className={clsx(
              "absolute text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
            )}
          >
            نام
          </label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                maxLength={20}
                disabled={loading}
                placeholder="نام"
                className="!font-Medium placeholder:!text-secondary"
              />
            )}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
              {errors.firstName.message}
            </span>
          )}
        </div>

        {/* Last Name Input */}
        <div
          className={clsx(
            "col-span-1 relative w-full flex",
            style["input-wrapper"]
          )}
        >
          <label
            htmlFor="lastName"
            className={clsx(
              "absolute text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
            )}
          >
            نام خانوادگی
          </label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                maxLength={20}
                {...field}
                disabled={loading}
                placeholder="نام خانوادگی"
                className="!font-Medium placeholder:!text-secondary !p-1"
              />
            )}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>
      <div className={clsx(" relative w-full flex  flex-col gap-2")}>
        <label
          htmlFor="lastName"
          className={clsx(" text-secondary1 cursor-text font-Medium")}
        >
          تاریخ تولد
        </label>

        <PersianDatePicker
          defaultValue={selectedDate}
          setDate={(date: string) => {
            setSelectedDate(date);
            setValue("birthdate", date);
          }}
        />

        {errors.birthdate && (
          <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
            {errors.birthdate.message}
          </span>
        )}
      </div>
      <div className="w-full relative  flex border border-gray-300 rounded-[6px]">
        <Radio.Group
          disabled={loading}
          onChange={onChangeGender}
          defaultValue={mandatory.gender}
          buttonStyle="solid"
          className="!w-full !flex !items-center gap-[10px]  [&_.ant-radio-button-wrapper-checked]:!bg-cta [&_.ant-radio-button-wrapper]:text-cta"
        >
          {options.map((option, index) => {
            return (
              <Radio.Button
                className="!w-full !border-none !shadow-none before:!hidden !rounded-[6px] !p-1 !h-auto "
                key={index}
                value={option.value}
              >
                {option.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
      <hr className="border border-gradient-secondary" />
      {/* Submit Button */}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="font-Medium bg-cta  disabled:opacity-70 text-Highlighter py-2 w-full text-lg rounded-lg"
        >
          ثبت اطلاعات
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </form>
  );
};

export default ProfileEditMandatoryForm;
