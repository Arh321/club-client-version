// lib/metadata/metadata-builder.ts
import { ICompanyInfo } from "@/types/company-info-type";
import { Metadata } from "next";

export function buildMetadata(info: ICompanyInfo | null): Metadata {
  return {
    title: info?.companyName ?? "باشگاه مشتریان",
    description: `آدرس: ${info?.companyAddress ?? "نداریم!"}`,
    openGraph: {
      title: info?.companyName,
      description: info?.companyWebSiteAddress ?? "",
      images: [
        {
          url: info?.logoUrl ?? "/default-og.png",
          width: 800,
          height: 600,
          alt: info?.companyName ?? "لوگو شرکت",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: info?.companyName,
      description: info?.companyEmail ?? "",
      images: [info?.logoUrl ?? "/default-og.png"],
    },
    icons: {
      icon: info?.logoUrlFooter ?? "/favicon.ico",
    },
    metadataBase: new URL(
      info?.companyWebSiteAddress ?? "https://loyaltyhub.ir"
    ), // دامنه‌ت اینجا ست شه
  };
}
