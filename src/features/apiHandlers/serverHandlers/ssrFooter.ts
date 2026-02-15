import { getFooter } from "@/service/getFooter";
import { QueryClient } from "@tanstack/react-query";

export const ssrFooter = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/Footer"],
    queryFn: () => getFooter(locale),
  });
  return { footer: Data };
};
