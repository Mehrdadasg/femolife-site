import { ssrAuthor } from "@/features/apiHandlers/serverHandlers/ssrAuthor";
import AuthorPost from "@/features/author/AuthorPost";
import { getAuthorSeo } from "@/service/getAuthorSeo";
import Breadcrumb from "@/shared/components/breadcrumb";
import JsonLd from "@/shared/components/json-ld";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ authorSlug: string; locale: string }> }) {
  const { authorSlug, locale } = await params;
  try {
    const { Data } = await getAuthorSeo(authorSlug, locale);
    return buildMetadata(Data, locale);
  } catch { return fallbackMetadata(locale); }
}

async function Author({ params, searchParams }: { params: Promise<{ authorSlug: string; locale: string }>; searchParams: Promise<{ page?: string }> }) {
  const { authorSlug, locale } = await params;
  if (!authorSlug) notFound();
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const t = await getTranslations({ locale, namespace: "authorPage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const queryClient = new QueryClient();
  const { author } = await ssrAuthor({ queryClient, slug: authorSlug, locale });
  const { Data } = await getAuthorSeo(authorSlug, locale);

  const breadcrumbItems = [
    { label: tc("home"), href: "/" },
    { label: tc("magazine"), href: "/blog" },
    { label: t("authorPosts").split(" ")[0] },
  ];

  return (
    <>
      <JsonLd json={Data?.JsonLd} />
      <main className="w-full px-5 xl:px-0 max-w-7xl 2xl:max-w-[1366px] mx-auto py-24 md:py-40">
        <Breadcrumb items={breadcrumbItems} separator="/" linkClassName="text-lake-blue-600 text-xs" textClassName="text-gray-400 text-xs" seperatorClassName="text-gray-200" />
        <section className="flex gap-10 items-center my-10">
          <section className="size-[110px] md:size-60 rounded-full">
            <Image src={author?.Content?.MainImageUrl ?? "/user2.png"} className="size-[110px] md:size-60 rounded-full object-cover" alt={author?.Content?.MainImageUrl ?? "Author"} width={240} height={240} />
          </section>
          <section>
            <h1 className="text-[22px] xl:text-5xl"><b>{author?.Content?.Title}</b></h1>
            <h2 className="text-lg mt-5">{t("nutritionExpert")}</h2>
          </section>
        </section>
        <section className="flex items-center gap-3 mt-16">
          <span className="hidden sm:flex size-[44px] bg-orange-50 rounded-full justify-center items-center"><Image src="/fire.png" className="w-[19px] h-[23px]" width={19} height={23} alt="" /></span>
          <p className="text-[22px] sm:text-2xl font-semibold sm:font-bold">{t("authorPosts")}</p>
        </section>
        <AuthorPost slug={authorSlug} currentPage={currentPage} />
      </main>
    </>
  );
}

export default Author;
