"use client";
import { useBlogList } from "@/features/apiHandlers/clientHandlers/useBlogList";
import { useRecommendedList } from "@/features/apiHandlers/clientHandlers/useRecommendedList";
import ArticleCard from "@/shared/components/article-card";
import { Pagination } from "@/shared/components/pagination";
import { Article, Blog } from "@/shared/types/type";
import { Add, SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";


const pageSize = 10;

function SearchContent() {
  const t = useTranslations("searchPage");
  const tc = useTranslations("common");
  const router = useRouter();
  const resolvedCurrentPage = useSearchParams().get("page");
  const currentPage = Number(resolvedCurrentPage) || 1;
  const resolvedSearchKey = useSearchParams().get("searchKey") || "";
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [recommendedList, setRecommendedList] = useState<Blog[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const { mutateAsync: blogListFunc } = useBlogList();
  const { mutateAsync: recommendedListFunc } = useRecommendedList();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locale = useLocale();

  useEffect(() => { setSearchKey(resolvedSearchKey); }, [resolvedSearchKey]);

  const handleBlogList = async (searchValue: string) => {
    try {
      const response = await blogListFunc({ page: 1, searchKey: searchValue });
      if (response?.Data?.Items?.length > 0) {
        setBlogList(response?.Data?.Items); setTotalCount(response?.Data?.RecordeCount); setHasResult(true);
      } else { setBlogList([]); setTotalCount(0); setHasResult(false); }
    } catch (error) { console.error("Failed to fetch blog list:", error); }
  };

  const handleRecommended = async () => {
    try {
      const response = await recommendedListFunc(locale);
      if (response?.Data?.length > 0) setRecommendedList(response.Data); else setRecommendedList([]);
    } catch (error) { console.error("Failed to fetch recommended posts:", error); }
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      if (searchKey.length >= 3) { setIsSearching(true); router.push(`/search?searchKey=${searchKey}`); handleBlogList(searchKey); }
      else { setIsSearching(false); setTotalCount(0); router.push("/search"); handleRecommended(); }
    }, 500);
    return () => { if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current); };
  }, [searchKey]);

  return (
    <main className="pt-24 md:py-40 w-full px-4 lg:px-10 xl:px-0 max-w-7xl 2xl:max-w-[1366px] mx-auto">
      <section className="max-w-3xl mx-auto">
        <section className="bg-gray-100 flex items-center rounded-[8px] px-3 gap-3">
          <button type="button" onClick={() => setSearchKey("")}><Add size={24} color="var(--color-gray-800)" className="rotate-45" /></button>
          <input type="text" placeholder={t("searchPlaceholder")} className="grow bg-transparent focus:border-0 focus:outline-0 h-12" aria-label={t("searchPlaceholder")} value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
          <SearchNormal1 size={24} color="var(--color-lake-blue-500)" />
        </section>
        {blogList?.length > 0 && hasResult && <p className="mt-5">{t("resultsCount", { count: totalCount })}</p>}
      </section>
      {blogList?.length > 0 && (<>
        <section className="flex items-center gap-3 mt-16">
          <span className="hidden sm:flex size-[44px] bg-orange-50 rounded-full justify-center items-center"><Image src="/fire.png" className="w-[19px] h-[23px]" width={19} height={23} alt="" /></span>
          <p className="text-[22px] sm:text-2xl font-semibold sm:font-bold">{tc("searchResults")}</p>
        </section>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">{blogList.map((article: Article) => <ArticleCard key={article.Id} article={article} />)}</section>
      </>)}
      {!hasResult && (<>
        <section className="flex justify-center items-center flex-col">
          <Image src="/illustration/404.png" width={200} height={200} alt={tc("notFound")} />
          <p className="text-sm pb-3">{tc("noResults", { searchKey })}</p>
        </section>
        <section className="flex items-center gap-3 mt-16">
          <span className="hidden sm:flex size-[44px] bg-orange-50 rounded-full justify-center items-center"><Image src="/fire.png" className="w-[19px] h-[23px]" width={19} height={23} alt="" /></span>
          <p className="text-[22px] sm:text-2xl font-semibold sm:font-bold">{t("mayInterest")}</p>
        </section>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">{recommendedList.map((article: Article) => <ArticleCard key={article.Id} article={article} />)}</section>
      </>)}
      {isSearching && blogList?.length > 0 && <section className="mt-5"><Pagination totalCount={totalCount} pageSize={pageSize} currentPage={currentPage} /></section>}
    </main>
  );
}

export default function SearchPage() {
  const tc = useTranslations("common");
  return (<Suspense fallback={<div>{tc("loading")}</div>}><SearchContent /></Suspense>);
}
