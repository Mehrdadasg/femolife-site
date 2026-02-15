import { getExpert } from "@/service/getExpert";
import { QueryClient } from "@tanstack/react-query";

type Expert = {
  queryClient: QueryClient;
  slug: string;
};

export const ssrExpert = async ({ queryClient, slug, locale = "en" }: Expert & { locale?: string }) => {    
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/expert/Get", slug],
    queryFn: () => getExpert(slug, locale),
  });
  return { expert: Data };
};