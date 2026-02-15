import type { Metadata } from "next";

type SeoData = {
  MetaTitle?: string;
  MetaDescription?: string;
  CanonicalUrl?: string;
  OgTitle?: string;
  OgDescription?: string;
  OgImageUrl?: string;
  OgUrl?: string;
  JsonLd?: unknown;
};

export function buildMetadata(data: SeoData, locale: string): Metadata {
  const isArabic = locale === "ar";
  const siteName = isArabic ? "فيمولايف" : "FemoLife";
  const siteUrl = "https://femolife.app";

  return {
    title: {
      default:
        data.MetaTitle ||
        (isArabic
          ? "فيمولايف - دليل صحة المرأة والحمل والولادة"
          : "FemoLife - Women's Health Guide, Pregnancy & Childbirth"),
      template: `%s | ${siteName}`,
    },
    description:
      data.MetaDescription ||
      (isArabic
        ? "فيمولايف: دليلكِ الشامل لصحة المرأة من البلوغ حتى الحمل والولادة."
        : "FemoLife: Your comprehensive women's health guide from puberty to pregnancy and childbirth."),
    keywords: isArabic
      ? "صحة المرأة, الحمل, الولادة, صحة الأمهات"
      : "women's health, pregnancy, childbirth, maternal health",
    metadataBase: new URL(data.OgUrl || siteUrl),
    alternates: {
      canonical: data.CanonicalUrl || "/",
      languages: { en: "/", ar: "/ar" },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: data.OgTitle || siteName,
      description: data.OgDescription || siteName,
      siteName,
      type: "website",
      url: data.OgUrl || "/",
      images: [
        {
          url: data.OgImageUrl || "/og-img-large.png",
          width: 1200,
          height: 630,
          alt: data.OgTitle || siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.OgTitle || siteName,
      description: data.OgDescription || siteName,
      images: [data.OgImageUrl || "/og-img-large.png"],
      site: "@FemoLife",
      creator: "@FemoLife",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32" },
        { url: "/favicon-16x16.png", sizes: "16x16" },
      ],
      apple: "/apple-touch-icon.png",
    },
    other: {
      "theme-color": "#ffffff",
      ...(data.JsonLd
        ? { "application/ld+json": JSON.stringify(data.JsonLd) }
        : {}),
    },
  };
}

export function fallbackMetadata(locale: string): Metadata {
  const isArabic = locale === "ar";
  const siteName = isArabic ? "فيمولايف" : "FemoLife";
  return {
    title: {
      default: isArabic
        ? "فيمولايف - دليل صحة المرأة والحمل والولادة"
        : "FemoLife - Women's Health Guide, Pregnancy & Childbirth",
      template: `%s | ${siteName}`,
    },
    description: isArabic
      ? "فيمولايف: دليلكِ الشامل لصحة المرأة."
      : "FemoLife: Your comprehensive women's health guide.",
  };
}
