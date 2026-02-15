import { ssrContact } from "@/features/apiHandlers/serverHandlers/ssrContact";
import ContactForm from "@/features/contact/ContactForm";
import FAQ from "@/features/main/components/FAQ";
import { getPageSeo } from "@/service/getPageSeo";
import Breadcrumb from "@/shared/components/breadcrumb";
import JsonLd from "@/shared/components/json-ld";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const { Data } = await getPageSeo("contact", locale);
    return buildMetadata(Data, locale);
  } catch {
    return fallbackMetadata(locale);
  }
}

async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: "common" });
  const queryClient = new QueryClient();
  const { contactData } = await ssrContact(queryClient, locale);
  const { Data } = await getPageSeo("contact", locale);

  const breadcrumbItems = [
    { label: tc("home"), href: "/" },
    { label: tc("contact") },
  ];

  return (
    <>
      <JsonLd json={Data?.JsonLd} />
      <section className="pb-24">
        <section className="contact h-max md:h-[750px] lg:h-[775px] 2xl:h-[800px] pt-36 sm:pt-44 md:pt-52 lg:pt-40 xl:pt-44 -mt-[80px] md:mt-0">
          <section className="px-3 sm:px-5 lg:px-10 xl:px-0 max-w-[1200px] mx-auto h-full">
            <section className="md:flex lg:gap-5 xl:gap-10 h-full">
              <section className="md:w-1/2 pt-8 md:pt-16">
                <Breadcrumb items={breadcrumbItems} separator="/" linkClassName="text-lake-blue-600 text-xs font-bold" textClassName="text-gray-400 text-xs font-bold" seperatorClassName="text-gray-200" />
                <p className="md:text-start mt-5 sm:mt-10 mb-8 text-[38px] md:text-5xl"><b>{contactData?.Content?.Title}</b></p>
                <p className="text-lg text-gray-600">{contactData?.Content?.Text}</p>
              </section>
              <section className="md:w-1/2 mt-5 md:mt-0 flex justify-center items-start xl:pe-10">
                <Image src={contactData?.Content?.ImageUrl ?? "/illustration/contact.png"} width={433} height={433} quality={100} alt="" priority />
              </section>
            </section>
          </section>
        </section>
        <FAQ locale={locale} />
        <ContactForm />
      </section>
    </>
  );
}

export default Contact;
