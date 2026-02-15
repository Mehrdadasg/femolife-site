import { getRecommended } from "@/service/getRecommended";
import { QueryClient } from "@tanstack/react-query";

export const ssrRecommended = async ({queryClient, slug, locale = "en"}: {queryClient: QueryClient; slug: string; locale?: string}) => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/Content/RecommendedList", slug],
    queryFn: () => getRecommended(slug, locale),
  });
  return { recommended: Data };
};
