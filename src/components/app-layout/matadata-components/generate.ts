import { fetchCompanyInfo } from "./company-api";
import { buildMetadata } from "./metadata-builder";
import { Metadata } from "next";

export async function generateSiteMetadata(): Promise<Metadata> {
  const info = await fetchCompanyInfo();
  return buildMetadata(info);
}
