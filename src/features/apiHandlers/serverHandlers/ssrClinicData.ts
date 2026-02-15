import { getClinicData } from "@/service/getClinicData";
import { QueryClient } from "@tanstack/react-query";

export const ssrClinicData = async (queryClient: QueryClient, locale: string = "en") => {
  const { Data } = await queryClient.fetchQuery({
    queryKey: ["/home/clinic"],
    queryFn: () => getClinicData(locale),
  });
  return { clinicData: Data };
};
