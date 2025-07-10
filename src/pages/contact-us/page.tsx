import PagesContainer from "@/components/pages-container/pages-container";
import { Icon } from "@iconify/react/dist/iconify.js";
import { memo } from "react";

const ContactUs = () => {
  const departments = [
    {
      departmentInfo_ID: 0,
      depName: "توحید",
      tel: "05137257841",
      depAddress:
        "شعبه مرکزی: محله سعد آباد، خیابان سنائی [سناباد 5]، میدان توحید، پلاک 618، طبقه همکف.",
      depLocation: "36.3039942,59.5978014",
      city_ID: null,
      timeWork: "10 الی 23",
      depProvince: "",
    },
    {
      departmentInfo_ID: 0,
      depName: "وکیل آباد",
      tel: "05138909700",
      depAddress: "شعبه2: بلوار وکیل آباد،نبش وکیل آباد 36",
      depLocation: "36.3298773,59.4908451",
      city_ID: null,
      timeWork: "10 الی 23",
      depProvince: "",
    },
  ];
  const iconContent = [
    {
      icon: <span className="pi pi-envelope"></span>,
      title: "ایمیل",
      description: ".",
    },
    {
      icon: <span className="pi pi-globe"></span>,
      title: "وبسایت",
      description: "",
    },
  ];

  return (
    <PagesContainer>
      <div
        dir="rtl"
        className="w-full h-full overflow-y-auto pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]"
      >
        <h1 className="w-full text-center text-2xl font-Medium text-cta">
          تماس با ما
        </h1>
        <p className="font-Medium w-full flex flex-col gap-4">
          <span className="flex  items-start gap-2">
            <Icon
              icon="tabler:clock-hour-9"
              width="1.8rem"
              height="1.8rem"
              style={{ color: "var(--cta)" }}
            />
            <span>
              ساعات پشتیبانی همه روزه از ۹ الی ۲۱ (پیگیری سفارشات ۹ صبح تا ۱۸)
            </span>
          </span>
          <span className="flex  items-start gap-2">
            <Icon
              icon="icon-park-outline:send"
              width="2.8rem"
              height="1.4rem"
              style={{ color: "var(--cta)" }}
            />
            <span>
              ارسال سفارشات مشهد بجز روزهای تعطیل از ۱۰ تا ۲۰:۳۰ و جمعه‌ها از ۱۰
              تا ۱۷ ( ساعت پشتیبانی جمعه ها از ساعت ۱۰ تا ۱۷)
            </span>
          </span>
          <span className="flex  items-start gap-2">
            <Icon
              icon="ic:round-mail"
              width="24"
              height="24"
              style={{ color: "var(--cta)" }}
            />
            <a
              href="mailto:support@hosseinibrothers.com"
              aria-label="Send Email"
            >
              support@hosseinibrothers.com
            </a>
          </span>
        </p>
        {departments.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4  font-Regular">
              <h2 className="flex gap-1 items-center regular-14">
                <span className="pi pi-map-marker text-xl"></span>
                <span className="text-xl">{item.depName}</span>
              </h2>
              <div className=" bg-Highlighter rounded-lg p-4 gap-3 flex flex-col light-12">
                <p className="flex justify-start">{item?.depAddress}</p>
                <div className="flex w-2/3 justify-between gap-4 light-12">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <Icon
                        icon="iconamoon:phone"
                        width="24"
                        height="24"
                        className="text-cta"
                      />
                      <span className="whitespace-nowrap">تلفن شعبه</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Icon
                        icon="ion:time-outline"
                        width={24}
                        className="text-cta"
                      />
                      <span className="whitespace-nowrap">ساعت کاری</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span style={{ direction: "ltr" }}>{item.tel}</span>
                    <span style={{ direction: "rtl" }}>
                      {item.timeWork ? item.timeWork : "  10 الی 23 "}
                    </span>
                  </div>
                </div>
                <div className="border-b border-tertiary"></div>
                <span>ما را دنبال کنید</span>
                <p className="w-full flex items-center justify-center gap-4">
                  <a
                    href="https://www.instagram.com/hosseinibrothers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Instagram"
                  >
                    <Icon icon="skill-icons:instagram" width="40" height="40" />
                  </a>
                  <a
                    href="https://t.me/hosseinibrothers"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Telegram"
                  >
                    <Icon icon="logos:telegram" width="40" height="40" />
                  </a>
                  <a
                    href="https://hosseinibrothers.ir/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Website"
                  >
                    <Icon icon="streamline:web" width="40" height="40" />
                  </a>
                  <a
                    href="mailto:support@hosseinibrothers.com"
                    aria-label="Send Email"
                  >
                    <Icon
                      icon="material-symbols:mail-outline"
                      width="44"
                      height="44"
                    />
                  </a>
                </p>
              </div>
              <iframe
                className="w-full border border-tertiary rounded-lg"
                height="144"
                src={`https://maps.google.com/maps?q=${item.depLocation}&hl=es;z=14&output=embed`}
              ></iframe>
            </div>
          );
        })}
      </div>
    </PagesContainer>
  );
};

export default memo(ContactUs);
