import React, { memo, Suspense } from "react";
import SideBar from "./header-sidebar-components/side-bar";
import { Skeleton } from "antd";

import MemoizedNavigationButtons from "./header-navigations";
import { deleteCookie } from "@/utils/common-methods/cookiesMethodes";

import MemoizedCompanyLogoComponent from "../shared-components/company-logo-component";
import { Link, useNavigate } from "react-router";

interface HeaderLandingContainerProps {
  isInMainRoute: boolean;
}

const HeaderLandingContainer: React.FC<HeaderLandingContainerProps> = ({
  isInMainRoute,
}) => {
  const router = useNavigate();

  const onLogOut = () => {
    deleteCookie("token");
    router("/login");
  };

  return (
    <div className="w-full flex items-center justify-between relative">
      <Suspense
        fallback={
          <div>
            <Skeleton.Avatar shape="square" active size={"small"} />
          </div>
        }
      >
        <SideBar />
      </Suspense>
      <Link to="/" className="absolute inset-0 m-auto w-max h-max">
        <MemoizedCompanyLogoComponent
          imageClass={
            "!size-[58px] [&_img]:!w-full [&_img]:!h-full [&_img]:!object-contain"
          }
        />
      </Link>

      <MemoizedNavigationButtons
        isInMainRoute={isInMainRoute}
        onBack={() => router(-1)}
        onLogOut={onLogOut}
      />
    </div>
  );
};

const MemoizedHeaderLandingContainer = memo(HeaderLandingContainer);

export default MemoizedHeaderLandingContainer;
