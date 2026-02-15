import { addComment } from "@/service/addComment";
import { AddComment } from "@/shared/types/type";
import { useMutation } from "@tanstack/react-query";

export const useAddComment=()=> {
  return useMutation({
    mutationKey:['/Content/CommentAdd'],
    mutationFn: ({Email,Name,Slug,Text}:AddComment)=>
        addComment({Email,Name,Slug,Text})
  });
}