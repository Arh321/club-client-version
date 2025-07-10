"use client";
import React, { memo, useState } from "react";
import { Drawer } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

import MemoizedCompanyLogoComponent from "../../shared-components/company-logo-component";
import MemoizedCtaButton from "../../shared-components/cta-button";
import MemoizedSideBarFooter from "./sidebar-footer";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  //   const dispatch = useDispatch();
  const content = [
    {
      icon: <Icon icon="lets-icons:user-light" width="1.6em" height="1.6em" />,
      label: "حساب کاربری من",
      url: "/profile",
    },
    // {
    //   icon: <Icon icon="solar:chat-line-linear" width="1.6em" height="1.6em" />,
    //   label: "انتقادات و پیشنهادات",
    //   // command: () => {
    //   //   dispatch(triggerModal({ key: "MemberShipVisible", value: true }));
    //   // },
    // },
    // {
    //   icon: (
    //     <Icon
    //       icon="lets-icons:group-share-light"
    //       width="1.6rem"
    //       height="1.6rem"
    //     />
    //   ),
    //   label: "درخواست همکاری",
    //   url: "/work-request",
    // },

    {
      icon: <Icon icon="fluent-mdl2:phone" width="1.6em" height="1.6em" />,
      label: "تماس با ما",
      url: "/contact-us",
    },
    {
      icon: <Icon icon="simple-line-icons:info" width="1.6em" height="1.6em" />,
      label: "درباره ما",
      url: "/about-us",
    },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <MemoizedCtaButton
        onClick={toggleCollapsed}
        className="text-Highlighter"
        aria-label="Toggle menu"
        aria-expanded={collapsed}
      >
        <Icon
          icon="lucide:menu"
          color="white"
          width={"2rem"}
          aria-hidden="true"
        />
      </MemoizedCtaButton>
      <Drawer
        title={false}
        placement={"right"}
        closable={false}
        onClose={toggleCollapsed}
        open={collapsed}
        className="p-0"
        classNames={{
          body: "!p-0 ",
          wrapper:
            "!w-[70vw] !max-w-[400px] rounded-tl-[50px] rounded-bl-[50px] overflow-hidden relative",
        }}
      >
        <div className="w-full h-full flex flex-col gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <MemoizedCtaButton
              onClick={toggleCollapsed}
              className="text-Highlighter !bg-transparent w-[74px] h-[70px]"
            >
              <span
                style={{
                  boxShadow: "4px 4px 6px 0px rgba(0,0,0,0.29) inset",
                }}
                className="w-full h-full bg-BG rounded-br-[50px] flex items-center  text-Alert text-3xl"
              >
                <Icon icon="stash:times" className="translate-x-1/2" />
              </span>
            </MemoizedCtaButton>
            <MemoizedCompanyLogoComponent
              imageClass={
                "!size-[58px] [&_img]:!w-full [&_img]:!h-full [&_img]:!object-contain"
              }
            />
          </div>
          <div
            dir="rtl"
            className="w-full flex flex-col gap-[10px] relative grow "
          >
            {content.map((item, index) => {
              return item.url ? (
                <Link
                  key={index}
                  href={`${item.url}`}
                  className="font-Regular  px-[20px] text-[14px] flex items-center gap-[10px] text-primary py-2"
                >
                  <span className="text-cta">{item.icon}</span>
                  <span className="text-Primary">{item.label}</span>
                </Link>
              ) : (
                <button
                  // onClick={(e: any) => item.command && item.command(e)}
                  className="font-Regular  px-[20px] text-[14px] flex items-center gap-[10px] text-primary py-2"
                >
                  <span className="text-cta">{item.icon}</span>
                  <span className="text-Primary">{item.label}</span>
                </button>
              );
            })}
          </div>
          <MemoizedSideBarFooter />
        </div>
      </Drawer>
    </>
  );
};

export default memo(Sidebar);
