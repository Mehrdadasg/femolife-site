import { ssrClinicData } from "@/features/apiHandlers/serverHandlers/ssrClinicData";
import { ssrExpertList } from "@/features/apiHandlers/serverHandlers/ssrExpertList";
import { ExpertType } from "@/shared/types/type";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import { TickCircle } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ClinicService = { Id: number; Title: string };

async function TherapyClinic({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "therapyClinic" });
  const queryClient = new QueryClient();
  const { clinicData } = await ssrClinicData(queryClient, locale);
  const { expertList } = await ssrExpertList(queryClient, locale);

  return (
    <section className="my-5 sm:my-24 px-5 lg:px-10 xl:px-0">
      <div className="lg:flex py-8 px-5 lg:px-16 lg:py-16 bg-lake-blue-50 rounded-[12px] lg:rounded-4xl">
        <section className="lg:w-1/2 pt-3">
          <h2 className="text-[22px] md:text-4xl text-center lg:text-start font-bold md:font-semibold text-lake-blue-500">{clinicData?.Title}</h2>
          <h3 className="my-5 lg:my-12 text-[13px] md:text-base leading-8 text-center lg:text-start">
            <mark className="bg-transparent">{t("expertTeam")}</mark><br />{t("readyToHelp")}
          </h3>
          <ol className="hidden lg:grid grid-cols-2 md:grid-cols-3 gap-5">
            {clinicData?.Services.map((item: ClinicService) => (
              <li key={item?.Id} className="flex gap-2 items-center"><TickCircle variant="Bold" size={20} color="var(--color-lake-blue-500)" /><mark className="bg-transparent text-[13px] md:text-base">{item?.Title}</mark></li>
            ))}
          </ol>
        </section>
        <section className="lg:w-1/2">
          <ol className="flex flex-wrap my-8 justify-center md:justify-baseline gap-2">
            {expertList.map((expert: ExpertType) => (
              <li key={expert.Id}><Link href={`/clinic/${expert.Slug}`} title={expert.Title}><Image src={expert.Avatar} className="rounded-full size-[61px] object-cover border-1 border-white" width={61} height={61} alt={expert.Title} /></Link></li>
            ))}
          </ol>
          <ol className="grid lg:hidden grid-cols-2 md:grid-cols-3 gap-5">
            {clinicData?.Services.map((item: ClinicService) => (
              <li key={item?.Id} className="flex gap-2 items-center"><TickCircle variant="Bold" size={20} color="var(--color-lake-blue-500)" /><mark className="bg-transparent text-[13px] md:text-base">{item?.Title}</mark></li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}

export default TherapyClinic;
