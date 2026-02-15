import { getRelatedExperts } from "@/service/getRelatedExperts";
import { QueryClient } from "@tanstack/react-query";

export const ssrRelatedExpert = async ({queryClient, slug, locale = "en"}: {queryClient: QueryClient; slug: string; locale?: string}) => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/expert/RelatedList", slug],
    queryFn: () => getRelatedExperts(slug, locale),
  });
  return { relatedExpert: Data };
};
