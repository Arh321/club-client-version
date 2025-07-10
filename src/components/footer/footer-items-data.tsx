import MemoizedCompanyLogoComponent from "../shared-components/company-logo-component";
import {
  FactorIcon,
  HomeIcon,
  LevelsIcon,
  ProfileIcon,
} from "../sharedIcons/icons-index";

export interface FooterItemType {
  icon: JSX.Element;
  label: string;
  path: string;
  isActive: boolean;
  shop?: boolean;
  id: number;
}
const getFooterItemsData = (pathname: string): FooterItemType[] => {
  return [
    {
      icon: (
        <HomeIcon
          width="32"
          height="32"
          color="white"
          className="!text-Highlighter"
          isFill={pathname.length < 2}
        />
      ),
      label: "خانه",
      path: "/",
      isActive: pathname.length < 2,
      id: 1,
    },
    {
      icon: (
        <FactorIcon
          width="32"
          height="32"
          color="white"
          className="!text-Highlighter"
          isFill={pathname.includes("invoices")}
        />
      ),
      label: "فاکتورها",
      path: "/invoices",
      isActive: pathname.includes("invoices"),
      id: 2,
    },
    {
      icon: (
        <MemoizedCompanyLogoComponent
          containerClass="flex flex-col items-center"
          width={80}
          height={60}
          imageClass="!w-[80px] !h-[60px] [&_img]:!object-contain"
          logoIconSize={{
            width: "80",
            height: "60",
            color: "white",
          }}
          isFooter
        />
      ),
      label: "",
      path: "https://hosseinibrothers.ir/",
      isActive: false,
      shop: true,
      id: 3,
    },
    {
      icon: (
        <LevelsIcon
          width="32"
          height="32"
          color="white"
          className="!text-Highlighter"
          isFill={pathname.includes("mylevel")}
        />
      ),
      label: "سطح من",
      path: "/mylevel",
      isActive: pathname.includes("mylevel"),
      id: 4,
    },
    {
      icon: (
        <ProfileIcon
          width="32"
          height="32"
          color="white"
          className="!text-Highlighter"
          isFill={pathname.includes("profile")}
        />
      ),
      label: "پروفایل",
      path: "/profile",
      isActive: pathname.includes("profile"),
      id: 5,
    },
  ];
};

export { getFooterItemsData };
