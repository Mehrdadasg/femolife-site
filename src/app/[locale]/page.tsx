import BreastfeedingFeatures from "@/features/main/components/BreastfeedingFeatures";
import HeroSection from "@/features/main/components/HeroSection";
import LastedArticles from "@/features/main/components/LastedArticles";
import OurFeatures from "@/features/main/components/OurFeatures";
import PeriodFeatures from "@/features/main/components/PeriodFeatures";
import PregnancyFeatures from "@/features/main/components/PregnancyFeatures";
import SeeMore from "@/features/main/components/SeeMore";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main>
      <HeroSection locale={locale} />
      <section className="w-full max-w-7xl 2xl:max-w-[1366px] mx-auto">
        <OurFeatures locale={locale} />
        <PeriodFeatures locale={locale} />
        <PregnancyFeatures locale={locale} />
        <BreastfeedingFeatures locale={locale} />
        <SeeMore locale={locale} />
        <LastedArticles locale={locale} />
      </section>
    </main>
  );
}
