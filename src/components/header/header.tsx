"use client";

import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import React, { memo, useMemo, useState } from "react";
import useAppInitializer from "@/hooks/useAppInitializer";
import MemoizedCtaButton from "../shared-components/cta-button";
import HeaderModalsContainer from "./header-modals-container";
import { Skeleton } from "antd";
import MemoizedCompanyLogoComponent from "../shared-components/company-logo-component";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SmartBackground from "../shared-components/smart-background";
import clsx from "clsx";

// Dynamically import components with loading fallbacks
const LazyHeaderLanding = dynamic(() => import("./header-landing-container"), {
  loading: () => (
    <div className="w-full flex items-center justify-between [&_.ant-skeleton-element]:!rounded-[4px]">
      <Skeleton.Avatar active size={"small"} shape={"square"} />
      <Skeleton.Image active className="!size-[50px] [&_svg]:!scale-75" />
      <Skeleton.Avatar active size={"small"} shape={"square"} />
    </div>
  ),
  ssr: false,
});

// Extracted components for better code splitting
const SurveyButton = ({ onClick }: { onClick: () => void }) => (
  <MemoizedCtaButton
    onClick={onClick}
    className="w-max !h-max flex !justify-end p-1!bg-transparent  text-Highlighter"
  >
    <Icon icon="stash:times" width="2.5rem" />
  </MemoizedCtaButton>
);

const Header = () => {
  const { info } = useSelector((state: RootState) => state.companySlice);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const pathname = usePathname();
  useAppInitializer();
  const isSurveyPage = useMemo(() => pathname.includes("survey"), [pathname]);
  const isLoginPage = useMemo(() => pathname.includes("login"), [pathname]);
  const isInMainRoute = useMemo(() => pathname === "/", [pathname]);

  const externalUrl = useMemo(() => {
    return info && info["Background-design"]
      ? "https://hubapi.loyaltyhub.ir" + info["Background-design"]
      : "";
  }, [info]);

  return (
    <SmartBackground
      className="w-full"
      style={{
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
      externalUrl={externalUrl}
      fallbackUrl={"/images/bg-art.webp"}
    >
      <div
        className={clsx(
          "w-full bg-gradient-to-l from-cta via-transparent to-cta px-4 py-3",
          isSurveyPage && "flex justify-end items-center !py-2",
          isLoginPage && "!py-1"
        )}
      >
        {isSurveyPage ? (
          <SurveyButton onClick={() => setIsModalOpen(true)} />
        ) : !isLoginPage ? (
          <LazyHeaderLanding isInMainRoute={isInMainRoute} />
        ) : (
          <div className="w-full flex items-center justify-center relative">
            <Link href="/" className="w-max h-max">
              <MemoizedCompanyLogoComponent
                imageClass={
                  "!w-[78px] !h-[50px] [&_img]:!w-full [&_img]:!h-full [&_img]:!object-contain"
                }
              />
            </Link>
          </div>
        )}
      </div>
      {!isLoginPage && (
        <HeaderModalsContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          pathname={pathname}
        />
      )}
    </SmartBackground>
  );
};

export default memo(Header);
