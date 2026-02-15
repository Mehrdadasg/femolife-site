import { getAppFeature } from "@/service/getAppFeature";
import { QueryClient } from "@tanstack/react-query";

export const ssrAppFeature = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/features/app"],
    queryFn: () => getAppFeature(locale),
  });
  return { appFeature: Data };
};
