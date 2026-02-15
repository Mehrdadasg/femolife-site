import { getCommentList } from "@/service/getCommentList";
import { useMutation } from "@tanstack/react-query";

type CommentListHeaderType = {
  page: number;
  slug: string;
};

export const useCommentList = () => {
  return useMutation({
    mutationKey: ["/Content/CommentList"],
    mutationFn: ({ page, slug }: CommentListHeaderType) =>
      getCommentList({ page, slug }),
  });
};
