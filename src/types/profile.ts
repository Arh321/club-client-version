export type IValidateUser = {
  customerKey: number;
  mobile: string;
  hasFactor: boolean;
  address: string;
  birthDate: null | string;
  firstName: null | string;
  lastName: string;
  provinceID: number;
  cityID: number;
  job: null | string;
  followCommission: number;
  buyPriceInYear: number;
  customerZone: null | string;
  marriageDate: null | Date;
  sexuality: boolean;
  usedCreditPrice: number;
  tell: null | string;
  title: null | string;
  nextLevelPrice: number;
  partnerShipCode: null | string;
  customerGroupName: null | string;
  zipCode: null | string;
  nationalCode: null | string;
  educationDegree: null | string;
  inviteTypeID: number;
  partnerBirthDate: null | Date;
  postalCode: null | string;
  token: string | null;
};

export interface ProfileInfo {
  userInfo: {
    name: string;
    familyName: string;
    cellPhone: string;
    tellephone: string;
  };
  completeInfo: {
    nationalCode: string;
    birthDate: string;
    email: string;
    education: string;
    job: string;
    sexuality: "male" | "female";
  };
  addressInfo: {
    province: {
      id: number;
      title: string;
    };
    city: {
      id: number;
      title: string;
    };
    address: string;
    zipCode: string;
  };
  levelInfo: {
    points: number;
    level: string;
    levelId: number;
  };
}

export interface IProfileInfo {
  immutable: {
    phone: string;
    referralCode: string;
    rankingPoints: {
      points: number;
    };
  };
  mandatory: IMandatory;
  additional: IadditionalInfo;
  defaultAddress: {
    cityId: number;
    provinceId: number;
    cityName: string;
    provinceName: string;
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    tel: string;
    address2: string;
    addressLine: string;
    postalCode: string;
    no: string;
    doorNo: string;
    latitude: string;
    longitude: string;
  };
  isActive: boolean;
  id: number;
}

export interface IUpdateProfilePayload {
  mandatory?: IMandatory;
  additional?: IadditionalInfo;
}

export interface IMandatory {
  firstName?: string;
  lastName?: string;
  gender?: boolean;
  birthdate?: string;
}

export interface IadditionalInfo {
  profilePhoto?: string;
  lastNameEn?: string;
  firstNameEn?: string;
  email?: string;
  nationalCode?: string;
  marriage?: boolean;
  spouseBirthdate?: string;
  educationTitle?: string;
  jobTitle?: string;
}
