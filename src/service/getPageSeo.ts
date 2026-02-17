import { getValidLocale } from "@/shared/utils/locale";
export function getPageSeo(slug: string, locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/page/GetSeo?Slug=${slug}`, { headers: { lang: getValidLocale(locale )} }).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`API Error [${response.status}] ${response.url}`);
        //throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );
}
