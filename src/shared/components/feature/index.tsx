import Card from "@/shared/components/card";
import { FeaturesItem } from "@/shared/types/type";
import Image from "next/image";
import React from "react";

interface FeatureProps {
  title: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  description: string;
  cardItems: FeaturesItem[];
  mobileTwoRows?: boolean;
}

function Feature({
  title,
  imageSrc,
  imageAlt,
  description,
  cardItems,
  mobileTwoRows = false,
}: FeatureProps) {
  const firstRowCards = mobileTwoRows
    ? cardItems.slice(0, Math.ceil(cardItems.length / 2))
    : cardItems;
  const secondRowCards = mobileTwoRows
    ? cardItems.slice(Math.ceil(cardItems.length / 2))
    : [];

  return (
    <section className="md:flex gap-[13%] md:gap-[5%] xl:gap-[13%] py-5 md:py-24 px-5 lg:px-10 xl:px-0">
      <section className="md:w-[30%] lg:w-[27%] flex md:block flex-col items-center md:sticky top-32 h-max">
        <h2 className="font-bold order-2 md:order-1 text-[20px] md:text-2xl xl:text-[32px] mb-3 text-center md:text-right">
          {title}
        </h2>
        <div className="flex justify-center">
          <Image
            src={imageSrc}
            className="w-[156px] md:w-auto h-auto max-h-[360px] md:max-h-[280px] xl:max-h-[360px] mb-10 md:my-10 order-1 md:order-2"
            width={1000}
            height={1500}
            alt={imageAlt}
          />
        </div>
        <p className="text-gray-500 order-3 text-[13px] md:text-base text-center md:text-right">
          {description}
        </p>
      </section>
      <section className="block md:hidden flex-1 overflow-x-auto md:overflow-hidden mt-8">
        {mobileTwoRows ? (
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 overflow-x-auto pb-5">
              {firstRowCards.map((item) => (
                <Card
                  key={`first-${item?.Id}`}
                  linkHref="/"
                  cardClass="w-[140px] flex-shrink-0"
                  cardItems={item}
                />
              ))}
            </div>
            {secondRowCards.length > 0 && (
              <div className="flex gap-5 overflow-x-auto mt-5 pb-5">
                {secondRowCards.map((item) => (
                  <Card
                    key={`second-${item?.Id}`}
                    linkHref="/"
                    cardItems={item}
                    cardClass="w-[140px] flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex md:grid grid-cols-3 gap-5 lg:gap-10">
            {cardItems.map((item) => (
              <Card
                key={item?.Id}
                linkHref="/"
                cardItems={item}
                cardClass="w-[140px] md:w-full flex-shrink-0"
              />
            ))}
          </div>
        )}
      </section>
      <section className="flex-1 hidden md:block">
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-10">
          {cardItems.map((item) => (
            <Card
              key={item?.Id}
              linkHref="/"
              cardItems={item}
              cardClass="w-[140px] md:w-full flex-shrink-0"
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Feature;
