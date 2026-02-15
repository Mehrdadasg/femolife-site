import { getApp } from "@/service/getApp";
import { QueryClient } from "@tanstack/react-query";

export const ssrInstallApp = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/InstallAppLanding"],
    queryFn: () => getApp(locale),
  });
  return { app: Data };
};
