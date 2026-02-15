import { getAuthor } from "@/service/getAuthor";
import { QueryClient } from "@tanstack/react-query";

type RelatedExpertType = {
  queryClient: QueryClient;
  slug: string;
};

export const ssrAuthor = async ({ queryClient, slug, locale = "en" }: RelatedExpertType & { locale?: string }) => {    
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/author/Get", slug],
    queryFn: () => getAuthor(slug, locale),
  });
  return { author: Data };
};