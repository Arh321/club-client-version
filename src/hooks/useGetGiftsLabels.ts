import { RootState } from "@/redux/store";

import { getUserGiftCards } from "@/utils/giftAndCouponsService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useUserGiftCards = () => {
  const { info } = useSelector((state: RootState) => state.profileSlice);
  const customerId = useMemo(() => {
    return info ? info?.id : 0;
  }, [info]);
  return useQuery({
    queryKey: ["user-gift-cards", customerId],
    queryFn: () => getUserGiftCards({ customerId }),
    enabled: !!customerId,
    staleTime: 1000 * 60 * 5, // 5 دقیقه cache نگه داره
    retry: 1, // فقط یک بار تلاش مجدد
  });
};

export default useUserGiftCards;
