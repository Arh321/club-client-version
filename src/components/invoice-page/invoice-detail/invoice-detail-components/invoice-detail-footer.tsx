import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import Image from "next/image";

const InvoiceDetailsFooter: React.FC<{
  salePrice: number;
  finalPrice: number;
  vatPrice?: number;
  factorID: number;
}> = ({ finalPrice, salePrice, factorID, vatPrice }) => (
  <div className=" bg-Highlighter flex flex-col py-2 px-2">
    <div className="w-full flex items-center justify-between px-4 py-2 bg-highlighter mb-2 border-b border-borderColor">
      <span className="text-[13px] font-Bold">مبلغ فاکتور</span>
      <div className="flex gap-2 justify-between items-center w-1/4">
        <span className="font-Bold text-[13px]">
          {numberToPersianPrice(salePrice)}
        </span>
        <span className="text-[10px] font-Bold">تومان</span>
      </div>
    </div>
    {vatPrice && (
      <div className="w-full flex items-center justify-between px-4 py-2 bg-highlighter mb-2 border-b border-borderColor">
        <span className="text-[13px] font-Bold">مبلغ مالیات</span>
        <div className="flex gap-2 justify-between items-center w-1/4">
          <span className="font-Bold text-[13px]">
            {numberToPersianPrice(vatPrice)}
          </span>
          <span className="text-[10px] font-Bold">تومان</span>
        </div>
      </div>
    )}
    <div className="w-full flex items-center justify-between px-4 py-2 bg-highlighter mb-2 border-b border-borderColor">
      <span className="text-[13px] font-Bold">مبلغ کل خرید</span>
      <div className="flex gap-2 justify-between items-center w-1/4">
        <span className="font-Bold text-[13px]">
          {numberToPersianPrice(finalPrice)}
        </span>
        <span className="text-[10px] font-Bold">تومان</span>
      </div>
    </div>
    <div className="w-full flex flex-col items-center mt-2 gap-2">
      <Image
        alt={factorID.toString()}
        src={`https://barcode.tec-it.com/barcode.ashx?data=${factorID}&code=Code25IL&multiplebarcodes=true&translate-esc=on`}
        className="h-[50px] w-[160px] animate-fadeIn object-contain"
        width={200}
        height={50}
      />
    </div>
  </div>
);
export default InvoiceDetailsFooter;
