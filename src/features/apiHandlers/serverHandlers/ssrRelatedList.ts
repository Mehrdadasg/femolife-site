import { getRelatedList } from "@/service/getRelatedList";
import { QueryClient } from "@tanstack/react-query";

export const ssrRelatedList = async ({queryClient, slug, locale = "en"}: {queryClient: QueryClient; slug: string; locale?: string}) => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/Content/RelatedList", slug],
    queryFn: () => getRelatedList(slug, locale),
  });
  return { relatedList: Data };
};
