import { FeaturesItem } from "@/shared/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  cardItems:FeaturesItem;
  linkHref: string;
  cardClass?: string;
  imageClass?: string;
  titleClass?: string;
  descriptionClass?: string;
}

const Card: React.FC<CardProps> = ({
  cardItems,
  linkHref,
  cardClass,
  imageClass,
  titleClass,
  descriptionClass,
}) => {
  return (
    <Link href={linkHref} title={cardItems?.Title}>
      <article className={`${cardClass ?? ""}`}>
        <Image
          src={cardItems?.ImageUrl}
          width={2000}
          height={2000}
          alt={cardItems?.Title}
          quality={100}
          className={`${imageClass ?? ""}`}
        />
        <div className="mt-4">
          <h3 className={`font-bold truncate ${titleClass ?? ""}`}>{cardItems?.Title}</h3>
          <p className={`text-[13px] text-gray-500 mt-2 line-clamp-2 ${descriptionClass ?? ""}`}>{cardItems?.Text}</p>
        </div>
      </article>
    </Link>
  );
};

export default Card;
