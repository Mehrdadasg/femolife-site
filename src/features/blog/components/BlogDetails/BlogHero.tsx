import Breadcrumb from "@/shared/components/breadcrumb";
import ShareBox from "@/shared/components/share-box";
import { CalendarEdit, Eye, Timer1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

type BlogHeroProps = {
  Id: number; Title: string; ImageUrl: string; CategoryTitle: string; CategorySlug: string;
  ReadTime: string; Slug: string; PublishDate: string; AuthorName: string; AuthorAvatar: string;
  AuthorSlug: string; VisitedCount: number; CommentCount: number; Rate: number;
};

function BlogHero({ blogHeroData }: { blogHeroData: BlogHeroProps }) {
  const t = useTranslations("blogPage");
  const tc = useTranslations("common");
  const breadcrumbItems = [
    { label: tc("home"), href: "/" },
    { label: tc("magazine"), href: "/blog" },
    { label: blogHeroData?.CategoryTitle, href: `/category/${blogHeroData?.CategorySlug}` },
    { label: blogHeroData?.Title },
  ];

  return (
    <section className="flex gap-5 flex-col sm:flex-row">
      <section className="md:w-1/2">
        <Breadcrumb items={breadcrumbItems} separator="/" linkClassName="text-lake-blue-600 text-xs" textClassName="text-lake-blue-600 text-xs" seperatorClassName="text-gray-200" />
        <h1 className="text-[22px] lg:text-4xl xl:text-5xl xl:leading-[80px] my-5"><b>{blogHeroData?.Title}</b></h1>
        <div className="bg-gray-100 rounded-[25px] flex gap-1 items-center w-max py-2 px-3">
          <Timer1 size={20} color="var(--color-gray-400)" />
          <span className="text-xs text-gray-600"><b>{blogHeroData?.ReadTime}</b></span>
          <span className="text-xs text-gray-600">{t("readTime")}</span>
        </div>
        <section className="hidden md:flex gap-3 lg:gap-5 text-xs lg:text-sm text-gray-600 my-8">
          <div className="flex items-center gap-2">
            <Link href={`/author/${blogHeroData?.AuthorSlug}`} title={blogHeroData?.AuthorName}>
              <Image src={blogHeroData?.AuthorAvatar} className="rounded-full object-cover size-[52px]" width={52} height={52} alt={blogHeroData?.AuthorName} />
            </Link>
            <p>{t("author")}: <Link href={`/author/${blogHeroData?.AuthorSlug}`} title={blogHeroData?.AuthorName}>{blogHeroData?.AuthorName}</Link></p>
          </div>
          <div className="flex gap-2 items-center"><CalendarEdit size={20} color="var(--color-gray-400)" />{blogHeroData?.PublishDate}</div>
          <div className="flex gap-2 items-center"><Eye size={20} color="var(--color-gray-400)" />{blogHeroData?.VisitedCount} {t("views")}</div>
        </section>
        <ShareBox commentCount={blogHeroData?.CommentCount} starCount={blogHeroData?.Rate} title={blogHeroData?.Title} url={`https://femolife.app/${blogHeroData?.Slug}`} text={blogHeroData?.Title} />
      </section>
      <section className="md:w-1/2">
        <Image src={blogHeroData?.ImageUrl} alt={blogHeroData?.Title} className="w-full h-auto rounded-[12px]" width={618} height={432} quality={100} priority />
      </section>
    </section>
  );
}

export default BlogHero;
