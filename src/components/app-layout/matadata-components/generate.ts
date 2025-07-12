import { fetchCompanyInfo } from "./company-api";
import { buildMetadata, IMetaData } from "./metadata-builder";

export async function generateSiteMetadata(): Promise<IMetaData> {
  const info = await fetchCompanyInfo();
  return buildMetadata(info);
}
