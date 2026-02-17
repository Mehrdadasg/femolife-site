import { AddComment } from "@/shared/types/type";
import { getValidLocale } from "@/shared/utils/locale";


export async function addComment(data: AddComment, locale: string = "en") {
  const formData = new FormData();
  formData.append('Slug', data.Slug);
  formData.append('Name', data.Name);
  formData.append('Text', data.Text);
  formData.append('Email', data.Email);

  const response = await fetch(`${process.env.BASE_URL}/content/CommentAdd`, {
    method: 'POST',
    headers: { lang: getValidLocale(locale) },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}