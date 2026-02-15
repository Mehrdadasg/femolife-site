export function getExpertPageData(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/expert/Dashboard`, { headers: { lang: locale } }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
