import { getHeader } from "@/service/getHeader";
import { QueryClient } from "@tanstack/react-query";

export const ssrHeader = async (queryClient: QueryClient, locale: string = "en") => {
  const {Data} = await queryClient.fetchQuery({
    queryKey: [`/home/Header`],
    queryFn: () => getHeader(locale),
  });

  return { headerData: Data };
};