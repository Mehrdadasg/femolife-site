import { ssrBlogList } from "@/features/apiHandlers/serverHandlers/ssrBlogList";
import { ssrCategoriesList } from "@/features/apiHandlers/serverHandlers/ssrCategoriesList";
import CategoriesListClient from "@/features/blog/components/CategoriesListClient";
import { getCategorySeo } from "@/service/getCategorySeo";
import ArticleCard from "@/shared/components/article-card";
import JsonLd from "@/shared/components/json-ld";
import { Pagination } from "@/shared/components/pagination";
import { CategoryType } from "@/shared/types/type";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category: string }>;
  params: Promise<{ categoryId: string; locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ categoryId: string; locale: string }> }) {
  const { categoryId, locale } = await params;
  try {
    const { Data } = await getCategorySeo(categoryId, locale);
    return buildMetadata(Data, locale);
  } catch { return fallbackMetadata(locale); }
}

async function CategoryPage({ params, searchParams }: BlogPageProps) {
  const { categoryId: slug, locale } = await params;
  if (!slug) notFound();
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const tc = await getTranslations({ locale, namespace: "categoryPage" });
  const queryClient = new QueryClient();
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  let blogList, seoData;
  try {
    const result = await ssrBlogList({ queryClient, page: currentPage, category: slug, locale });
    blogList = result.blogList;
    seoData = await getCategorySeo(slug, locale);
  } catch (error) {
    console.error("Failed to fetch blog list:", error);
    return <div>{t("errorLoading")}</div>;
  }

  const totalCount = blogList?.RecordeCount || 0;
  const pageSize = 10;
  const { categories } = await ssrCategoriesList(queryClient, locale);
  const selectedCategory = categories?.find((c: CategoryType) => c.Slug === slug);

  return (
    <main className="pt-24 md:py-36 w-full px-4 lg:px-10 xl:px-0 max-w-7xl 2xl:max-w-[1366px] mx-auto">
      <JsonLd json={seoData?.Data?.JsonLd} />
      <section className="flex gap-5 items-center">
        <span className="size-11 flex justify-center items-center bg-lake-blue-50 rounded-full"><Image src="/glass.png" width={24} height={24} alt="glass" /></span>
        <p className="font-bold text-2xl">{t("chooseCategory")}</p>
      </section>
      <CategoriesListClient categories={categories} currentCategory="" />
      <section className="flex items-center gap-3">
        <span className="hidden sm:flex size-[44px] bg-orange-50 rounded-full justify-center items-center"><Image src="/fire.png" className="w-[19px] h-[23px]" width={19} height={23} alt="" /></span>
        <h1 className="text-[22px] sm:text-2xl font-semibold sm:font-bold">{tc("latestArticlesIn", { category: selectedCategory?.Title ?? "" })}</h1>
      </section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">{blogList?.Items?.map((article) => <ArticleCard key={article.Id} article={article} />)}</section>
      <section className="mt-5"><Pagination totalCount={totalCount} pageSize={pageSize} currentPage={currentPage} /></section>
    </main>
  );
}

export default CategoryPage;
