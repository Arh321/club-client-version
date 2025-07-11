import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Skeleton, Tabs, TabsProps } from "antd";

import tabStyle from "../../styles/ant-custom-styles.module.css";
import React from "react";
import { getUserGiftCards } from "@/utils/giftAndCouponsService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileSliceType } from "@/redux/profile/profileSlice";

const CouponItem = React.lazy(() => import("./couponItem"));

const CouponsContainerList = () => {
  const { info, loadingProfile } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userGiftCards"],
    queryFn: async () => {
      const response = await getUserGiftCards({
        customerId: info?.id ?? 2280,
      });
      if (!response.status) {
        throw new Error("Failed to fetch gift cards");
      }
      return response.result.filter((item) => item.isCoupon);
    },
    enabled: !!info,
  });

  const items: TabsProps["items"] = [
    {
      key: "2",
      label: "استفاده شده",
      children: (
        <div className="w-full flex flex-col gap-[12px]">
          <ul className="space-y-2">
            <AnimatePresence>
              {data
                ?.filter((item) => item.isUsed && !item.isActive)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CouponItem coupon={item} index={index} type={"used"} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </ul>
        </div>
      ),
      className: "!w-full",
      style: { width: "!100%" },
    },
    {
      key: "1",
      label: "کوپن های فعال",
      children: (
        <div className="w-full flex flex-col gap-[12px]">
          <ul className="space-y-2">
            <AnimatePresence>
              {data
                ?.filter((item) => !item.isUsed && item.isActive)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CouponItem coupon={item} index={index} type={"unused"} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </ul>
        </div>
      ),
    },
  ];

  if (isLoading || !data || loadingProfile)
    return (
      <div className="w-full flex flex-col gap-[12px]">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton.Node
            key={index}
            className="!flex !w-full !h-full aspect-[22/10] rounded-[10px]"
            active
          />
        ))}
      </div>
    );

  if (isError) return null;

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      destroyInactiveTabPane={true}
      items={items}
      rootClassName="!w-full"
      className={clsx(tabStyle["coupons-tabs_container"])}
      indicator={{ size: (origin) => origin - 80, align: "center" }}
    />
  );
};

export default CouponsContainerList;
