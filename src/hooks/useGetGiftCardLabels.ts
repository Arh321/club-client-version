import { ProfileSliceType } from "@/redux/profile/profileSlice";
import { RootState } from "@/redux/store";
import { IGiftCardLabels } from "@/types/coupon-and-gift";
import { IHttpResult } from "@/types/http-result";
import { GetGiftCardLabels } from "@/utils/giftAndCouponsService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useGetGiftCardLabels = (payload: { customerId: number }) => {
  return useQuery<IHttpResult<IGiftCardLabels>>({
    queryKey: ["GiftCardLabels", payload],
    queryFn: () => GetGiftCardLabels(payload),
    enabled: !!payload.customerId, // Only run query if customerId exists
    refetchOnWindowFocus: false,
  });
};

const useGiftCardLabels = () => {
  const { info, loadingProfile } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  const { data, isFetching, refetch, isError } = useGetGiftCardLabels({
    customerId: info?.id || 0,
  });

  const labels = useMemo(() => {
    if (!data?.result) return undefined;
    return data.result;
  }, [data]);

  return {
    labels,
    isFetching: isFetching || loadingProfile,
    isError,
    refetch,
  };
};

export default useGiftCardLabels;
