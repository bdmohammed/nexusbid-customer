import Image from "next/image";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Corporate Info Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border)]">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-[var(--primary)] uppercase">
              Corporate Head Office
            </span>
            <h3 className="text-2xl font-extrabold text-[var(--foreground)]">
              RFPNexa
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          {/* Sales Inquiries & Mobile */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-1">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-wider text-[var(--muted)] font-bold">
                Sales Inquiries & Mobile
              </h5>
              <a
                href="tel:+12121212121"
                className="text-base font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors mt-0.5 block"
              >
                +1 (212) 121-2121
              </a>
            </div>
          </div>

          {/* Email Us */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-wider text-[var(--muted)] font-bold">
                Email ID
              </h5>
              <a
                href="mailto:Info@rfpnexa.com"
                className="text-base font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors mt-0.5 block"
              >
                Info@rfpnexa.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-wider text-[var(--muted)] font-bold">
                Corporate Address
              </h5>
              <p className="text-sm font-medium text-[var(--foreground)] mt-0.5 leading-relaxed">
                401 Congress Ave, Suite 1540
                <br />
                Austin, TX 78701, USA
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-1">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-wider text-[var(--muted)] font-bold">
                Office Hours
              </h5>
              <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">
                Mon - Fri: 8:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Office Photo Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] h-[240px] shadow-md group">
        <Image
          src="/contact/contact-office.png"
          alt="RFPNexa Corporate Head Office"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            North America Hub
          </p>
          <p className="text-base font-bold">
            RFPNexa Headquarters • Austin, TX
          </p>
        </div>
      </div>

      {/* Quick Help Card */}
      <div className="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-3xl p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-base text-[var(--foreground)]">
            Looking for Immediate Answers?
          </h4>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            Check out our FAQs or reach sales at{" "}
            <a
              href="mailto:Info@rfpnexa.com"
              className="text-[var(--primary)] font-semibold hover:underline"
            >
              Info@rfpnexa.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
