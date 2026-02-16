"use client";
import { Add, HambergerMenu, SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavbarMenu from "./NavbarMenu";
import { motion, AnimatePresence } from "framer-motion";
import NavbarSearch from "./NavbarSearch";
import MobileNavbarMenu from "./MobileNavbarMenu";
import LinkCM from "@/shared/components/link";
import Button from "@/shared/components/button";
import LanguageSwitcher from "@/shared/components/language-switcher";
import { useTranslations } from "next-intl";

type MenuItemsType = { Title: string; Url: string; Id: number };
type HeaderDataType = { Logo: string; DownloadAppUrl: string; MenuItems: MenuItemsType[]; LogoAlt: string };

function MainHeader({ headerData }: { headerData: HeaderDataType }) {
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => { setSearchBoxOpen(false); setMenuOpen(!menuOpen); };
  const handleOpenSearcBox = () => { setMenuOpen(false); setSearchBoxOpen(!searchBoxOpen); };
  const handleCloseSearchBox = () => { setSearchBoxOpen(false); };

  return (
    <div className="shadow-md bg-white rounded-3xl md:rounded-[40px] lg:py-4 px-1 md:px-4 xl:px-6">
      <section className="flex items-center justify-between w-full">
        <Button type="button" onClick={handleOpenMenu} size="icon" color="primary" variant="text" className="!px-0 lg:!hidden">
          {menuOpen ? <Add size={28} color="var(--color-pink-500" className="rotate-45" /> : <HambergerMenu color="var(--color-pink-500)" size={28} />}
        </Button>
        <section className="lg:w-[217px] flex items-center">
          <Link href="/" aria-label={t("homeLink")} className="w-max inline-block" title={t("homeLink")}>
            <Image className="h-6 sm:h-8 w-auto" src={headerData?.Logo || "/logo/black-h-logo.png"} width={212} height={32} quality={100} priority alt={headerData?.LogoAlt || t("logoAlt")} />
          </Link>
        </section>
        <NavbarMenu menuItems={headerData?.MenuItems} />
        <section className="lg:w-[317px] flex items-center justify-end gap-3">
          <LanguageSwitcher />
          <Button type="button" aria-label={t("openSearch")} onClick={handleOpenSearcBox} size="icon" color="primary" variant="text" className={`cursor-pointer rounded-full ${searchBoxOpen ? "!bg-pink-500 text-white" : ""}`}>
            <SearchNormal1 variant="Linear" size={20} color={searchBoxOpen ? "#fff" : "var(--color-pink-500)"} />
          </Button>
          <LinkCM href={headerData?.DownloadAppUrl} variant="contained" color="primary" target="_blank" aria-label={tc("getApp")} className="text-[13px] !hidden lg:!flex" title={tc("getApp")}>
            {tc("getApp")}
          </LinkCM>
        </section>
      </section>
      <AnimatePresence>
        {searchBoxOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <NavbarSearch onClose={handleCloseSearchBox} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <MobileNavbarMenu onClose={() => setMenuOpen(false)} menuItems={headerData?.MenuItems} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainHeader;
