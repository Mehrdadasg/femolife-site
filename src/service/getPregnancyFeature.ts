export async function getPregnancyFeature(locale: string = "en") {
  const response = await fetch(`${process.env.BASE_URL}/home/features/pregnancy`, { headers: { lang: locale } });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API Error [${response.status}] ${response.url} | ${body}`);
  }
  return response.json();
}