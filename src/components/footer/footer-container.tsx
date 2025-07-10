"use client";

import { usePathname, useRouter } from "next/navigation";

import RedirectLoadingModal from "../landing/redirect-to-shop/redirect-loading";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { getFooterItemsData } from "./footer-items-data";
import MemoizedFooterItemComponent from "./footer-item-component";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SmartBackground from "../shared-components/smart-background";

const REDIRECT_DELAY = 1000;

const FooterContainer = () => {
  const { info } = useSelector((state: RootState) => state.companySlice);
  const [openRedirectModal, setOpenRedirectModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = useCallback(
    (pathName: string) => {
      router.push(pathName);
    },
    [router]
  );

  const onRedirectToShop = useCallback(() => {
    setOpenRedirectModal(true);
    const timeoutId = setTimeout(() => {
      window.location.href = info.companyWebSiteAddress;
    }, REDIRECT_DELAY);
    return () => clearTimeout(timeoutId);
  }, []);

  const footerItems = useMemo(() => getFooterItemsData(pathname), [pathname]);

  useEffect(() => {
    const prefetchPaths = async () => {
      await Promise.all(footerItems.map((item) => router.prefetch(item.path)));
    };
    prefetchPaths();
  }, [footerItems, router]);

  const shouldHideFooter =
    pathname.includes("survey") || pathname.includes("login");

  if (shouldHideFooter) return null;

  return (
    <>
      <footer className="w-full max-w-[470px] fixed bottom-0 right-0 left-0 mx-auto z-50 translate-y-[100px] opacity-0 animate-fadeUp">
        <div
          dir="rtl"
          className="w-full relative h-[80px] bg-cta rounded-t-[20px]"
        >
          <SmartBackground
            className="w-full h-full rounded-t-[20px] overflow-hidden bg-center bg-contain bg-repeat"
            style={{
              backgroundRepeat: "repeat",
              backgroundSize: "contain",
            }}
            externalUrl={
              info
                ? "https://hubapi.loyaltyhub.ir" + info["Background-design"]
                : ""
            }
            fallbackUrl={"/images/bg-art.webp"}
          >
            <nav
              aria-label="Footer Navigation"
              className="w-full h-[80px] grid grid-cols-5 justify-between px-[4px] rounded-t-[20px] absolute top-0 right-0"
              style={{
                background:
                  "linear-gradient(to left, var(--cta), transparent, transparent, var(--cta))",
              }}
            >
              {footerItems.map((item) => (
                <MemoizedFooterItemComponent
                  key={item.id}
                  handleNavigation={handleNavigation}
                  item={item}
                  onRedirectToShop={onRedirectToShop}
                />
              ))}
            </nav>
          </SmartBackground>
        </div>
      </footer>
      <RedirectLoadingModal
        openRedirectModal={openRedirectModal}
        setOpenRedirectModal={setOpenRedirectModal}
      />
    </>
  );
};

const MemoizedFooterContainer = memo(FooterContainer);

export default MemoizedFooterContainer;
