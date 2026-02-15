"use client";
import Button from "@/shared/components/button";
import React from "react";
import { useTranslations } from "next-intl";

type CategoryType = { Id: number; Title: string; Slug: string };

function Categories({ categories, activeCategory, onFilter }: { categories: CategoryType[]; activeCategory: string; onFilter: (slug: string) => void }) {
  const t = useTranslations("doctorPage");
  return (
    <section className="flex flex-wrap gap-3 justify-center mt-8">
      {categories?.map((cat) => (
        <Button key={cat.Id} onClick={() => onFilter(cat.Slug)} variant={activeCategory === cat.Slug ? "contained" : "outline"} color={activeCategory === cat.Slug ? "blue" : "light-blue"} className="!rounded-full text-sm">
          {cat.Title}
        </Button>
      ))}
    </section>
  );
}

export default Categories;
