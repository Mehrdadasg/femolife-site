import { addMessage } from "@/service/addMessage";
import { AddMessage } from "@/shared/types/type";
import { useMutation } from "@tanstack/react-query";

export const useAddMessage=()=> {
  return useMutation({
    mutationKey:['/Content/ContactAdd'],
    mutationFn: ({Phone,Name,Text}:AddMessage)=>
        addMessage({Phone,Name,Text})
  });
}