"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";
import { Skeleton, Tabs, TabsProps } from "antd";
import { IGifts } from "@/types/coupon-and-gift";
import style from "../invoice-page/invoices-list/invoice-list-style.module.css";
import tabStyle from "../../styles/ant-custom-styles.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { getUserGiftCards } from "@/utils/giftAndCouponsService";

const CouponItem = React.lazy(() => import("./couponItem"));

const CouponsContainerList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IGifts[]>([]);

  const [error, setError] = useState<boolean>(false);

  const getBAnners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserGiftCards({
        customerId: 2280,
      });
      if (response.status) {
        const coupons = response.result.filter((item) => item.isCoupon);
        setData(() => coupons);
      } else {
        setLoading(false);

        setError(true);
      }
    } catch (error) {
      setLoading(false);

      setError(true);
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    getBAnners();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "2",
      label: "استفاده شده",
      children: (
        <div className="w-full flex flex-col gap-[12px]">
          <TransitionGroup component="ul" className="space-y-2">
            {data
              .filter((item) => item.isUsed && !item.isActive)
              .map((item, index) => {
                return (
                  <CSSTransition
                    key={index}
                    timeout={500}
                    classNames={clsx(style["fade"])}
                  >
                    <CouponItem
                      key={index}
                      coupon={item}
                      index={index}
                      type={"used"}
                    />
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
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
          <TransitionGroup component="ul" className="space-y-2">
            {data
              .filter((item) => !item.isUsed && item.isActive)
              .map((item, index) => {
                return (
                  <CSSTransition
                    key={index}
                    timeout={500}
                    classNames={clsx(style["fade"])}
                  >
                    <CouponItem
                      key={index}
                      coupon={item}
                      index={index}
                      type={"unused"}
                    />
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </div>
      ),
    },
  ];

  if (loading || !data)
    return (
      <div className="w-full flex flex-col gap-[12px]">
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <Skeleton.Node
              key={index}
              className="!flex !w-full !h-full aspect-[22/10] rounded-[10px]"
              active
            />
          );
        })}
      </div>
    );

  if (error) return null;
  if (data)
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
