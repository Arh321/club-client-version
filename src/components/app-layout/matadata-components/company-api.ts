import { getCompanyInfo } from "@/utils/companyInfoService";

export const fetchCompanyInfo = async () => {
  try {
    const res = await getCompanyInfo();

    if (res.statusCode != 200) throw new Error("Failed to fetch company info");

    const data = res?.result;
    return data ?? null;
  } catch (error) {
    console.error("Error fetching companyInfo:", error);
    return null;
  }
};
