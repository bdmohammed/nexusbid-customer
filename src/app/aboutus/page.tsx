import AboutHero from "@/components/aboutus/AboutHero";
import Story from "@/components/aboutus/Story";
import Values from "@/components/aboutus/Values";
import Leadership from "@/components/aboutus/Leadership";
import GlobalNetwork from "@/components/aboutus/GlobalNetwork";
import AboutCTA from "@/components/aboutus/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <Story />
        <Values />
        <Leadership />
        <GlobalNetwork />
        <AboutCTA />
      </main>
    </>
  );
}
