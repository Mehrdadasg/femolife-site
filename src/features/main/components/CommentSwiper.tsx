"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { Star1 } from "iconsax-react";

type TestimonialItem = { Id: number; Text: string; Name: string; Avatar: string; Rate: number };

function CommentSwiper({ testimonialsData, locale }: { testimonialsData: TestimonialItem[]; locale: string }) {
  const isRtl = locale === "ar";
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      grabCursor={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="mt-10 !pb-10"
      dir={isRtl ? "rtl" : "ltr"}
      key={locale}
    >
      {testimonialsData?.map((item: TestimonialItem) => (
        <SwiperSlide key={item?.Id}>
          <article className="bg-gray-100 rounded-[12px] p-5 h-[200px] flex flex-col justify-between">
            <p className="text-sm text-gray-700 line-clamp-4">{item?.Text}</p>
            <section className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2">
                <Image src={item?.Avatar} width={32} height={32} alt={item?.Name} className="rounded-full size-8 object-cover" />
                <span className="text-xs font-bold">{item?.Name}</span>
              </div>
              <div className="flex gap-1">{Array.from({ length: item?.Rate }, (_, i) => <Star1 key={i} size={14} color="var(--color-orange-400)" variant="Bold" />)}</div>
            </section>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CommentSwiper;
