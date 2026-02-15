import { getRecommendedList } from "@/service/getRecommendedList";
import { QueryClient } from "@tanstack/react-query";

export const ssrRecommendedList = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/Content/SearchRecommendedList"],
    queryFn: () => getRecommendedList(locale),
  });
  return { recommendedList: Data };
};
