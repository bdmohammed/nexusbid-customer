import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import GlobalPresence from "@/components/contact/GlobalPresence";
import MobileQuickLinks from "@/components/contact/MobileQuickLinks";

export const metadata = {
  title: "Contact Us | RFPNexa",
  description: "Get in touch with RFPNexa for queries about subscriptions, tenders, or services.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <ContactForm />
              <MobileQuickLinks />
            </div>

            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <GlobalPresence />
    </main>
  );
}
