"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay } from "swiper/modules";

type SwiperItem = { Id: number; ImageUrl: string; Title: string };

function AppSwiper({ swiperData, locale }: { swiperData: SwiperItem[]; locale: string }) {
  const isRtl = locale === "ar";
  return (
    <Swiper
      effect="cards"
      grabCursor={true}
      modules={[EffectCards, Autoplay]}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="mySwiper !overflow-visible"
      dir={isRtl ? "rtl" : "ltr"}
      key={locale}
    >
      {swiperData?.map((item: SwiperItem) => (
        <SwiperSlide key={item?.Id} className="!rounded-3xl">
          <Image src={item?.ImageUrl} width={330} height={570} alt={item?.Title} quality={100} className="!rounded-3xl" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default AppSwiper;
