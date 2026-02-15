import { Accordion, AccordionContent, AccordionItem } from "@/shared/components/accordion";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

type FooterMenu = { Id: number; Url: string; Title: string };

function MobileFooterItems({ menu }: { menu: FooterMenu[] }) {
  const t = useTranslations("common");
  return (
    <section className="md:hidden mobile-menu">
      <Accordion multiple={false}>
        <AccordionItem id="1" title={t("appName")}>
          <AccordionContent accordionContextClass="!pt-0">
            <nav><ul className="text-skin-800 text-sm space-y-3">{menu.map((item) => <li key={item?.Id}><Link href={item?.Url} title={item?.Title}>{item?.Title}</Link></li>)}</ul></nav>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default MobileFooterItems;
