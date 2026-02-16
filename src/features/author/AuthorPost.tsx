"use client";
import { useBlogList } from "@/features/apiHandlers/clientHandlers/useBlogList";
import ArticleCard from "@/shared/components/article-card";
import { Pagination } from "@/shared/components/pagination";
import { Article, Blog } from "@/shared/types/type";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const pageSize = 10;

function AuthorPost({ slug, currentPage }: { slug: string; currentPage: number }) {
  const t = useTranslations("common");
  const { mutateAsync: blogListFunc } = useBlogList();
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogListFunc({ page: currentPage, authorSlug: slug });
        if (response?.Data?.Items?.length > 0) { setBlogList(response.Data.Items); setTotalCount(response.Data.RecordeCount); }
      } catch (error) { console.error(error); }
    };
    fetchBlogs();
  }, [currentPage, slug]);

  return (
    <>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {blogList.map((article: Article) => <ArticleCard key={article.Id} article={article} />)}
      </section>
      {totalCount > pageSize && <section className="mt-5"><Pagination totalCount={totalCount} pageSize={pageSize} currentPage={currentPage} /></section>}
    </>
  );
}

export default AuthorPost;
