export interface IInvoiceDetail {
  body: FactorDetail[]; // Array of FactorDetail objects
  id: number; // Invoice ID
  sourceId: string; // Source identifier as a string
  customerId: number; // Customer ID as a number
  firstName: string; // Customer's first name
  lastName: string; // Customer's last name
  phone: string; // Customer's phone number
  fullAddress: string; // Full address including details
  purchaseDate: string; // Purchase date as an ISO 8601 string
  vat: number; // VAT percentage
  discountPercent: number; // Discount percentage
  discountPrice: number; // Discount price
  giftUsedAmount: number; // Amount used from a gift
  additionalAmount: number; // Additional charges
  payAmount: number; // Amount to be paid
  detailsDiscount: number; // Discount applied to details
  detailsPriceBeforeDiscount: number; // Total price of details before discounts
  detailsPriceAfterDiscount: number; // Total price of details after discounts
  discountUsedAmount: number; // Discount used amount
  totalPriceAfterDiscount: number; // Total price after discounts
  totalPrice: number; // Total price before any adjustments
  vatPrice: number; // VAT price in currency
  finalPrice: number; // Final price after all calculations
  surveyAction: boolean;
  surveyCompleted: boolean;
  surveyEnable: boolean;
}

export interface FactorDetail {
  id: number; // Assuming this is always a numeric ID
  sourceId: string; // Represents a string-based identifier
  productName: string; // Product name as a string
  productCode: string; // Product code as a string
  fee: number; // Product fee in number format
  quantity: number; // Quantity of the product as a number
  discountPercent: number; // Discount percentage (number format)
  discountPrice: number; // Total discount amount as a number
  vat: number; // VAT percentage as a number
  vatPrice: number; // VAT price in number format
  priceOfDiscounts: number; // Cumulative price of all discounts
  priceBeforeDiscount: number; // Price before applying discounts
  priceAfterDiscount: number; // Price after applying discounts
  finalPrice: number; // Final price including VAT and discounts
}
export interface IInvoice {
  id: number;
  sourceId: string;
  purchaseDate: string;
  payAmount: number;
  branchName: string;
  surveyEnable: boolean;
  surveyAction: boolean;
  surveyCompleted: boolean;
}

export interface IInvoiceResult {
  pageNumber: number;
  maxPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: IInvoice[];
}

///////////////////////////////////////

export interface IInvoiceId {
  id: 1;
  sourceId: string;
  purchaseDate: string;
  payAmount: number;
  vat: number;
  fullAddress: string;
  giftUsedAmount: number;
  discountPercent: number;
  discountPrice: number;
  additionalAmount: number;
  customerId: number;
  totalPrice: number;
  vatPrice: number;
  finalPrice: number;
}
