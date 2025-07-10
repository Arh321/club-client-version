"use client";

import PagesContainer from "@/components/pages-container/pages-container";
import React, { Suspense } from "react";
import AppLoading from "../loading";
import useSurvey from "@/hooks/useSurvey";
import NotFoundComponent from "@/components/not-found-page/not-found-component";
import MemoizedPagesLoaderComponent from "@/components/shared-components/pages-loader-component";

const SurvayHeader = React.lazy(
  () =>
    import("@/components/survay-page-components/survay-header/survay-header")
);
const SurvayQuestionsSlider = React.lazy(
  () =>
    import(
      "@/components/survay-page-components/survay-questions-slider/survay-questions-slider"
    )
);

const SurvayPage = () => {
  const {
    errorState,
    loadingInvoice,
    invoiceId,
    loadingSurvey,
    surveyInfo,
    invoiceDetail,
  } = useSurvey();

  if (loadingSurvey || loadingInvoice) {
    return <MemoizedPagesLoaderComponent />;
  }

  if (errorState)
    return (
      <PagesContainer>
        <NotFoundComponent
          title={"در دریافت اطلاعات نظرسنجی خطایی رخ داده است"}
        />
      </PagesContainer>
    );

  if (surveyInfo && invoiceDetail)
    return (
      <PagesContainer>
        <Suspense fallback={<AppLoading />}>
          <div className="w-full  flex flex-col pb-[10px]">
            <SurvayHeader
              survayDescription={surveyInfo.description}
              invoiceDate={invoiceDetail.purchaseDate}
              invoiceId={invoiceId}
              survayTopic={surveyInfo.gratitudeTitle}
              invoiceDetail={invoiceDetail}
            />
            <SurvayQuestionsSlider
              questions={surveyInfo.details}
              surveyId={surveyInfo.id}
            />
          </div>
        </Suspense>
      </PagesContainer>
    );
};

export default SurvayPage;
