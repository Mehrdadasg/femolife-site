import { getAbout } from "@/service/getAbout";
import { QueryClient } from "@tanstack/react-query";

export const ssrAbout = async (queryClient: QueryClient, locale: string = "en") => {
  const {Data} = await queryClient.fetchQuery({
    queryKey: [`/page/about`],
    queryFn: () => getAbout(locale),
  });

  return { aboutData: Data };
};