"use client";
import clsx from "clsx";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./banner-slider.module.css";
import { memo, useMemo, useState } from "react";
import { getLandingBanners } from "@/utils/landingService";
import { Skeleton } from "antd";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import MemoizedErrorComponent from "@/components/shared-components/error-component";
import RedirectLoadingModal from "../redirect-to-shop/redirect-loading";
import AntdLazyImage from "@/components/image-with-loader/image-with-loader";

const BannerSlidersComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["BannersList"],
    queryFn: () => getLandingBanners(),
    refetchOnWindowFocus: false,
  });

  const banners = useMemo(() => {
    const bannersList = data?.result;
    return bannersList ?? [];
  }, [data]);

  if (isFetching)
    return (
      <div>
        <Skeleton.Node
          className="!flex !w-full !h-full aspect-[16/7] rounded-[10px]"
          active
        />
      </div>
    );

  if (isError)
    return (
      <MemoizedErrorComponent
        refetch={() => refetch()}
        containerClass="!w-full !h-full aspect-[16/7] rounded-[10px]"
      />
    );

  return (
    <>
      <div className="w-full h-full relative animate-fadeIn">
        <Swiper
          slidesPerView={1}
          pagination={true}
          navigation={false}
          speed={1500}
          autoplay={true}
          modules={[Navigation, Pagination, Autoplay]}
          className={clsx(style["bannersSlider-swiper"])}
        >
          {banners.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="w-full aspect-[16/6] rounded-[10px] overflow-hidden flex justify-center items-center "
              >
                <Link
                  onClick={() => setOpen(true)}
                  href={item.linkUrl}
                  className="!w-full !h-full"
                >
                  <AntdLazyImage
                    src={"https://hubapi.loyaltyhub.ir" + item.mobileImageUrl}
                    alt="index"
                    className="!w-full !h-full object-cover [&_.mainImage]:!h-full"
                    loadingPriority={index == 0}
                    width={406}
                    height={100}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <RedirectLoadingModal
        openRedirectModal={open}
        setOpenRedirectModal={setOpen}
      />
    </>
  );
};

export default memo(BannerSlidersComponent);
