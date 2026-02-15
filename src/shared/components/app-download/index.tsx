import { ssrAppDownload } from "@/features/apiHandlers/serverHandlers/ssrAppDownload";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type AppType = { Id: number; ImageUrl: string; ImageAlt: string; Url: string };

async function AppDownload({ locale = "en" }: { locale?: string }) {
  const queryClient = new QueryClient();
  const { appData } = await ssrAppDownload(queryClient, locale);

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-2 gap-3 mt-20">
        {appData?.map((app: AppType) =>
          <Link key={app?.Id} href={app?.Url} title={app?.ImageAlt} className="h-10 !bg-[#202937] w-full rounded-[50px] p-0 flex justify-center" target="_blank">
            <Image src={app?.ImageUrl} className="rounded-[50px] w-auto h-full object-cover" width={200} height={40} alt={app?.ImageAlt} />
          </Link>
        )}
      </section>
    </>
  );
}

export default AppDownload;
