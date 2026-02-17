
import { getValidLocale } from "@/shared/utils/locale";
export function getRecommendedList(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/Content/SearchRecommendedList`, { headers: { lang: getValidLocale(locale) } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}