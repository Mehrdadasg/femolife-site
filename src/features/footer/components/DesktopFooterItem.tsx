import { MenuItems } from "@/shared/types/type";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

type FooterMenu = { Id: number; Url: string; Title: string };
type Props = { link: string; img: string; menu: FooterMenu[] };

function DesktopFooterItem({  menu }: Props) {
  const t = useTranslations("common");
  const firstColumn = menu?.slice(0, 6);
  const secondColumn = menu?.slice(6);
  return (
    <section className="hidden md:w-2/3 xl:px-[10%] md:flex gap-5">
      <section className="md:w-3/4">
        <h2><mark className="bg-transparent text-skin-800 md:text-base lg:text-lg font-semibold">{t("appName")}</mark></h2>
        <nav className="text-skin-800 text-sm mt-8 text-[13px] lg:text-[14px] xl:text-base">
          <div className="grid grid-cols-2 gap-3">
            <ul className="space-y-3">{firstColumn.map((item: MenuItems) => <li key={item?.Id}><Link href={item?.Url} title={item?.Title}>{item?.Title}</Link></li>)}</ul>
            <ul className="space-y-3">{secondColumn.map((item: MenuItems) => <li key={item?.Id}><Link href={item?.Url} title={item?.Title}>{item?.Title}</Link></li>)}</ul>
          </div>
        </nav>
      </section>
      <section className="md:w-1/4 pt-14"></section>
    </section>
  );
}

export default DesktopFooterItem;
