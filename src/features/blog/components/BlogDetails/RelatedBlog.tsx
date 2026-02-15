import { ssrRelatedList } from "@/features/apiHandlers/serverHandlers/ssrRelatedList";
import ArticleCard from "@/shared/components/article-card";
import Related from "@/shared/icons/Related";
import { Article } from "@/shared/types/type";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import React from "react";

async function RelatedBlog({ slug, locale }: { slug: string; locale: string }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const queryClient = new QueryClient();
  const { relatedList } = await ssrRelatedList({ queryClient, slug, locale });

  return (
    <>
      <div className="flex gap-3 items-center mt-20">
        <span className="size-11 hidden sm:flex justify-center items-center bg-blue-50 rounded-full">
          <Related width={24} height={24} />
        </span>
        <p className="text-lg sm:text-2xl font-semibold sm:font-bold">
          {t("relatedArticles")}{" "}
          {relatedList && relatedList.length > 0 ? relatedList[0]?.CategoryTitle : ""}
        </p>
      </div>
      <section className="grid sm:grid-cols-3 mt-10 gap-10">
        {relatedList?.map((post: Article) => <ArticleCard seoTag="h3" key={post?.Id} article={post} />)}
      </section>
    </>
  );
}

export default RelatedBlog;
