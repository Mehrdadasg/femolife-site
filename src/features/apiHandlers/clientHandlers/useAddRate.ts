import { addRate } from "@/service/addRate";
import { useMutation } from "@tanstack/react-query";

export const useAddRate=()=> {
  return useMutation({
    mutationKey:['/Content/CommentAdd'],
    mutationFn: (data: { Slug: string; Rate: number }) => addRate(data)
  });
}