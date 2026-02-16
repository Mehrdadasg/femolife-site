"use client";
import { useAddRate } from "@/features/apiHandlers/clientHandlers/useAddRate";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

function Rate() {
  const t = useTranslations("rate");
  const { blogSlug } = useParams();
  const { mutateAsync: addRateFunc } = useAddRate();
  const [rate, setRate] = useState(0);

  const ratings = [
    { Id: 1, Url: "/emoji/1.png", Text: t("bad") },
    { Id: 2, Url: "/emoji/2.png", Text: t("notBad") },
    { Id: 3, Url: "/emoji/3.png", Text: t("good") },
    { Id: 4, Url: "/emoji/4.png", Text: t("veryGood") },
    { Id: 5, Url: "/emoji/5.png", Text: t("excellent") },
  ];

  const handleRate = async (r: { Id: number }) => {
    setRate(r.Id);
    try {
      const response = await addRateFunc({ Slug: blogSlug as string, Rate: r.Id });
      if (response?.Message?.Status === "Success") toast.success(t("rateSuccess"));
      else toast.error(t("rateError"));
    } catch (error) { console.error(error); toast.error(t("rateError")); }
  };

  return (
    <section className="md:shadow-sm shadow-gray-200 md:border border-gray-200 rounded-[12px] md:p-10 mt-10 flex flex-col items-center">
      <p className="text-lg font-bold text-center mb-5">{t("rateTitle")}</p>
      <ul className="flex gap-3">
        {ratings.map((r) => (
          <li key={r.Id}>
            <button onClick={() => handleRate(r)} className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${rate === r.Id ? "bg-pink-50 border-pink-500 shadow-sm shadow-pink-500" : "bg-gray-100 border-gray-100"}`}>
              <Image src={r.Url} width={40} height={40} alt="" id="" />
              <span className={`text-xs ${rate === r.Id ? "text-pink-500" : "text-gray-500"}`}>{r.Text}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Rate;
