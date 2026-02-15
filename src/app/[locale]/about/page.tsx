import { ssrAbout } from "@/features/apiHandlers/serverHandlers/ssrAbout";
import { getPageSeo } from "@/service/getPageSeo";
import Breadcrumb from "@/shared/components/breadcrumb";
import JsonLd from "@/shared/components/json-ld";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const { Data } = await getPageSeo("about", locale);
    return buildMetadata(Data, locale);
  } catch {
    return fallbackMetadata(locale);
  }
}

async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const queryClient = new QueryClient();
  const { aboutData } = await ssrAbout(queryClient, locale);
  const { Data } = await getPageSeo("about", locale);

  const breadcrumbItems = [
    { label: tc("home"), href: "/" },
    { label: tc("about") },
  ];

  return (
    <>
      <JsonLd json={Data?.JsonLd} />
      <section className="pt-24 md:pt-52 lg:pt-40 xl:pt-36 md:mt-0 px-3 sm:px-5 lg:px-10 xl:px-0 max-w-[1200px] mx-auto">
        <Breadcrumb items={breadcrumbItems} separator="/" linkClassName="text-lake-blue-600 text-xs font-bold" textClassName="text-gray-400 text-xs font-bold" seperatorClassName="text-gray-200" />
        <section className="md:flex lg:gap-5 xl:gap-10 h-full md:mt-10">
          <section className="md:w-1/2 pt-8 md:pt-10">
            <p className="md:text-start mt-5 sm:mt-10 mb-8 text-[38px] md:text-5xl xl:text-[64px]">
              <b>{t("mostPopular")}</b>
            </p>
            <h1 className="md:text-start mt-2 mb-10 md:mb-16 text-[38px] md:text-5xl xl:text-5xl text-pink-500">
              <b>{t("womenHealthApp")}</b>
            </h1>
            <h2 className="md:text-start text-[13px] md:text-base xl:text-lg text-gray-600">{aboutData?.Content?.Text}</h2>
          </section>
          <section className="md:w-1/2 mt-5 md:mt-0 flex justify-center items-start xl:pe-10">
            <Image src={aboutData?.Content?.ImageUrl ?? "/illustration/Sara.png"} width={433} height={433} quality={100} alt="" priority />
          </section>
        </section>
      </section>
      <section className="bg-skin-50 py-10 px-10 sm:px-0 border-b-8 border-b-skin-100 flex justify-center flex-wrap gap-14 sm:gap-8 lg:gap-24 my-24">
        <section className="leaf px-12 sm:px-10 lg:px-12 flex flex-col justify-center items-center gap-2 h-20 w-60 sm:w-44 lg:w-60">
          <p><b className="text-skin-800 text-4xl sm:text-lg lg:text-4xl ltr">{aboutData?.Content?.MonthlyActiveUser}</b></p>
          <p className="text-skin-600 sm:text-xs lg:text-base">{t("monthlyActiveUsers")}</p>
        </section>
        <section className="leaf px-12 sm:px-10 lg:px-12 flex flex-col justify-center items-center gap-2 h-20 w-60 sm:w-44 lg:w-60">
          <p><b className="text-skin-800 text-4xl sm:text-lg lg:text-4xl ltr">{aboutData?.Content?.InstallCout}</b></p>
          <p className="text-skin-600 sm:text-xs lg:text-base">{t("downloads")}</p>
        </section>
        <section className="leaf px-12 sm:px-10 lg:px-12 flex flex-col justify-center items-center gap-2 h-20 w-60 sm:w-44 lg:w-60">
          <p><b className="text-skin-800 text-4xl sm:text-lg lg:text-4xl">{aboutData?.Content?.StartYear}</b></p>
          <p className="text-skin-600 sm:text-xs lg:text-base">{t("startYear")}</p>
        </section>
      </section>
    </>
  );
}

export default About;
