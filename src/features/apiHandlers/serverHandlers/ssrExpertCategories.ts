import { getExpertCategoriesList } from "@/service/getExpertCategoriesList";
import { QueryClient } from "@tanstack/react-query";

export const ssrExpertCategories = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/expert/Categories"],
    queryFn: () => getExpertCategoriesList(locale),
  });
  return { expertCategories: Data };
};
