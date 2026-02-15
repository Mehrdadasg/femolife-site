import BreastfeedingFeatures from "@/features/main/components/BreastfeedingFeatures";
import DietPlan from "@/features/main/components/DietPlan";
import FAQ from "@/features/main/components/FAQ";
import HeroSection from "@/features/main/components/HeroSection";
import LastedArticles from "@/features/main/components/LastedArticles";
import OurFeatures from "@/features/main/components/OurFeatures";
import PeriodFeatures from "@/features/main/components/PeriodFeatures";
import PregnancyFeatures from "@/features/main/components/PregnancyFeatures";
import SeeMore from "@/features/main/components/SeeMore";
import Testimonials from "@/features/main/components/Testimonials";
import TherapyClinic from "@/features/main/components/TherapyClinic";

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
        <Testimonials locale={locale} />
        <TherapyClinic locale={locale} />
        <DietPlan locale={locale} />
        <SeeMore locale={locale} />
        <LastedArticles locale={locale} />
      </section>
      <FAQ locale={locale} />
    </main>
  );
}
