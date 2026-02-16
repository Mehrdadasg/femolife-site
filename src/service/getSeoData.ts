export function getSeoData(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/seo`, { headers: { lang: locale } }).then((response) => {
    if (!response.ok) {
      //throw new Error("Network response was not ok");
      throw new Error(`API Error [${response.status}] ${response.url}`);
    }
    return response.json();
  });
}
