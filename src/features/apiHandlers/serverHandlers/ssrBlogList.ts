import { getBlogList } from "@/service/getBlogList";
import { BlogListResponse } from "@/shared/types/type";
import { QueryClient } from "@tanstack/react-query";

type BlogList = {
  queryClient: QueryClient;
  page: number;
  category?: string;
  searchKey?:string;
  authorSlug?:string
};

export const ssrBlogList = async ({ queryClient, page, category,searchKey,authorSlug, locale = "en" }: BlogList & { locale?: string }) => {    
  const { Data } = await queryClient.fetchQuery<BlogListResponse>({
    queryKey: ["/content/list"],
    queryFn: () => getBlogList({ page, category, searchKey, authorSlug, locale }),
  });
  return { blogList: Data };
};