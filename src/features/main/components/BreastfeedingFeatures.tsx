import { ssrBreastFeedingFeature } from "@/features/apiHandlers/serverHandlers/ssrBreastFeedingFeature";
import Feature from "@/shared/components/feature";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import React from "react";

async function BreastfeedingFeatures({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "features" });
  const queryClient = new QueryClient();
  const { pregnancyFeature } = await ssrBreastFeedingFeature(queryClient, locale);
  const features = pregnancyFeature?.Features;

  return (
    <Feature cardItems={features}
      title={<>{locale === "ar" ? <>ماذا نقدم لكِ خلال <mark className="text-pink-600 bg-white">فترة الرضاعة</mark>؟</> : <>What do we have for you during <mark className="text-pink-600 bg-white">breastfeeding</mark>?</>}</>}
      description={pregnancyFeature?.Text} imageAlt={pregnancyFeature?.Title} imageSrc={pregnancyFeature?.ImageUrl} mobileTwoRows />
  );
}

export default BreastfeedingFeatures;
