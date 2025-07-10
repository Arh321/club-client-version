import { IProfileInfo } from "@/types/profile";

import moment from "jalali-moment";
import logo from "@/public/images/hosseiniLogo.webp";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AntdLazyImage from "@/components/image-with-loader/image-with-loader";

const InvoiceDetailSummary: React.FC<{
  transactionID: number;
  saleDate: string;
  departmentName: string;
  info: IProfileInfo;
}> = ({ transactionID, saleDate, departmentName, info }) => {
  const { info: coInfo } = useSelector(
    (state: RootState) => state.companySlice
  );
  return (
    <div className="bg-Highlighter">
      <div className="border font-Medium bg-cta px-2 py-1 text-base text-Highlighter text-highlighter text-center">
        مشخصات فاکتور
      </div>

      <div className="px-2">
        <span className="flex border-b justify-between p-2 bg-highlighter">
          <span className="text-sm">#{transactionID}</span>
          <span className="text-sm">
            {moment(saleDate).locale("fa").format("YYYY/MM/DD - HH:mm")}
          </span>
        </span>
      </div>
      <div className="font-Regular grid grid-cols-5 gap-1 items-center px-2 py-1">
        <span className="col-span-1 font-Regular bg-highlighter">فروشنده</span>
        <div className="col-span-4 flex gap-2 bg-highlighter items-center">
          <div className="flex items-center gap-2 pl-2 border-l-2 border-Secondary">
            <AntdLazyImage
              src={coInfo?.logoUrl ?? ""}
              alt="HoseinyLogo"
              width={70}
              height={50}
              loadingPriority={true}
              className={"w-[50px] [&_img]:!object-contain"}
            />
            <span>{coInfo.companyName ?? ""}</span>
          </div>
          <span>{departmentName}</span>
        </div>
      </div>
      <div className="grid grid-cols-5 text-primary gap-1 px-2 py-1 ">
        <span className="col-span-1 font-Regular bg-highlighter flex items-center">
          خریدار
        </span>
        <div className="col-span-4 text-sm flex items-center py-2 justify-between bg-highlighter">
          <span className="max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-1 font-Regular text-Primary">
            {info.mandatory.firstName} {info.mandatory.lastName}
          </span>
          <span className="font-Regular">{info.immutable.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailSummary;
