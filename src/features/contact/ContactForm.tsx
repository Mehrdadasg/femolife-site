"use client";
import { useAddMessage } from "@/features/apiHandlers/clientHandlers/useAddMessage";
import Button from "@/shared/components/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

type FormData = { name: string; phone: string; comment: string };

function ContactForm() {
  const t = useTranslations("contactForm");
  const { mutateAsync: addMessageFunc } = useAddMessage();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    const savedName = localStorage.getItem("commentName");
    const savedPhone = localStorage.getItem("commentPhone");
    if (savedName) setValue("name", savedName);
    if (savedPhone) setValue("phone", savedPhone);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await addMessageFunc({ name: data.name, phone: data.phone, text: data.comment });
      if (response?.Message?.Status === "Success") {
        toast.success(t("messageSuccess"));
        localStorage.setItem("commentName", data.name);
        localStorage.setItem("commentPhone", data.phone);
        reset();
      } else { toast.error(t("messageError")); }
    } catch (error) { console.error(error); toast.error(t("messageError")); }
    setLoading(false);
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="contact-form">
      <p className="text-[22px] mb-5"><b>{t("contactFormTitle")}</b></p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-2 gap-3">
          <div>
            <input className={`w-full border rounded-[8px] p-3 focus:outline-0 h-12 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-100"}`}
              placeholder={t("namePlaceholder")} id="" {...register("name", { required: t("nameRequired") })} />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>
          <div>
            <input className={`w-full border rounded-[8px] p-3 focus:outline-0 h-12 ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-100"}`}
              placeholder={t("phonePlaceholder")} id="" {...register("phone", { required: t("phoneRequired") })} />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
          </div>
        </section>
        <textarea className={`w-full border rounded-[8px] p-3 focus:outline-0 h-24 resize-none mt-3 ${errors.comment ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-100"}`}
          placeholder={t("messagePlaceholder")} id="" {...register("comment", { required: t("messageRequired") })} />
        {errors.comment && <span className="text-red-500 text-xs">{errors.comment.message}</span>}
        <section className="flex justify-end mt-5">
          <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? t("submitting") : t("submitMessage")}</Button>
        </section>
      </form>
    </section>
  );
}

export default ContactForm;
