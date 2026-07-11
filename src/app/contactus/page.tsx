import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import GlobalPresence from "@/components/contact/GlobalPresence";
import MobileQuickLinks from "@/components/contact/MobileQuickLinks";

export const metadata = {
  title: "Contact Us | NexusBid",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <ContactForm />
              <MobileQuickLinks />
            </div>

            <div className="hidden lg:block lg:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <GlobalPresence />
    </main>
  );
}
