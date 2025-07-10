import { FactorDetail, IInvoiceDetail } from "@/types/invoice";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

const InvoiceDetailItemsTable: React.FC<{
  items: IInvoiceDetail["body"];
}> = ({ items }) => (
  <div className="w-full border-collapse font-Regular flex flex-col">
    <div className="border font-Medium bg-cta px-2 py-1 text-base text-Highlighter text-highlighter text-center sticky top-0">
      مشخصات فاکتور
    </div>
    <div className="font-bold w-full flex ">
      <div className="font-bold bg-Highlighter w-full p-1 flex border-b border-cta">
        <div className="w-2/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[8px]">نام کالا</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[8px]">بارکد کالا</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[8px]">تعداد</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[8px]">%تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[8px]">قیمت</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[8px]">پس از تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[8px]">مبلغ نهایی</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[8px]">مبلغ تخفیف</span>
          </p>
        </div>
      </div>
    </div>
    <div className="w-full ">
      {items.map((item, index) => (
        <RowOfFactorDetail key={index} item={item} />
      ))}
    </div>
  </div>
);

const RowOfFactorDetail = ({ item }: { item: FactorDetail }) => {
  return (
    <div className="font-bold bg-Highlighter w-full p-1 flex border-b border-cta">
      <div className="w-2/5 px-2 py-[1px] h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[8px] max-w-[125px] whitespace-nowrap text-ellipsis overflow-hidden">
            {item.productName}
          </span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[8px] max-w-[125px] whitespace-nowrap text-ellipsis overflow-hidden">
            {item.productCode ? item.productCode : "---"}
          </span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-[1px] h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[8px]">{item.quantity}</span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[8px]">{item.discountPrice}</span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-[1px] h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[8px]">
            {numberToPersianPrice(item.priceBeforeDiscount)}
          </span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[8px]">
            {numberToPersianPrice(item.priceAfterDiscount)}
          </span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-[1px] h-full">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[8px]">
            {numberToPersianPrice(item.finalPrice)}
          </span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[8px]"> {item.discountPercent}</span>
        </p>
      </div>
    </div>
  );
};

export default InvoiceDetailItemsTable;
