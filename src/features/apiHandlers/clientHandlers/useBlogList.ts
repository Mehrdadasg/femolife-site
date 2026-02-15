import { getBlogList } from "@/service/getBlogList";
import { BlogListHeaderType } from "@/shared/types/type";
import { useMutation } from "@tanstack/react-query";

export const useBlogList = () => {
  return useMutation({
    mutationKey: ["/Content/list"],
    mutationFn: ({ page, category, searchKey }: BlogListHeaderType) =>
      getBlogList({ page, category, searchKey }),
  });
};
