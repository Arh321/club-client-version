import style from "@/styles/dots-loader-styles.module.css";

const DotsLoading = () => {
  return (
    <div className="relative animate-fadeIn">
      <span className={`${style["loader-otp"]} !text-cta`}></span>
    </div>
  );
};

export default DotsLoading;
