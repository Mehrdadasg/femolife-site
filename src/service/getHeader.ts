
import { getValidLocale } from "@/shared/utils/locale";
export function getHeader(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/Header`, { headers: { lang: getValidLocale(locale) } })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API Error [${response.status}] ${response.url}`);
        //throw new Error("Network response was not ok");
      }
      return response.json();
    });
}