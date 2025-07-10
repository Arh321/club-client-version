import { memo } from "react";
import PagesContainer from "../pages-container/pages-container";
import style from "@/styles/pages-loader-style.module.css";
const PagesLoaderComponent = () => {
  return (
    <PagesContainer>
      <div className="w-full h-full grow flex justify-center items-center">
        <div className={style["loader"]}></div>
      </div>
    </PagesContainer>
  );
};

const MemoizedPagesLoaderComponent = memo(PagesLoaderComponent);

export default MemoizedPagesLoaderComponent;
