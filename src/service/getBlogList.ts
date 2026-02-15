import { BlogListHeaderType, BlogListResponse } from "@/shared/types/type";

export function getBlogList({
  page,
  category,
  searchKey,
  authorSlug,
  locale = "en",
}: BlogListHeaderType & { locale?: string }): Promise<BlogListResponse> {
  return fetch(
    `${process.env.BASE_URL}/content/list?page=${page}&category=${
      category ?? ""
    }&searchKey=${searchKey ?? ""}&authorSlug=${authorSlug ?? ""}`
  , { headers: { lang: locale } }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json() as Promise<BlogListResponse>;
  });
}
