import { getAppDownload } from "@/service/getAppDownload";
import { QueryClient } from "@tanstack/react-query";

export const ssrAppDownload = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/DownloadApp"],
    queryFn: () => getAppDownload(locale),
  });
  return { appData: Data };
};
