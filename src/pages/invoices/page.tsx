"use client";

import InvoicesListContainer from "@/components/invoice-page/invoices-list/invoices-list-container";
import SortInvoiceListItems from "@/components/invoice-page/invoices-list/sort-invoice-list";
import PagesContainer from "@/components/pages-container/pages-container";
import { useInvoices } from "@/hooks/useGetInvoiceList";
import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import React from "react";

export default function InvoicesPage() {
  const {
    invoicesList,
    error,
    isFetchingNextPage,
    listRef,
    isLoading,
    sortData,
  } = useInvoices();

  if (error) {
    return <div>Error loading invoices</div>;
  }

  if (isLoading) {
    return (
      <PagesContainer>
        <div className="w-full h-[80dvh] flex flex-col gap-[12px] custome-scrool-bar overflow-y-auto pt-4 sm:px-6 lsm:px-8 pb-[100px]">
          {Array.from({ length: 8 }).map((_, index) => {
            return (
              <Skeleton.Node
                key={index}
                className="!flex !w-full !h-full aspect-[16/5] rounded-[10px]"
                active
              />
            );
          })}
        </div>
      </PagesContainer>
    );
  }

  return (
    <PagesContainer>
      <div className="w-full z-10 sticky top-0">
        <div className="w-full flex items-center justify-center border-gradient-secondary border-b text-cta font-Medium text-xl py-4 overflow-hidden">
          فاکتورهای من
          <SortInvoiceListItems sortData={sortData} />
        </div>
      </div>
      <div
        id="invoices-list"
        className="w-full h-[80dvh] flex flex-col custome-scrool-bar overflow-y-auto gap-4 pt-4 sm:px-6 lsm:px-8 pb-[100px]"
      >
        <div ref={listRef} className="w-full h-max">
          <InvoicesListContainer data={invoicesList} />
        </div>
        {isFetchingNextPage && (
          <div className="w-full flex items-center justify-center">
            <span className="w-max h-max block">
              <LoadingOutlined className="text-cta text-2xl" />
            </span>
          </div>
        )}
      </div>
    </PagesContainer>
  );
}
