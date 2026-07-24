"use client";

import { useSubmitContact } from "@/features/contact/api/mutations";
import React, { useState } from "react";
import { getErrorMessage } from "@/lib/errors";
import { Send, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

export default function ContactForm() {
  const submitContactMutation = useSubmitContact();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("United States");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCaptchaClick = () => {
    if (isCaptchaVerified) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setIsCaptchaVerified(true);
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    if (!name || !email || !message) {
      setErrorMsg("Please fill in all required fields (Name, Email ID, and Message).");
      return;
    }

    if (!isCaptchaVerified) {
      setErrorMsg("Please verify that you are not a robot.");
      return;
    }

    try {
      await submitContactMutation.mutateAsync({
        name,
        email,
        organization,
        country,
        phone: mobile,
        message,
      });
      setSuccess(true);
      setName("");
      setEmail("");
      setOrganization("");
      setMobile("");
      setMessage("");
      setIsCaptchaVerified(false);
    } catch (err: any) {
      setErrorMsg(
        getErrorMessage(err) ||
          "Failed to submit contact message. Please try again."
      );
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
          Send us a message
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Fill in the details below and our team will get back to you promptly.
        </p>
      </div>

      {success ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)]">
            Message Received!
          </h3>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
            Thank you for reaching out to RFPNexa. Our corporate support team has received your message and will contact you shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-all"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl text-xs sm:text-sm font-medium text-center">
              {errorMsg}
            </div>
          )}

          {/* Grid fields */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-4 text-sm text-[var(--foreground)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] transition-all"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Email ID <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Info@company.com"
                className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-4 text-sm text-[var(--foreground)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] transition-all"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Organization
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Company or agency name"
                className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-4 text-sm text-[var(--foreground)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-4 text-sm text-[var(--foreground)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] transition-all"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="India">India</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
              Mobile No.
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+1 (212) 121-2121"
              className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-4 text-sm text-[var(--foreground)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how we can assist you with subscriptions, tenders or services..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-4 py-3 text-sm text-[var(--foreground)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)] transition-all"
              required
            />
          </div>

          {/* CAPTCHA Card */}
          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]/30 flex items-center justify-between">
            <div
              onClick={handleCaptchaClick}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div
                className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                  isCaptchaVerified
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-gray-400 bg-white dark:bg-slate-800"
                }`}
              >
                {captchaLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
                ) : isCaptchaVerified ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : null}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[var(--foreground)]">
                I'm not a robot
              </span>
            </div>

            <div className="flex flex-col items-end opacity-70">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <span className="text-[10px] text-[var(--muted)] font-sans">
                reCAPTCHA
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitContactMutation.isPending}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitContactMutation.isPending ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Submit</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
