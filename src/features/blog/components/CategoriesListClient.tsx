"use client";
import { CategoryType } from "@/shared/types/type";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

function CategoriesListClient({ categories, currentCategory }: { categories: CategoryType[]; currentCategory: string }) {
  const t = useTranslations("blogPage");
  return (
    <section className="flex flex-wrap gap-3 my-8">
      <Link href="/blog" className={`px-4 py-2 rounded-full text-sm border ${!currentCategory ? "bg-lake-blue-500 text-white border-lake-blue-500" : "border-lake-blue-200 text-lake-blue-500"}`}>
        {t("allCategories")}
      </Link>
      {categories?.map((category: CategoryType) => (
        <Link key={category.Id} href={`/category/${category.Slug}`} className={`px-4 py-2 rounded-full text-sm border ${currentCategory === category.Slug ? "bg-lake-blue-500 text-white border-lake-blue-500" : "border-lake-blue-200 text-lake-blue-500"}`}>
          {category.Title}
        </Link>
      ))}
    </section>
  );
}

export default CategoriesListClient;
