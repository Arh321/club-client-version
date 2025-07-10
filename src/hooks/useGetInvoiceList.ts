import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";
import { getAllInvoices } from "@/utils/invoiceService";
import { IInvoice } from "@/types/invoice";
import useInfiniteScrollToElement from "./useInfiniteScroll";

const fetchInvoices = async ({ pageParam = 1 }) => {
  const response = await getAllInvoices({ page: pageParam, size: 10 });
  if (!response.status) {
    throw new Error(response.statusMessage || "خطا در دریافت فاکتور");
  }
  return {
    data: response.result.data,
    nextPage: response.result.hasNext ? pageParam + 1 : undefined,
  };
};

export interface DataOrdersType {
  key: "payAmount" | "purchaseDate";
  order: "asc" | "desc";
}

export const useInvoices = () => {
  const listRef = useRef(null);
  const [sortConfig, setSortConfig] = useState<DataOrdersType | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["invoices"],
    initialPageParam: 1,
    queryFn: fetchInvoices,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const invoicesList = useMemo(() => {
    const res = data?.pages;
    const flatList = res ? res.flatMap((page) => page.data) : [];

    if (sortConfig) {
      return [...flatList].sort((a, b) => {
        const valA =
          sortConfig.key === "purchaseDate"
            ? new Date(a[sortConfig.key])
            : a[sortConfig.key];
        const valB =
          sortConfig.key === "purchaseDate"
            ? new Date(b[sortConfig.key])
            : b[sortConfig.key];
        return sortConfig.order === "asc"
          ? valA > valB
            ? 1
            : -1
          : valA < valB
          ? 1
          : -1;
      });
    }

    return flatList;
  }, [data, sortConfig]);

  const sortData = useCallback((payload: DataOrdersType | null) => {
    setSortConfig(payload);
  }, []);

  const handleScroll = () => {
    fetchNextPage();
  };

  useInfiniteScrollToElement(
    listRef,
    handleScroll,
    hasNextPage,
    isFetchingNextPage,
    undefined,
    "invoices-list"
  );

  return {
    data,
    error,
    status,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    invoicesList,
    listRef,
    sortData,
  };
};
