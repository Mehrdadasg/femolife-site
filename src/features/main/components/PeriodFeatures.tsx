import { ssrPeriodFeature } from "@/features/apiHandlers/serverHandlers/ssrPeriodFeature";
import Feature from "@/shared/components/feature";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import React from "react";

async function PeriodFeatures({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "features" });
  const queryClient = new QueryClient();
  const { periodFeature } = await ssrPeriodFeature(queryClient, locale);
  const features = periodFeature?.Features;

  return (
    <Feature cardItems={features}
      title={<>{locale === "ar" ? <>ماذا نقدم لكِ خلال <mark className="text-pink-600 bg-white">فترة الدورة الشهرية</mark>؟</> : <>What do we have for you during your <mark className="text-pink-600 bg-white">menstrual period</mark>?</>}</>}
      description={periodFeature?.Text} imageAlt={periodFeature?.Title} imageSrc={periodFeature?.ImageUrl} />
  );
}

export default PeriodFeatures;
