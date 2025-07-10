import { Dispatch, memo, SetStateAction } from "react";
import GetOtpCodeComponent from "./get-otp";
import GetPhoneNumberComponent from "./get-phone-number";
import SendOtpByInvoice from "./send-otp-by-invoice";

interface LoginStepsContainerProps {
  activeStep: number;
  backUrl?: string;
  otpLoading: boolean;
  otpError: boolean;
  handleSendOtpByInvoiceId: () => void;
  handleSendOtp: () => void;
  setPhone: Dispatch<SetStateAction<string>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
  phone: string;
}

const LoginStepsContainer: React.FC<LoginStepsContainerProps> = ({
  activeStep,
  handleSendOtp,
  handleSendOtpByInvoiceId,
  otpError,
  otpLoading,
  backUrl,
  setPhone,
  phone,
  setActiveStep,
}) => {
  return (
    <>
      {activeStep === 0 ? (
        backUrl ? (
          <SendOtpByInvoice
            loading={otpLoading}
            getOtpError={otpError}
            handleSendOtpByInvoiceId={handleSendOtpByInvoiceId}
          />
        ) : (
          <GetPhoneNumberComponent
            onGetOtpCode={handleSendOtp}
            setPhone={setPhone}
            phone={phone}
            loading={otpLoading}
          />
        )
      ) : (
        <GetOtpCodeComponent
          onGetOtpCode={handleSendOtp}
          handleSendOtpByInvoiceId={handleSendOtpByInvoiceId}
          setActiveStep={setActiveStep}
          phone={phone}
          loadingResend={otpLoading}
          isWithInvoiceId={!!backUrl}
          invoiceId={backUrl}
        />
      )}
    </>
  );
};

const MemoizedLoginStepsContainer = memo(LoginStepsContainer);

export default MemoizedLoginStepsContainer;
