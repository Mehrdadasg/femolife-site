"use client";
import { useAddComment } from "@/features/apiHandlers/clientHandlers/useAddComment";
import Button from "@/shared/components/button";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

type FormData = { name: string; email: string; comment: string; remember: boolean };

function CommentForm() {
  const t = useTranslations("commentSection");
  const { blogSlug } = useParams();
  const { mutateAsync: addCommentFunc } = useAddComment();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    const savedName = localStorage.getItem("commentName");
    const savedEmail = localStorage.getItem("commentEmail");
    if (savedName) setValue("name", savedName);
    if (savedEmail) setValue("email", savedEmail);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await addCommentFunc({ Slug: blogSlug as string, Name: data.name, Email: data.email, Text: data.comment });
      if (response?.Message?.Status === "Success") {
        toast.success(t("commentSuccess"));
        if (data.remember) { localStorage.setItem("commentName", data.name); localStorage.setItem("commentEmail", data.email); }
        reset();
      } else { toast.error(t("commentError")); }
    } catch (error) { console.error(error); toast.error(t("commentError")); }
    setLoading(false);
    const el = document.getElementById("comment-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-10">
      <div className="w-full">
        <textarea className={`w-full border rounded-[8px] p-3 focus:outline-0 h-24 resize-none ${errors.comment ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-100"}`}
          placeholder={t("commentPlaceholder")} id="" {...register("comment", { required: t("commentRequired") })} />
        {errors.comment && <span className="text-red-500 text-xs">{errors.comment.message}</span>}
      </div>
      <section className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <input className={`w-full border rounded-[8px] p-3 focus:outline-0 h-12 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-100"}`}
            placeholder={t("namePlaceholder")} id="" {...register("name", { required: t("nameRequired") })} />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        </div>
        <div>
          <input className={`w-full border rounded-[8px] p-3 focus:outline-0 h-12 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-100"}`}
            placeholder={t("emailPlaceholder")} id="" {...register("email", { required: t("emailRequired"), pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("emailInvalid") } })} />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
      </section>
      <section className="flex justify-between items-center mt-5">
        <label className="flex items-center gap-2"><input type="checkbox" id="remember" {...register("remember")} /><span className="text-xs text-gray-500">{t("rememberMe")}</span></label>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? t("submitting") : t("submitComment")}</Button>
      </section>
    </form>
  );
}

export default CommentForm;
