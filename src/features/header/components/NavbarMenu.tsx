import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

type MenuItems = { Title: string; Url: string; Id: number };
type Props = { menuItems: MenuItems[] };

function NavbarMenu({ menuItems }: Props) {
  const t = useTranslations("header");
  return (
    <nav className="grow hidden lg:flex justify-center" aria-label={t("mainNav")}>
      <ul className="flex gap-5 xl:gap-10 items-center">
        {menuItems?.map((menu) => <li key={menu?.Id}><Link title={menu?.Title} href={menu?.Url}><b>{menu?.Title}</b></Link></li>)}
      </ul>
    </nav>
  );
}

export default NavbarMenu;
