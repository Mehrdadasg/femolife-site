import { getValidLocale } from "@/shared/utils/locale";
export function getClinicData(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/clinic`, { headers: { lang: getValidLocale(locale) } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}