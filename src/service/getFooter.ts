export function getFooter(locale: string = "en") {
  return fetch(`${process.env.BASE_URL}/home/Footer`, { headers: { lang: locale } }).then((response) => {
    if (!response.ok) {
      throw new Error(`API Error [${response.status}] ${response.url}`);
      //throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
