"use client";
import { useCommentList } from "@/features/apiHandlers/clientHandlers/useCommentList";
import { Comment } from "@/shared/types/type";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function CommentList() {
  const t = useTranslations("commentSection");
  const { blogSlug } = useParams();
  const { mutateAsync: commentListFunc } = useCommentList();
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const handleCommentList = async () => {
    if (blogSlug) {
      try {
        const response = await commentListFunc({ page: 1, slug: blogSlug as string });
        if (response?.Data?.length > 0) setCommentList(response?.Data);
      } catch (error) { console.log(error); }
    }
  };

  useEffect(() => { handleCommentList(); }, []);

  return (
    <section className="mt-10">
      <p className="font-bold text-[22px]">{t("otherComments")}</p>
      <ul>
        {commentList?.map((comment) => (
          <li key={comment?.Id} className="mt-5">
            <section>
              <section className="flex gap-3">
                <section className="size-8 md:size-11 rounded-full overflow-hidden">
                  <Image src={comment?.Avatar} className="rounded-full size-8 md:size-11" width={44} height={44} alt={comment?.Name || t("userAvatar")} />
                </section>
                <section className="flex-1">
                  <div>
                    <span className="text-xs md:text-base font-bold leading-tight whitespace-nowrap">{comment?.Name}</span>
                    <span className="text-[10px] md:text-[11px] text-gray-400 ps-2">{comment?.CreateDate}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-800">{comment?.Text}</p>
                </section>
              </section>
            </section>
            {comment?.Childs?.length > 0 ? comment?.Childs?.map((c) => (
              <section key={c?.Id} className="ps-10 md:ps-12 mt-5">
                <section className="flex gap-3">
                  <section className="size-8 md:size-11 rounded-full overflow-hidden">
                    <Image src={c?.Avatar} className="rounded-full size-8 md:size-11" width={44} height={44} alt={t("adminAvatar")} />
                  </section>
                  <section className="flex-1">
                    <div>
                      <span className="text-xs md:text-base font-bold">{t("admin")}</span>
                      <span className="text-[10px] md:text-[11px] text-gray-400 ps-2">{c?.CreateDate}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-800">{c?.Text}</p>
                  </section>
                </section>
              </section>
            )) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentList;
