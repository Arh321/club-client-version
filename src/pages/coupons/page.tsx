import PagesContainer from "@/components/pages-container/pages-container";
import React from "react";

const CouponsContainerList = React.lazy(
  () => import("@/components/coupons-page/coupons-container")
);

const CouponsPage = () => {
  return (
    <PagesContainer>
      <CouponsContainerList />
    </PagesContainer>
  );
};

export default CouponsPage;
