import { AddMessage } from "@/shared/types/type";
import { getValidLocale } from "@/shared/utils/locale";
export async function addMessage(data: AddMessage, locale: string = "en") {
  const formData = new FormData();
  formData.append('Name', data.Name);
  formData.append('Text', data.Text);
  formData.append('Phone', data.Phone);

  const response = await fetch(`${process.env.BASE_URL}/content/ContactAdd`, {
    method: 'POST',
    headers: { lang: getValidLocale(locale) },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}