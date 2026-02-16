import Image from "next/image";
import Link from "next/link";
import React from "react";
import DesktopFooterItem from "./components/DesktopFooterItem";
import { QueryClient } from "@tanstack/react-query";
import { ssrFooter } from "../apiHandlers/serverHandlers/ssrFooter";
import MobileFooterItems from "./components/MobileFooterItems";
import EnamadBadge from "./components/Enamad";
import Social from "./components/Social";
import { getLocale, getTranslations } from "next-intl/server";

async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "common" });
  const queryClient = new QueryClient();
  const { footer } = await ssrFooter(queryClient, locale);

  return (
    <footer className="mt-auto">
      <section className="md:hidden px-5 pb-5 md:px-0">
        <Image src={footer?.Logo || "/logo/black-h-logo.png"} width={108} height={32} alt={t("siteName")} />
        <p className="text-gray-900 mt-8 text-[13px] leading-7">{footer?.Text}</p>
      </section>
      <section className="footer h-[130px] w-full"></section>
      <section className="bg-skin-50 pb-16 md:pb-3 px-3 md:px-5 lg:px-10 xl:px-12 pt-8 -mt-[100px] md:-mt-[115px] lg:-mt-[110px] xl:-mt-[100px]">
        <section className="flex md:gap-5">
          <section className="hidden md:block w-1/3">
            <Image src={footer?.Logo || "/logo/black-h-logo.png"} width={108} height={32} alt={t("siteName")} />
            <p className="text-skin-800 mt-5 lg:mt-8 md:text-[13px] lg:text-[14px] xl:text-base leading-6 xl:leading-8">{footer?.Text}</p>
          </section>
          <DesktopFooterItem link={footer?.EnamadUrl} img={footer?.EnamadImageUrl} menu={footer?.MenuItems} />
        </section>
        <MobileFooterItems menu={footer?.MenuItems} />
        <div className="w-full h-0.5 bg-skin-100 mt-10 mb-5"></div>
        <section className="flex flex-col-reverse gap-5 md:flex-row justify-between items-center py-3">
          <p className="text-[10px] md:text-sm text-skin-400">
            {t("copyright")}{" "}
            <mark className="bg-transparent text-skin-500"><Link href="/" title={t("appName")}>{t("appName")}</Link></mark>
          </p>
          <nav className="flex items-center w-full sm:w-max sm:gap-10">
            <Social instaUrl={footer?.InstagramUrl} youtubeUrl={footer?.YoutubeUrl} />
            <section className="md:hidden"></section>
          </nav>
        </section>
      </section>
    </footer>
  );
}

export default Footer;
