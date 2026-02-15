export function getRecommended(slug: string, locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/Content/RecommendedList?Slug=${slug}`, { headers: { lang: locale } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
}
