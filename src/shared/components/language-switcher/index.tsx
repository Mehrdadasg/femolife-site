"use client";
import { useLocale } from "next-intl";
import { usePathname,Link } from "@/i18n/navigation";
import { Global } from "iconsax-react";
import React from "react";


export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
    const nextLocale = locale === "en" ? "ar" : "/";


  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      <Global size={16} color="var(--color-gray-500)" />
      <span>{locale === "en" ? "عربي" : "EN"}</span>
    </Link>
  );
}
