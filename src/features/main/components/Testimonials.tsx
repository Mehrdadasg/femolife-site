import Image from "next/image";
import React from "react";
import CommentSwiper from "./CommentSwiper";
import { QueryClient } from "@tanstack/react-query";
import { ssrTestimonials } from "@/features/apiHandlers/serverHandlers/ssrTestimonials";
import { getTranslations } from "next-intl/server";

async function Testimonials({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "testimonials" });
  const queryClient = new QueryClient();
  const { testimonialsData } = await ssrTestimonials(queryClient, locale);

  return (
    <section className="px-5 sm:px-5 lg:px-28 2xl:px-20 pt-5 pb-5 sm:pb-10 relative overflow-hidden">
      <h2 className="font-semibold text-2xl md:text-4xl flex gap-1 justify-center">
        {t("title")}
        <Image src="/logo/typo.png" width={70} height={37} alt={t("title")} className="h-6 md:h-[37px] w-auto md:w-[70px]" />
      </h2>
      <CommentSwiper testimonialsData={testimonialsData?.Items} locale={locale} />
    </section>
  );
}

export default Testimonials;
