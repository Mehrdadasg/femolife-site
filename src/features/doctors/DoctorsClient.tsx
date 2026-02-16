"use client";
import React, { useState } from "react";
import Categories from "./Categories";
import { ExpertType } from "@/shared/types/type";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type CategoryType = { Id: number; Title: string; Slug: string };

function DoctorsClient({ expertPageData, expertCategories, expertList }: { expertPageData: any; expertCategories: CategoryType[]; expertList: ExpertType[] }) {
  const t = useTranslations("doctorPage");
  const [filteredExperts, setFilteredExperts] = useState<ExpertType[]>(expertList);
  const [activeCategory, setActiveCategory] = useState("");

  const handleFilter = (slug: string) => {
    if (slug === activeCategory) { setActiveCategory(""); setFilteredExperts(expertList); }
    else { setActiveCategory(slug); setFilteredExperts(expertList.filter((e) => e.Slug === slug)); }
  };

  return (
    <main className="bg-gray-100 pt-36 md:pt-40 -mt-[80px] md:mt-0 pb-20 px-5 md:px-10 xl:px-0">
      <section className="max-w-7xl 2xl:max-w-[1366px] mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center">{expertPageData?.Title}</h1>
        <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">{expertPageData?.Text}</p>
        <Categories categories={expertCategories} activeCategory={activeCategory} onFilter={handleFilter} />
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
          {filteredExperts.map((expert: ExpertType) => (
            <Link href={`/clinic/${expert.Slug}`} key={expert.Id} title={expert.Title} className="bg-white rounded-2xl p-5 flex flex-col items-center hover:shadow-lg transition-shadow">
              <Image src={expert.Avatar} className="rounded-full size-24 object-cover" width={96} height={96} alt={expert.Title} />
              <h2 className="font-bold mt-3">{expert.Title}</h2>
              <p className="text-sm text-gray-500 mt-1">{expert.SubTitle}</p>
            </Link>
          ))}
        </section>
        {filteredExperts.length === 0 && <p className="text-center text-gray-500 mt-10">{t("noExperts")}</p>}
      </section>
    </main>
  );
}

export default DoctorsClient;
