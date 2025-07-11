import { Suspense } from "react";
import LoginPageContainer from "@/components/login-components/login-container";
import AppLoading from "@/loading";

const LoginPage = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <LoginPageContainer />
    </Suspense>
  );
};

export default LoginPage;

// export default LoginHeader;
