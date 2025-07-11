import logo from "/404-club.webp";
import { Link } from "react-router";

const NotFoundComponent = () => {
  return (
    <div className="w-full grow  no-scrollbar overflow-y-auto bg-BG rounded-t-[20px]  -mt-[12px]">
      <div className=" w-full h-[calc(100vh-180px)] relative  flex flex-col items-center justify-center">
        <div className="w-full h-max flex flex-col items-center justify-center gap-4">
          <div className="w-full flex flex-col gap-4 items-center">
            <img
              src={logo}
              alt="not-found"
              className=""
              fetchPriority="high"
              width={200}
              height={200}
            />
          </div>
          <p className="w-full flex flex-col items-center text-cta justify-center gap-[10px] font-Medium">
            <span className="bold-16">متاسفیم</span>
            <span className="w-1/2 flex flex-col gap-2 text-tertiary regular-14 text-center">
              صفحه ای که به دنبال آن هستید وجود ندارد
            </span>
          </p>
          <Link
            to={"/"}
            className="font-Medium bg-cta text-Highlighter p-3 text-lg rounded-lg w-max"
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundComponent;
