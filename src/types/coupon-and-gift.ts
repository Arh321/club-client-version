export type ICoupon = {
  expDate: string;
  serial: string;
  reduction: number;
  minPrice: number;
  maxPrice: number;
  firstName: string;
  lastName: string;
  mobile: string;
  id: number;
  isUsed: boolean;
};

export type IGifts = {
  id: number;
  customerId: number;
  title: string;
  serial: string;
  color: string;
  minimumPurchase: number;
  ceilingLimitation: number;
  discountPercent: number;
  startDate: string;
  expDate: string;
  useTimes: number;
  missionCode: string;
  missionTitle: string;
  isCoupon: boolean;
  isActive: boolean;
  isUsed: boolean;
};

export interface IGiftCardLabels {
  couponsCount: number;
  couponsMaxPercent: number;
  couponsMinPercent: number;
  giftCardCount: number;
  giftCardMaxPercent: number;
  giftCardMinPercent: number;
}
