const MembershopReqCardComponent = () => {
  return (
    <div className="w-full h-[60px] bg-Highlighter rounded-[10px] overflow-hidden px-[12px] py-[10px]">
      <div
        style={{
          backgroundImage: "url(/images/Lines.png)",
        }}
        className="w-full h-full"
      >
        <div
          style={{
            backgroundImage: "url(/images/Vector.webp)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-full flex justify-center items-center font-Bold text-sm"
        >
          درخواست کارت عضویت
        </div>
      </div>
    </div>
  );
};

export default MembershopReqCardComponent;
