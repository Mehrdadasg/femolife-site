import { getLastedArticles } from "@/service/getLastedArticles";
import { QueryClient } from "@tanstack/react-query";

export const ssrLastedArticles = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/newcontents"],
    queryFn: () => getLastedArticles(locale),
  });
  return { lastedArticles: Data };
};
