import { getPregnancyFeature } from "@/service/getPregnancyFeature";
import { QueryClient } from "@tanstack/react-query";

export const ssrPregnancyFeature = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/features/pregnancy"],
    queryFn: () => getPregnancyFeature(locale),
  });
  return { pregnancyFeature: Data };
};
