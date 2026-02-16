"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname,Link } from "@/i18n/navigation";
import { routing  } from "@/i18n/routing";
import { Global } from "iconsax-react";
import React from "react";

const localeLabels: Record<string, string> = {
  en: "EN",
  ar: "عربي",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
    const nextLocale = locale === "en" ? "ar" : "/";

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

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
