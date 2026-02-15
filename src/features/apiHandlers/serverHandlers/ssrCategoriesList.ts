import { getCategoriesList } from "@/service/getCategoriesList";
import { QueryClient } from "@tanstack/react-query";

export const ssrCategoriesList = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/content/category"],
    queryFn: () => getCategoriesList(locale),
  });
  return { categories: Data };
};
