import { ArrowLeft2 } from "iconsax-react";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

type MenuItems = { Title: string; Url: string };
type Props = { menuItems: MenuItems[]; onClose: () => void };

function MobileNavbarMenu({ menuItems, onClose }: Props) {
  const t = useTranslations("header");
  return (
    <nav aria-label={t("mainNav")}>
      <ul className="p-3 space-y-4">
        {menuItems?.map((menu) => (
          <li key={menu?.Title}>
            <Link href={menu?.Url} title={menu?.Title} onClick={onClose} className="flex justify-between items-center font-bold text-[13px]">
              {menu?.Title}
              <ArrowLeft2 size={16} color="var(--color-gray-500)" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MobileNavbarMenu;
