import { getValidLocale } from "@/shared/utils/locale";
export function getDietPlan(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/diet`, { headers: { lang:getValidLocale(locale)  } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}