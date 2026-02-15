export function getLastedArticles(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/newcontents`, {
    next: { revalidate: 10 },
    headers: { lang: locale },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
