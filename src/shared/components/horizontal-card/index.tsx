import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HorizontalArticle } from "@/shared/types/type";
import ShareBtn from "../share-btn";

interface FeaturedArticleProps {
  article: HorizontalArticle;
  seoTag?: "h2" | "h3";
}

const HorizontalCard: React.FC<FeaturedArticleProps> = ({
  article,
  seoTag,
}) => {
  return (
    <article className="flex gap-2">
      <Link href={`/${article?.Slug}`} className="block" title={article?.Title??""}>
        <Image
          src={article?.ImageUrl ?? "/post.png"}
          width={126}
          height={88}
          alt={article?.Title ?? "تصویر پست"}
          className={`rounded-[12px] object-cover h-[71px] sm:h-[88px] w-[102px] sm:w-32 `}
        />
      </Link>
      <section className="flex-1">
        <div className="flex items-center gap-1 mt-3">
          <Link href={`/${article?.Slug}`} title={article?.Title??""} className="block">
            {seoTag === "h2" ? (
              <h2 className={`text-[13px] font-bold flex-grow line-clamp-2`}>
                {article?.Title}
              </h2>
            ) : (
              <h3 className={`text-[13px] font-bold flex-grow line-clamp-2`}>
                {article?.Title}
              </h3>
            )}
          </Link>
          <ShareBtn
            text={article?.Text ?? ""}
            title={article?.Title ?? ""}
            url={`https://yekzan.com/${article?.Slug}`}
          />
        </div>
        <p className="text-gray-400 text-xs font-normal mt-1 hidden sm:block">
          {article?.ReadTime}
        </p>
      </section>
    </article>
  );
};

export default HorizontalCard;
