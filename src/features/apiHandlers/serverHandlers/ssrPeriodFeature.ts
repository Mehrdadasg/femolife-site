import { getPeriodFeature } from "@/service/getPeriodFeature";
import { QueryClient } from "@tanstack/react-query";

export const ssrPeriodFeature = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/features/period"],
    queryFn: () => getPeriodFeature(locale),
  });
  return { periodFeature: Data };
};
