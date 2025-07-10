import { useSelector } from "react-redux";
import clsx from "clsx";
import { RootState } from "@/redux/store";
import AntdLazyImage from "../image-with-loader/image-with-loader";
import { useMemo } from "react";

interface CompanyLogoComponentProps {
  isFooter?: boolean;
  containerClass?: string;
  width?: number;
  height?: number;
  imageClass?: string;
  logoIconSize?: {
    width: string;
    height: string;
    color: string;
  };
}

const DEFAULT_DIMENSIONS = {
  width: 200,
  height: 200,
  imageWidth: "!w-[200px]",
  imageHeight: "!h-[100px]",
} as const;

const CompanyLogoComponent = ({
  containerClass,
  height = DEFAULT_DIMENSIONS.height,
  imageClass,
  width = DEFAULT_DIMENSIONS.width,
  isFooter,
}: CompanyLogoComponentProps) => {
  const { info } = useSelector((state: RootState) => state.companySlice);
  const containerClassName = clsx(
    containerClass ?? "w-full flex flex-col gap-4 items-center"
  );

  const imageClassName = clsx(
    imageClass ?? [
      DEFAULT_DIMENSIONS.imageWidth,
      DEFAULT_DIMENSIONS.imageHeight,
      `[&_img]:!object-contain`,
    ]
  );

  const src = useMemo(() => {
    const bodySrc = isFooter ? info.logoUrlFooter : info.logoUrl;
    return bodySrc ? "https://hubapi.loyaltyhub.ir" + bodySrc : "";
  }, [isFooter, info]);

  return (
    <div className={containerClassName}>
      {info && (
        <AntdLazyImage
          src={src}
          alt="HoseinyLogo"
          width={width}
          height={height}
          loadingPriority={true}
          className={imageClassName}
        />
      )}
    </div>
  );
};

const MemoizedCompanyLogoComponent = CompanyLogoComponent;
export default MemoizedCompanyLogoComponent;
