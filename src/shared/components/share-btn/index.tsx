"use client"
import Share2 from "@/shared/icons/Share2";
import React from "react";

type Props = {
  title: string;
  url: string;
  text: string;
};

function ShareBtn({ text, title, url }: Props) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error("خطا در اشتراک‌گذاری:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch (error) {
        console.error("خطا در کپی کردن لینک:", error);
      }
    }
  };
  return (
    <button
      aria-label="اشتراک گذاری"
      onClick={handleShare}
      type="button"
      className="px-2 cursor-pointer"
    >
      <Share2 width={20} height={20} fill="var(--color-gray-600)" />
    </button>
  );
}

export default ShareBtn;
