import PagesContainer from "@/components/pages-container/pages-container";
import HoseinyLogoText from "@/components/sharedIcons/hosseinyIcon";

import logo from "@/publicLOGO.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const AboutUsPage = () => {
  return (
    <PagesContainer>
      <div
        dir="rtl"
        className="w-full h-full overflow-y-auto pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]"
      >
        <h1 className="w-full text-center text-2xl font-Medium text-cta">
          درباره ما
        </h1>
        <p className="font-Regular text-center">
          آجیل و خشکبار برادران حسینی در سال 1342 توسط شادروان حاج حسین حسینی
          طاهر تاسیس گردید.ایده و نظر آن مرحوم همواره ارائه اجناس درجه یک با
          نازلترین قیمت و جلب نظر مشتریان گرامی بوده.اکنون برادران حسینی
          (فرزندان آن مرحوم) عهده دار این مسئولیت هستند. فروشگاه آجیل و خشکبار
          برادران حسینی با سپاس از خرید و ارج نهادن به اعتماد شما،همواره سعی در
          جلب رضایت شما مشتریان عزیز دارد.امید است توانسته باشیم گامی هر چند
          کوچک در ارتقاء سطح سلامتی جامعه خود داشته باشیم. از این رو مفتخریم در
          راستای حفظ کرامت مشتری و با توجه به حقوق مصرف کنندگان عزیز و رعایت
          موازین بهداشتی اقدام به ارائه محصولات خود در قالب بسته بندی مناسب و با
          استاندارد روز جهان بنماییم. امید است به یاری خداوند رزاق در زمینه عرضه
          و تولید آجیل و خشکبار موفق بوده و رضایت کامل شما هموطنان را فراهم
          نمائیم. آجیل و خشکبار برادران حسینی افتخار دارد که با همکاری اداره
          محترم استاندارد در راستای ارتقای کیفیت محصولات و حمایت از مصرف کنندگان
          عزیز تدوین استانداردهای ملی محصولات مغز بادام درختی،مغز بادام
          هندی،انواع تخمه آفتابگردان،تخمه کدو،تخمه هندوانه را به انجام رسانیده
          است.
        </p>

        <Link
          prefetch
          href={"/"}
          className="w-full flex flex-col gap-1 items-center"
        >
          <Image
            src={logo}
            alt="برادران حسینی"
            className="w-auto"
            width={200}
            height={200}
            priority
          />
          <HoseinyLogoText width="184" height="64" color="" />
        </Link>
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
          <a href="mailto:support@hosseinibrothers.com" aria-label="Send Email">
            <Icon icon="material-symbols:mail-outline" width="44" height="44" />
          </a>
        </p>
      </div>
    </PagesContainer>
  );
};

export default memo(AboutUsPage);
