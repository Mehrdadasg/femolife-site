import { ssrInstallApp } from "@/features/apiHandlers/serverHandlers/ssrInstallApp";
import LinkCM from "@/shared/components/link";
import { QueryClient } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowCircleDown2 } from "iconsax-react";
import React from "react";

async function FixedAppBar() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "fixedAppBar" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const queryClient = new QueryClient();
  const { app } = await ssrInstallApp(queryClient, locale);

  return (
    <section className="flex md:hidden z-10 bg-pink-500 py-3 px-4 fixed bottom-0 right-0 left-0 items-center justify-between mt-2">
      <div>
        <p className="text-[10px] text-gray-100 mb-1">{t("oneStep")}</p>
        <p className="text-[13px] text-gray-50">{t("installNow")}</p>
      </div>
      <LinkCM href={app ?? ""} className="text-[13px]" variant="contained" color="white" title={tc("getApp")}>
        <ArrowCircleDown2 size={25} color="var(--color-pink-500)" />
        {tc("getApp")}
      </LinkCM>
    </section>
  );
}

export default FixedAppBar;
