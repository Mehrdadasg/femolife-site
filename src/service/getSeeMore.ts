export function getSeeMore(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/seemore`, { headers: { lang: locale } })
    .then((response) => {
      if (!response.ok) {
        //throw new Error("Network response was not ok");
        throw new Error(`API Error [${response.status}] ${response.url}`);
      }
      return response.json();
    });
}