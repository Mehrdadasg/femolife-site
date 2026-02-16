import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import Header from "@/features/header";
import Footer from "@/features/footer";
import FixedAppBar from "@/features/main/components/FixedAppBar";
import { Toaster } from "react-hot-toast";
import { getSeoData } from "@/service/getSeoData";
import JsonLd from "@/shared/components/json-ld";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-noto-kufi",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const siteUrl = "https://femolife.app";
  const siteName = isArabic ? "فيمولايف" : "FemoLife";

  try {
    const { Data } = await getSeoData(locale);
    return {
      title: {
        default:
          Data.MetaTitle ||
          (isArabic
            ? "فيمولايف - دليل صحة المرأة والحمل والولادة"
            : "FemoLife - Women's Health Guide, Pregnancy & Childbirth"),
        template: `%s | ${siteName}`,
      },
      description:
        Data.MetaDescription ||
        (isArabic
          ? "فيمولايف: دليلكِ الشامل لصحة المرأة من البلوغ حتى الحمل والولادة وصحة الأمهات."
          : "FemoLife: Your comprehensive guide to women's health from puberty to pregnancy, childbirth, and maternal wellness."),
      keywords: isArabic
        ? "صحة المرأة, الحمل, الولادة, البلوغ, صحة الأمهات"
        : "women's health, pregnancy, childbirth, puberty, maternal health",
      metadataBase: new URL(Data.OgUrl || siteUrl),
      alternates: {
        canonical: Data.CanonicalUrl || "/",
        languages: {
          en: "/",
          ar: "/ar",
        },
      },
      robots: { index: true, follow: true },
      openGraph: {
        title: Data.OgTitle || siteName,
        description:
          Data.OgDescription ||
          (isArabic
            ? "فيمولايف: دليلكِ الشامل لصحة المرأة"
            : "FemoLife: Your comprehensive women's health guide"),
        siteName,
        type: "website",
        url: Data.OgUrl || "/",
        images: [
          {
            url: Data.OgImageUrl || "/og-img-large.png",
            width: 1200,
            height: 630,
            alt: Data.OgTitle || siteName,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: Data.OgTitle || siteName,
        description:
          Data.OgDescription ||
          (isArabic
            ? "فيمولايف: دليلكِ الشامل لصحة المرأة"
            : "FemoLife: Your comprehensive women's health guide"),
        images: [Data.OgImageUrl || "/og-img-large.png"],
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
        "msapplication-TileImage": "/ms-icon.png",
        ...(Data.JsonLd
          ? { "application/ld+json": JSON.stringify(Data.JsonLd) }
          : {
              "application/ld+json": JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Website",
                name: siteName,
                url: siteUrl,
                description: isArabic
                  ? "فيمولايف: دليلكِ الشامل لصحة المرأة"
                  : "FemoLife: Comprehensive women's health guide",
                inLanguage: locale,
                publisher: {
                  "@type": "Organization",
                  name: siteName,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/logo.png`,
                  },
                },
              }),
            }),
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      title: {
        default: isArabic
          ? "فيمولايف - دليل صحة المرأة والحمل والولادة"
          : "FemoLife - Women's Health Guide, Pregnancy & Childbirth",
        template: `%s | ${siteName}`,
      },
      description: isArabic
        ? "فيمولايف: دليلكِ الشامل لصحة المرأة من البلوغ حتى الحمل والولادة."
        : "FemoLife: Your comprehensive guide to women's health from puberty to pregnancy and childbirth.",
      metadataBase: new URL(siteUrl),
      alternates: {
        languages: {
          en: "/",
          ar: "/ar",
        },
      },
    };
  }
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  interactiveWidget: "resizes-content",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";
  const fontClass = isRtl
    ? notoKufiArabic.className
    : inter.className;

  const messages = await getMessages();

  let seoData;
  try {
    const result = await getSeoData(locale);
    seoData = result?.Data;
  } catch {
    seoData = null;
  }

  return (
    <html lang={locale} dir={dir}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T9QMQZHC');
          `,
          }}
        />
      </head>
      <body className={`${fontClass} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T9QMQZHC"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <NextTopLoader color={"#ff5a7c"} showSpinner={false} />
            <JsonLd json={seoData?.JsonLd} />
            <Header />
            {children}
            <Footer />
            <FixedAppBar />
          </ReactQueryProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: { direction: dir },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
