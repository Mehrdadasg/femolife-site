import { ssrLastedArticles } from "@/features/apiHandlers/serverHandlers/ssrLastedArticles";
import ArticleCard from "@/shared/components/article-card";
import LinkCM from "@/shared/components/link";
import { Article } from "@/shared/types/type";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import { ArrowLeft2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function LastedArticles({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "lastedArticles" });
  const queryClient = new QueryClient();
  const { lastedArticles } = await ssrLastedArticles(queryClient, locale);

  return (
    <section className="pt-5 pb-5 sm:pb-24 px-5 lg:px-10 xl:px-0">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex size-[44px] bg-orange-50 rounded-full justify-center items-center"><Image src="/fire.png" className="w-[19px] h-[23px]" width={19} height={23} alt="" /></span>
          <p className="text-[22px] sm:text-2xl font-semibold sm:font-bold">{lastedArticles?.Title}</p>
        </div>
        <Link href="/blog" className="hidden sm:flex h-[48px] rounded-[50px] border-pink-500 text-pink-500" title={t("visitMagazine")}>
          <span className="font-bold text-[13px]">{t("visitMagazine")}</span>
          <ArrowLeft2 size={20} color="var(--color-pink-500)" />
        </Link>
      </section>
      <section className="grid md:grid-cols-3 gap-10 mt-10">{lastedArticles?.Items.map((article: Article) => <ArticleCard key={article?.Id} article={article} />)}</section>
      <section className="flex justify-center pt-5">
        <LinkCM href="/blog" variant="outline" className="sm:hidden h-[48px] rounded-[50px] border-pink-500 text-pink-500 px-10" title={t("visitMagazine")}>
          <span className="font-bold text-[13px]">{lastedArticles?.SeeMoreText}</span>
        </LinkCM>
      </section>
    </section>
  );
}

export default LastedArticles;
