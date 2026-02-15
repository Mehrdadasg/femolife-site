import { ssrFAQ } from "@/features/apiHandlers/serverHandlers/ssrFAQ";
import { Accordion, AccordionContent, AccordionItem } from "@/shared/components/accordion";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import React from "react";

type FaqItemType = { Title: string; Text: string; Id: number };

async function FAQ({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "faq" });
  const queryClient = new QueryClient();
  const { faq } = await ssrFAQ(queryClient, locale);

  return (
    <section className="max-w-[40rem] md:max-w-4xl mx-auto pt-10 sm:pt-14 pb-16 sm:pb-20 px-5 lg:px-10 xl:px-0 faq">
      <p className="font-semibold text-[22px] md:text-4xl mb-5 md:mb-10">{t("title")}</p>
      <Accordion multiple={false}>
        {faq.map((item: FaqItemType) => (
          <AccordionItem key={item?.Id} id={`${item?.Id}`} title={item.Title}>
            <AccordionContent accordionContextClass="leading-7">{item.Text}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default FAQ;
