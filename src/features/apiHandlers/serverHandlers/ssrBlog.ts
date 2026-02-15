import { getBlog } from "@/service/getBlog";
import { QueryClient } from "@tanstack/react-query";

type Blog = {
  queryClient: QueryClient;
  slug: string;
};

export const ssrBlog = async ({ queryClient, slug, locale = "en" }: Blog & { locale?: string }) => {    
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/content/Get", slug],
    queryFn: () => getBlog(slug, locale),
  });
  return { blog: Data };
};