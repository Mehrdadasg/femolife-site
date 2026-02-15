import { ssrPregnancyFeature } from "@/features/apiHandlers/serverHandlers/ssrPregnancyFeature";
import Feature from "@/shared/components/feature";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import React from "react";

async function PregnancyFeatures({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "features" });
  const queryClient = new QueryClient();
  const { pregnancyFeature } = await ssrPregnancyFeature(queryClient, locale);
  const features = pregnancyFeature?.Features;

  return (
    <Feature cardItems={features}
      title={<>{locale === "ar" ? <>ماذا نقدم لكِ خلال <mark className="text-pink-600 bg-white">فترة الحمل</mark>؟</> : <>What do we have for you during <mark className="text-pink-600 bg-white">pregnancy</mark>?</>}</>}
      description={pregnancyFeature?.Text} imageAlt={pregnancyFeature?.Title} imageSrc={pregnancyFeature?.ImageUrl} mobileTwoRows />
  );
}

export default PregnancyFeatures;
