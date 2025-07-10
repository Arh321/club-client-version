import { IadditionalInfo, IMandatory } from "@/types/profile";
import { LoadingOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Radio, RadioChangeEvent } from "antd";
import clsx from "clsx";
import { useCallback, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";

// Validation helper function
const validateNationalCode = (value?: string): boolean => {
  if (!value || !/^\d{10}$/.test(value)) return false;
  const digits = value.split("").map(Number);
  const checkDigit = digits[9];
  const sum = digits
    .slice(0, 9)
    .reduce((acc, digit, index) => acc + digit * (10 - index), 0);
  const remainder = sum % 11;
  return remainder < 2
    ? checkDigit === remainder
    : checkDigit === 11 - remainder;
};

// Validation Schema
const validationSchema = yup.object({
  profilePhoto: yup.string().nullable(),
  lastNameEn: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z\s]*$/, "نام خانوادگی باید فقط شامل حروف انگلیسی باشد"),
  firstNameEn: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z\s]*$/, "نام باید فقط شامل حروف انگلیسی باشد"),
  email: yup.string().email("ایمیل معتبر نیست").nullable(),
  nationalCode: yup
    .string()
    .required("کد ملی الزامی است")
    .test(
      "is-valid-national-code",
      "کد ملی وارد شده معتبر نیست",
      validateNationalCode
    ),
  marriage: yup.boolean().nullable(),
  spouseBirthdate: yup
    .string()
    .nullable()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "تاریخ تولد همسر باید به فرمت YYYY-MM-DD باشد"
    ),
  educationTitle: yup.string().nullable(),
  jobTitle: yup.string().nullable(),
});

// Form Field Component

const FormField = ({
  label,
  name,
  placeholder,
  control,
  errors,
  length,
  type,
  loading,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => (
  <div className="col-span-1 relative w-full flex">
    {!loading && (
      <label className="absolute text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text">
        {label}
      </label>
    )}
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          maxLength={length}
          type={type}
          dir="rtl"
          disabled={loading}
          placeholder={placeholder}
          className="!font-Medium placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
        />
      )}
    />
    {errors[name] && (
      <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
        {errors[name].message}
      </span>
    )}
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileEditAdditionalForm = ({
  headerTitle,
  additional,
  style,
  loading,
  updateProfileInfo,
}: {
  headerTitle: string;
  additional: IadditionalInfo;
  style: {
    readonly [key: string]: string;
  };
  updateProfileInfo: (
    mandatory?: IMandatory,
    additional?: IadditionalInfo
  ) => Promise<void>;
  loading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: additional,
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  useEffect(() => {
    reset(additional);
  }, [additional, reset]);

  const onChangeMarriage = useCallback(
    (e: RadioChangeEvent) => setValue("marriage", e.target.value),
    [setValue]
  );
  const onSubmit: SubmitHandler<unknown> = (data) =>
    updateProfileInfo(undefined, data);

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-[20px] p-[4px]"
    >
      <h3 className="text-cta text-lg font-Medium mb-[10px]">{headerTitle}</h3>

      <div className="w-full grid grid-cols-2 gap-2">
        <FormField
          loading={loading}
          label="کد ملی"
          name="nationalCode"
          placeholder="کدملی..."
          control={control}
          errors={errors}
          length={10}
          type={"tel"}
        />
        <FormField
          loading={loading}
          label="ایمیل"
          name="email"
          placeholder="...example@gmail.com"
          control={control}
          errors={errors}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <FormField
          loading={loading}
          label="تحصیلات"
          name="educationTitle"
          placeholder="تحصیلات..."
          control={control}
          errors={errors}
        />
        <FormField
          loading={loading}
          label="شغل"
          name="jobTitle"
          placeholder="شغل..."
          control={control}
          errors={errors}
        />
      </div>

      {/* Marriage Selection */}
      <div className="w-full relative flex border border-gray-300 rounded-[6px]">
        <Radio.Group
          disabled={loading}
          onChange={onChangeMarriage}
          defaultValue={additional.marriage}
          buttonStyle="solid"
          className="!w-full !flex !items-center gap-[10px] [&_.ant-radio-button-wrapper-checked]:!bg-cta [&_.ant-radio-button-wrapper-disabled]:!opacity-50 [&_.ant-radio-button-wrapper]:text-cta"
        >
          {[
            { value: false, label: "مجرد" },
            { value: true, label: "متاهل" },
          ].map((option, index) => (
            <Radio.Button
              key={index}
              className="!w-full !border-none !shadow-none before:!hidden !rounded-[6px] !p-1 !h-auto"
              value={option.value}
            >
              <span
                dir="rtl"
                className="w-full justify-center flex items-center gap-2 font-Medium text-lg"
              >
                {option.label}
              </span>
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <hr className="border border-gradient-secondary" />

      {/* Submit Button */}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="font-Medium bg-cta disabled:opacity-70 text-Highlighter py-2 w-full text-lg rounded-lg"
        >
          ثبت اطلاعات
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </form>
  );
};

export default ProfileEditAdditionalForm;
