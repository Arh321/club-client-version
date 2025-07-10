"use client";

import NotFoundComponent from "@/components/not-found-page/not-found-component";
import useInitCompany from "@/hooks/useInitCompany";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AuthRedirectProvider,
  useAuthRedirect,
} from "@/components/AuthRedirectContext/AuthRedirectContext";
import { setupInterceptors } from "@/utils/apiConfig";
function InterceptorInit() {
  const { redirectToLogin } = useAuthRedirect();

  // فقط یک‌بار ستاپ می‌کنیم
  setupInterceptors(redirectToLogin);

  return null;
}

const WelcomeSplash = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-6 p-6 relative overflow-hidden">
      {/* لوگو */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0, y: -200, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/logo.png" // مسیر لوگو رو اینجا درست کن
          alt="باشگاه مشتریان"
          width={120}
          height={120}
        />
      </motion.div>

      {/* جمله از راست */}
      <motion.h2
        className="text-xl font-Medium text-primary"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        به باشگاه مشتریان Loyalty خوش آمدید
      </motion.h2>

      {/* جمله از چپ */}
      <motion.p
        className="text-base text-gray-600 text-center font-Regular"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        جایی برای تجربه خرید بهتر و امتیازهای ویژه
      </motion.p>
      <span className="absolute bottom-4 right-0 left-0 w-max mx-auto">
        Loyaltyhub @v1.1.0
      </span>
    </div>
  );
};

const SplashScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const { errorCompanyInfo, handleGetCompanyInfo, loadingCompanyInfo } =
    useInitCompany();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    handleGetCompanyInfo();
  }, []);

  useEffect(() => {
    if (!loadingCompanyInfo) {
      const timeout = setTimeout(() => {
        setShowWelcome(false);
        // Store in session storage that welcome has been shown
        sessionStorage.setItem("hasSeenWelcome", "true");
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [loadingCompanyInfo]);

  if (errorCompanyInfo)
    return <NotFoundComponent title="خطا در دریافت اطلاعات" />;

  return (
    <AuthRedirectProvider>
      <InterceptorInit />
      <div
        className={clsx(
          "fixed top-0 right-0 w-full h-full transition-transform duration-500 z-[99999999999999999999999]",
          showWelcome ? "translate-x-0" : "translate-x-full"
        )}
      >
        <WelcomeSplash />
      </div>
      {!loadingCompanyInfo && children}
    </AuthRedirectProvider>
  );
};

export default SplashScreenWrapper;
