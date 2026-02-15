import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useTranslations } from "next-intl";

function Comment() {
  const t = useTranslations("commentSection");
  return (
    <section className="md:shadow-sm shadow-gray-200 md:border border-gray-200 rounded-[12px] md:p-10 mt-24" id="comment-section">
      <p className="text-[22px] font-bold">{t("writeComment")}</p>
      <CommentForm />
      <CommentList />
    </section>
  );
}

export default Comment;
