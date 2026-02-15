import { ssrDietPlan } from "@/features/apiHandlers/serverHandlers/ssrDietPlan";
import { QueryClient } from "@tanstack/react-query";
import { TickCircle } from "iconsax-react";
import Image from "next/image";
import React from "react";

type DietItem = { Id: number; Title: string };

async function DietPlan({ locale }: { locale: string }) {
  const queryClient = new QueryClient();
  const { dietPlan } = await ssrDietPlan(queryClient, locale);

  return (
    <section className="my-5 sm:my-24 py-10 px-5 lg:px-10 xl:px-0 md:py-14">
      <div className="lg:flex py-8 px-5 lg:p-16 bg-green-50 rounded-[12px] lg:rounded-4xl">
        <section className="lg:w-1/2">
          <h2 className="text-[22px] lg:text-4xl text-center lg:text-start font-bold lg:font-semibold text-green-500">{dietPlan?.Data?.Title}</h2>
          <h3 className="text-[13px] md:text-base leading-8 text-center lg:text-start my-5 lg:my-12">{dietPlan?.Data?.Text}</h3>
          <ol className="hidden lg:grid grid-cols-2 gap-5">
            {dietPlan?.Data?.Items?.map((item: DietItem) => <li key={item?.Id} className="flex gap-2 items-center"><TickCircle variant="Bold" size={20} color="var(--color-green-500)" /><mark className="bg-transparent text-[13px] md:text-base">{item?.Title}</mark></li>)}
          </ol>
        </section>
        <section className="lg:w-1/2 flex flex-col lg:flex-row justify-center items-center">
          <Image src={dietPlan?.Data?.ImageUrl || "/breakfast.png"} width={374} height={383} alt={dietPlan?.Data?.ImageAlt || ""} quality={100} />
          <ol className="grid lg:hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 mt-5">
            {dietPlan?.Data?.Items?.map((item: DietItem) => <li key={item?.Id} className="flex gap-2 items-center"><TickCircle variant="Bold" size={20} color="var(--color-green-500)" /><mark className="bg-transparent text-[13px] md:text-base">{item?.Title}</mark></li>)}
          </ol>
        </section>
      </div>
    </section>
  );
}

export default DietPlan;
