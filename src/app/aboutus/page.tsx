import AboutHero from "@/components/aboutus/AboutHero";
import HowWeWork from "@/components/aboutus/HowWeWork";
import WhyRFPNexa from "@/components/aboutus/WhyRFPNexa";
import GlobalNetwork from "@/components/aboutus/GlobalNetwork";
import AboutCTA from "@/components/aboutus/AboutCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <HowWeWork />
      <WhyRFPNexa />
      <GlobalNetwork />
      <AboutCTA />
    </main>
  );
}
