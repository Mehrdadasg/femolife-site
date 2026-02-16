import { getRecommendedList } from "@/service/getRecommendedList";
import { useMutation } from "@tanstack/react-query";

export const useRecommendedList = () => {
  return useMutation({
    mutationKey: ["/Content/SearchRecommendedList"],
    mutationFn: (locale?: string) => getRecommendedList(locale || "en"),
  });
};