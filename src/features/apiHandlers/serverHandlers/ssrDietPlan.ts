import { getDietPlan } from "@/service/getDietPlan";
import { QueryClient } from "@tanstack/react-query";

export const ssrDietPlan = async (queryClient: QueryClient, locale: string = "en") => {
  const  Data  = await queryClient.fetchQuery({
    queryKey: ["/home/diet"],
    queryFn: () => getDietPlan(locale),
  });
  return { dietPlan: Data };
};
