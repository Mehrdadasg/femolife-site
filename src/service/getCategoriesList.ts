export function getCategoriesList(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/content/category`, { headers: { lang: locale } }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
