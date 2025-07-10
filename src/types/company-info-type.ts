type SocialMedia = {
  socialMediaId: number;
  title: string;
  logoUrl: string;
  linkUrl: string;
};

export type CompanyColors = {
  cta: string;
  ctaDisabled: string;
  ctaHover: string;
  ctaFocus: string;
  cta30: string;
  highlighter: string;
  highlighterDisabled: string;
  highlighterHover: string;
  highlighterFocus: string;
  highlighterFaded: string;
  bg: string;
  alert: string;
  tritary: string;
  secondary: string;
  primary: string;
  focus: string;
};

export interface ICompanyInfo {
  companyName: string;
  logoUrlFooter: string;
  logoUrl: string;
  backgroundDesign: string;
  phoneNumbers: string[];
  companyAddress: string;
  companyWebSiteAddress: string;
  companyEmail: string;
  companySocialMedias?: SocialMedia[];
  colors?: CompanyColors;
}
