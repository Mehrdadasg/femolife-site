import { ssrBlogList } from "@/features/apiHandlers/serverHandlers/ssrBlogList";
import { ssrCategoriesList } from "@/features/apiHandlers/serverHandlers/ssrCategoriesList";
import CategoriesListClient from "@/features/blog/components/CategoriesListClient";
import { getCategorySeo } from "@/service/getCategorySeo";
import ArticleCard from "@/shared/components/article-card";
import JsonLd from "@/shared/components/json-ld";
import { Pagination } from "@/shared/components/pagination";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category: string }>;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const { Data } = await getCategorySeo("", locale);
    return buildMetadata(Data, locale);
  } catch {
    return fallbackMetadata(locale);
  }
}

export default async function BlogMainPage({ searchParams, params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const queryClient = new QueryClient();
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  let blogList;
  try {
    const result = await ssrBlogList({ queryClient, page: currentPage, category: "", locale });
    blogList = result.blogList;
  } catch (error) {
    console.error("Failed to fetch blog list:", error);
    return <div>{t("errorLoading")}</div>;
  }

  const totalCount = blogList?.RecordeCount || 0;
  const pageSize = blogList?.PageSize || 12;
  const { categories } = await ssrCategoriesList(queryClient, locale);
  const seoData = await getCategorySeo("", locale);

  return (
    <>
      <JsonLd json={seoData?.Data?.JsonLd} />
      <main className="pt-24 md:py-36 w-full px-4 lg:px-10 xl:px-0 max-w-7xl 2xl:max-w-[1366px] mx-auto">
        <section className="flex gap-5 items-center">
          <span className="size-11 flex justify-center items-center bg-lake-blue-50 rounded-full">
            <Image src="/glass.png" width={24} height={24} alt="glass" />
          </span>
          <p className="font-bold text-2xl">{t("chooseCategory")}</p>
        </section>
        <CategoriesListClient categories={categories} currentCategory="" />
        <section className="flex items-center gap-3">
          <span className="hidden sm:flex size-[44px] bg-orange-50 rounded-full justify-center items-center">
            <Image src="/fire.png" className="w-[19px] h-[23px]" width={19} height={23} alt="" />
          </span>
          <h1 className="text-[22px] sm:text-2xl font-semibold sm:font-bold">{t("latestArticles")}</h1>
        </section>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {blogList?.Items?.map((article) => (
            <ArticleCard key={article.Id} article={article} />
          ))}
        </section>
        <section className="mt-5">
          <Pagination totalCount={totalCount} pageSize={pageSize} currentPage={currentPage} />
        </section>
      </main>
    </>
  );
}
