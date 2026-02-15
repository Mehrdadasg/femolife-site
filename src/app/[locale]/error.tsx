"use client";
import LinkCM from "@/shared/components/link";
import { Home } from "iconsax-react";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

function ErrorPage() {
  const t = useTranslations("errorPage");
  return (
    <main className="md:h-screen max-w-5xl mx-auto flex flex-wrap md:flex-nowrap px-5 gap-20 pt-36 md:pt-44 lg:pt-52">
      <section className="w-full md:w-[55%] text-center md:text-start">
        <h2 className="rounded-[50px] bg-pink-50 text-pink-500 w-max mx-auto md:mx-0 py-2 px-4 text-lg">
          {t("error500")}
        </h2>
        <p className="text-[22px] md:text-2xl lg:text-5xl font-bold lg:leading-20 my-5">
          {t("maintenance")}
        </p>
        <p className="font-normal text-gray-500 text-[13px] md:text-base lg:text-lg leading-8">
          {t("description")}
        </p>
        <div className="flex justify-center md:justify-start gap-5 mt-10">
          <LinkCM href="/" title={t("goHome")}>
            <Home size={20} color="#fff" />
            {t("goHome")}
          </LinkCM>
        </div>
      </section>
      <section className="mx-auto md:w-[40%] pb-20 md:pb-0">
        <Image src="/illustration/500.png" className="w-full h-auto" width={900} height={900} alt="500" />
      </section>
    </main>
  );
}

export default ErrorPage;
