
import { getValidLocale } from "@/shared/utils/locale";
export function getRelatedList(slug: string, locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/Content/RelatedList?Slug=${slug}`, { headers: { lang:getValidLocale(locale)  } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}
