import { ssrExpertCategories } from "@/features/apiHandlers/serverHandlers/ssrExpertCategories";
import { ssrExpertList } from "@/features/apiHandlers/serverHandlers/ssrExpertList";
import { ssrExpertPageData } from "@/features/apiHandlers/serverHandlers/ssrExpertPageData";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import DoctorsClient from "@/features/doctors/DoctorsClient";
import { getPageSeo } from "@/service/getPageSeo";
import { buildMetadata, fallbackMetadata } from "@/shared/utils/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const { Data } = await getPageSeo("ExpertListDashboard", locale);
    return buildMetadata(Data, locale);
  } catch { return fallbackMetadata(locale); }
}

export default async function DoctorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const queryClient = new QueryClient();
  const { expertPageData } = await ssrExpertPageData(queryClient, locale);
  const { expertCategories } = await ssrExpertCategories(queryClient, locale);
  const { expertList } = await ssrExpertList(queryClient, locale);

  return <DoctorsClient expertPageData={expertPageData} expertCategories={expertCategories} expertList={expertList} />;
}
