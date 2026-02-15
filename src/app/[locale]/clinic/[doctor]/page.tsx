import { ssrExpert } from "@/features/apiHandlers/serverHandlers/ssrExpert";
import RelatedExperts from "@/features/doctors/RelatedExperts";
import { getExpertSeo } from "@/service/getExpertSeo";
import Breadcrumb from "@/shared/components/breadcrumb";
import JsonLd from "@/shared/components/json-ld";
import LinkCM from "@/shared/components/link";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";
import { QueryClient } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import { Instagram, Location } from "iconsax-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ doctor: string; locale: string }> }) {
  const { doctor, locale } = await params;
  try {
    const { Data } = await getExpertSeo(doctor, locale);
    return buildMetadata(Data, locale);
  } catch { return fallbackMetadata(locale); }
}

async function DoctorInfo({ params }: { params: Promise<{ doctor: string; locale: string }> }) {
  const { doctor: slug, locale } = await params;
  if (!slug) notFound();
  const t = await getTranslations({ locale, namespace: "doctorPage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const queryClient = new QueryClient();
  const { expert } = await ssrExpert({ queryClient, slug, locale });
  const { Data } = await getExpertSeo(slug, locale);

  const breadcrumbItems = [
    { label: tc("home"), href: "/" },
    { label: t("experts"), href: "/clinic" },
    { label: expert?.Content?.Title || "" },
  ];

  const cleanHtmlText = DOMPurify.sanitize(expert?.Content?.Text);

  return (
    <>
      <JsonLd json={Data?.JsonLd} />
      <section className="bg-gray-100 h-max pt-40 sm:pt-36 -mt-[80px] md:mt-0 pb-28 px-5 md:px-0">
        <section className="max-w-[1200px] mx-auto">
          <Breadcrumb items={breadcrumbItems} separator="/" linkClassName="text-lake-blue-600 text-xs font-bold" textClassName="text-gray-400 text-xs font-bold" seperatorClassName="text-gray-200" />
          <section className="bg-white rounded-3xl min-h-96 mt-10 md:flex">
            <section className="lg:w-[350px] flex justify-center py-10 px-5 lg:px-10">
              <Image src={expert?.Content?.ImageUrl} alt={expert?.Content?.Title} width={250} height={250} className="rounded-full object-cover size-[250px] md:size-[200px] lg:size-[250px]" />
            </section>
            <section className="flex-1 px-5 xl:px-14 md:pt-28 pb-14">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-start">
                  <h1 className="text-2xl xl:text-5xl"><b>{expert?.Content?.Title}</b></h1>
                  <p className="text-gray-500 text-lg mt-5">{expert?.Content?.SubTitle}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-16">
                <div className="bg-gray-100 rounded-[10px] text-center py-7">
                  <b>{expert?.Content?.MedicalNumber}</b>
                  <p className="text-sm text-gray-500 mt-3">{t("medicalCode")}</p>
                </div>
                <div className="bg-gray-100 rounded-[10px] text-center py-7">
                  <b>{expert?.Content?.Experience}</b>
                  <p className="text-sm text-gray-500 mt-3">{t("experience")}</p>
                </div>
                <div className="bg-gray-100 rounded-[10px] text-center py-7">
                  <b>{expert?.Content?.WithUs}</b>
                  <p className="text-sm text-gray-500 mt-3">{t("withUs")}</p>
                </div>
                {expert?.Content?.Phone && (
                  <div className="bg-gray-100 rounded-[10px] text-center py-7">
                    <b>{expert.Content.Phone}</b>
                    <p className="text-sm text-gray-500 mt-3">{t("officePhone")}</p>
                  </div>
                )}
              </div>
              <p className="text-lg font-semibold mt-16">{t("skills")}</p>
              <div className="mt-5" dangerouslySetInnerHTML={{ __html: cleanHtmlText }}></div>
              {expert?.Content?.Instagram && (
                <section className="flex justify-center gap-5 md:shadow-sm shadow-gray-200 md:border border-gray-200 rounded-[12px] md:p-10 mt-24">
                  <LinkCM href={expert.Content.Instagram} aria-label="instagram" variant="contained" color="blue" size="icon" title="instagram" target="_blank">
                    <Instagram color="#fff" size={34} variant="Bold" />
                  </LinkCM>
                </section>
              )}
              {expert?.Content?.Address && (
                <section className="flex items-center gap-5 md:shadow-sm shadow-gray-200 md:border border-gray-200 rounded-[12px] md:p-10 mt-10">
                  <span className="flex justify-center items-center size-10"><Location color="var(--color-lake-blue-500)" size={24} /></span>
                  <div>
                    <p className="text-lg font-semibold">{t("officeAddress")}</p>
                    <address className="text-gray-700 mt-2">{expert?.Content?.Address}</address>
                  </div>
                </section>
              )}
            </section>
          </section>
        </section>
      </section>
      <RelatedExperts slug={slug} locale={locale} />
    </>
  );
}

export default DoctorInfo;
