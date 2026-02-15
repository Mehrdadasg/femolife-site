import React from "react";
import { useTranslations } from "next-intl";

type Props = { link: string; img: string };

const EnamadBadge = ({ link, img }: Props) => {
  const t = useTranslations("footer");
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" referrerPolicy="origin" className="w-40 h-56 flex rounded-xl overflow-hidden bg-transparent" title={t("enamadTitle")}>
      <img src={img ?? ""} alt={t("enamadTitle")} className="cursor-pointer size-full object-cover" width={160} height={224} />
    </a>
  );
};

export default EnamadBadge;
