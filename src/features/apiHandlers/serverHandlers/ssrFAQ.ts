import { getFAQ } from "@/service/getFAQ";
import { QueryClient } from "@tanstack/react-query";

export const ssrFAQ = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/faq"],
    queryFn: () => getFAQ(locale),
  });
  return { faq: Data };
};
