import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import style from "./get-phone-styles.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import MemoizedCtaButton from "../shared-components/cta-button";
import CtaInput from "../shared-components/cta-input";
const phoneValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^(0\d{10}|9\d{9})$/, "شماره موبایل به فرمت صحیح وارد نشده است")
    .required("شماره موبایل الزامی است")
    .test("maxLength", "شماره موبایل نباید بیشتر از حد مجاز باشد", (value) =>
      value?.startsWith("0") ? value.length <= 11 : value.length <= 10
    ),
});

interface PhoneFormProps {
  onGetOtpCode: (phone: string) => void;
  setPhone: Dispatch<SetStateAction<string>>;
  phone: string;
  loading: boolean;
}

const GetPhoneNumberComponent: React.FC<PhoneFormProps> = ({
  onGetOtpCode,
  phone,
  setPhone,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
    mode: "onChange",
  });

  const handleInputChange = (value: string) => {
    const newValue = value.startsWith("0")
      ? value.slice(0, 11)
      : value.slice(0, 10);
    setPhone(newValue);
    setValue("phone", newValue, { shouldValidate: true });
  };

  const onSubmit = (data: { phone: string }) => {
    onGetOtpCode(data.phone);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-4 admin-panel"
      dir="rtl"
    >
      <div
        className={clsx(
          style["input-wrapper"],
          "relative w-full flex mt-[4vh]"
        )}
      >
        <CtaInput
          style={{ direction: "ltr" }}
          value={phone}
          type="number"
          inputMode="numeric"
          placeholder="مثال: ********09"
          classNames={{
            input:
              "!border-cta focus-within:!border-cta-focus !p-3 transition-colors",
            wrapper: "w-full !min-w-[320px] ",
          }}
          autoComplete="off"
          id="userName"
          autoFocus
          {...register("phone", { required: true })}
          onChange={(e) => handleInputChange(e)}
          disabled={loading}
        />
        <label
          htmlFor="userName"
          className="absolute !text-cta bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
        >
          شماره تلفن
        </label>
      </div>
      {errors.phone && (
        <p className="text-red-500 mt-2 text-alert font-regular">
          {errors.phone.message as string}
        </p>
      )}

      <MemoizedCtaButton
        type="submit"
        className={clsx(
          "py-2 w-2/3 text-lg rounded-lg fixed bottom-8 right-0 left-0 mx-auto max-w-[250px] transition-all"
        )}
        aria-label="submit-phone"
        disabled={!isValid || loading}
      >
        دریافت کد
        {loading && <LoadingOutlined />}
      </MemoizedCtaButton>
    </form>
  );
};

export default GetPhoneNumberComponent;
