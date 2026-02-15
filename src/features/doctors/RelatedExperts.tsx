import { ssrRelatedExpert } from "@/features/apiHandlers/serverHandlers/ssrRelatedExpert";
import { ExpertType } from "@/shared/types/type";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function RelatedExperts({ slug, locale }: { slug: string; locale: string }) {
  const t = await getTranslations({ locale, namespace: "doctorPage" });
  const queryClient = new QueryClient();
  const { relatedExpert } = await ssrRelatedExpert({ queryClient, slug, locale });

  if (!relatedExpert || relatedExpert.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto py-16 px-5 md:px-0">
      <h2 className="text-2xl font-bold mb-8">{t("relatedExperts")}</h2>
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedExpert.map((expert: ExpertType) => (
          <Link href={`/clinic/${expert.Slug}`} key={expert.Id} title={expert.Title} className="bg-gray-100 rounded-2xl p-5 flex flex-col items-center hover:shadow-lg transition-shadow">
            <Image src={expert.Avatar} className="rounded-full size-20 object-cover" width={80} height={80} alt={expert.Title} />
            <h3 className="font-bold mt-3 text-center">{expert.Title}</h3>
            <p className="text-sm text-gray-500 mt-1 text-center">{expert.SubTitle}</p>
          </Link>
        ))}
      </section>
    </section>
  );
}

export default RelatedExperts;
