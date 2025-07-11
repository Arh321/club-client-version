import Header from "../header/header";
import MemoizedFooterContainer from "../footer/footer-container";
import { Suspense } from "react";
import SplashScreenWrapper from "./splash-screen-loader/SplashScreenWrapper";
import ErrorBoundaryWrapper from "../error-component/ErrorBoundary";
import NotFoundComponent from "../not-found-page/not-found-component";
import AppLoading from "@/loading";
import { Outlet } from "react-router";

const AppLayOut = () => {
  return (
    <ErrorBoundaryWrapper
      fallback={
        <NotFoundComponent title="در هنگام برقراری ارتباط خطایی رخ داده است" />
      }
    >
      <SplashScreenWrapper>
        <Suspense fallback={<AppLoading />}>
          <div
            dir="rtl"
            className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden"
          >
            <Header />
            <Outlet />
            <MemoizedFooterContainer />
          </div>
        </Suspense>
      </SplashScreenWrapper>
    </ErrorBoundaryWrapper>
  );
};

export default AppLayOut;
