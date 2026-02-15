import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Glass2 } from "../../icons/Glass2";
import { Article } from "@/shared/types/type";

interface FeaturedArticleProps {
  article: Article;
  view?: "horizontal" | "vertical";
  seoTag?: "h2" | "h3";
}

const ArticleCard: React.FC<FeaturedArticleProps> = ({
  article,
  view = "vertical",
  seoTag,
}) => {
  return (
    <article
      className={`${view === "horizontal" ? "flex gap-2 sm:block" : "block"}`}
    >
      <Link href={`/${article?.Slug}`} title={article?.Title ?? "تصویر پست"} className="block">
        <Image
          src={article?.ImageUrl ?? "/post.png"} 
          width={684}
          height={480}
          alt={article?.Title ?? "تصویر پست"}
          quality={100}
          className={`rounded-[12px] object-cover ${
            view === "horizontal"
              ? "h-[71px] sm:h-[240px] w-[102px] sm:w-full"
              : "h-[240px] w-full"
          } `}
        />
      </Link>
      <section className="mt-4 hidden md:block">
        <div className="flex justify-between items-center">
          <span className="text-lake-blue-600 bg-gray-100 text-[13px] p-2 font-semibold rounded-full">
            {article?.CategoryTitle}
          </span>

          <div className="flex items-center">
            <p className="text-gray-400 text-xs font-normal">
              {article?.ReadTime}
            </p>
            <Glass2 height={8} width={23} />
          </div>
        </div>
        <Link href={`/${article?.Slug}`} title={article?.Title??""} className="block text-lg font-semibold mt-3 truncate">
        {article?.Title}
        </Link>
        <p className="text-gray-500 mt-2 text-sm line-clamp-2">
          {article?.Text}
        </p>
      </section>
      <section className="md:hidden">
        <div className="flex items-center gap-1 mt-3">
          <Link href={`/${article?.Slug}`} title={article?.Title??""} className="block flex-grow">
            {seoTag === "h2" ? (
              <h2
                className={`text-[13px] font-bold  ${
                  view === "horizontal" ? "line-clamp-2" : "line-clamp-1"
                }`}
              >
                {article?.Title}
              </h2>
            ) : (
              <span
                className={`text-[13px] font-bold  ${
                  view === "horizontal" ? "line-clamp-2" : "line-clamp-1"
                }`}
              >
                {article?.Title}
              </span>
            )}
          </Link>
          {/* <ShareBtn text={article?.Text ??""} title={article?.Title ?? ""} url={`https://yekzan.com/blog/${article?.Slug}`} /> */}
        </div>
        <p className="text-gray-400 text-xs font-normal mt-1">
          {article?.ReadTime}
        </p>
      </section>
    </article>
  );
};

export default ArticleCard;
