import { getSeeMore } from "@/service/getSeeMore";
import { QueryClient } from "@tanstack/react-query";

export const ssrSeeMore = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/seemore"],
    queryFn: () => getSeeMore(locale),
  });
  return { seeMoreData: Data };
};
