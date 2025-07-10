import { Suspense } from "react";
import AppLoading from "../loading";

import LoginPageContainer from "@/components/login-components/login-container";

const LoginPage = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <LoginPageContainer />
    </Suspense>
  );
};

export default LoginPage;

// export default LoginHeader;
