import { CommentListResponse } from "@/shared/types/type";
import { getValidLocale } from "@/shared/utils/locale";
export function getCommentList({ page, slug, locale = "en"}: {page: number, slug: string, locale?: string}) {
  return fetch(`${process.env.BASE_URL}/content/CommentList?page=${page}&slug=${slug}`, { headers: { lang:getValidLocale(locale)  } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<CommentListResponse>;
    });
}