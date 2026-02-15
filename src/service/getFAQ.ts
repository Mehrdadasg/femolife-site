export function getFAQ(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/faq`, { headers: { lang: locale } }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
