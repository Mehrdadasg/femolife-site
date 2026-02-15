import { ssrBlog } from "@/features/apiHandlers/serverHandlers/ssrBlog";
import BlogContent from "@/features/blog/components/BlogDetails/BlogContent";
import BlogHero from "@/features/blog/components/BlogDetails/BlogHero";
import RelatedBlog from "@/features/blog/components/BlogDetails/RelatedBlog";
import { getBlogSeo } from "@/service/getBlogSeo";
import JsonLd from "@/shared/components/json-ld";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";
import { QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ blogSlug: string; locale: string }> }) {
  const { blogSlug, locale } = await params;
  try {
    const { Data } = await getBlogSeo(blogSlug, locale);
    return buildMetadata(Data, locale);
  } catch { return fallbackMetadata(locale ?? "en"); }
}

async function BlogDetails({ params }: { params: Promise<{ blogSlug: string; locale: string }> }) {
  const { blogSlug, locale } = await params;
  if (!blogSlug) notFound();
  const queryClient = new QueryClient();
  let blog, seoData;

  try {
    const blogResponse = await ssrBlog({ queryClient, slug: blogSlug, locale });
    blog = blogResponse?.blog;
    if (!blog) notFound();
    seoData = await getBlogSeo(blogSlug, locale);
  } catch (error) {
    console.error("Error fetching blog or SEO data:", error);
    notFound();
  }

  return (
    <>
      <JsonLd json={seoData?.Data?.JsonLd} />
      <main className="w-full px-5 xl:px-0 max-w-7xl 2xl:max-w-[1366px] mx-auto py-24 md:py-28 lg:py-36 xl:py-40">
        <BlogHero blogHeroData={blog?.Content} />
        <BlogContent blog={blog} />
        <RelatedBlog slug={blogSlug} locale={locale} />
      </main>
    </>
  );
}

export default BlogDetails;
