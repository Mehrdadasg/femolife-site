
import { getValidLocale } from "@/shared/utils/locale";
export function getAbout(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/page/about`, { headers: { lang: getValidLocale(locale) } }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
