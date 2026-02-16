import React from "react";
import { useTranslations } from "next-intl";

type Props = { link: string; img: string };

const EnamadBadge = ({ link, img }: Props) => {
  const t = useTranslations("footer");
  return (
    <span></span>
  );
};

export default EnamadBadge;
