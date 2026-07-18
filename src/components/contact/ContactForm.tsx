"use client";

import { useSubmitContact } from "@/features/contact/api/mutations";
import React, { useState } from "react";
import { getErrorMessage } from "@/lib/errors";

export default function ContactForm() {
  const submitContactMutation = useSubmitContact();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    if (!name || !email || !subject || !message) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      await submitContactMutation.mutateAsync({
        name,
        email,
        //@ts-ignore
        subject,
        message,
      });
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setErrorMsg(
        getErrorMessage(err) ||
          "Failed to submit contact message. Please try again.",
      );
    }
  };

  return (
    <div
      className="
      bg-[var(--surface)]
      border
      border-[var(--border)]
      rounded-2xl
      p-6
      lg:p-8
    "
    >
      {success ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto animate-bounce">
            ✓
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            Message Sent!
          </h3>
          <p className="text-sm text-[var(--muted)] max-w-sm mx-auto">
            Thank you for contacting us. Our team will review your inquiry and
            get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-xs font-medium text-center">
              {errorMsg}
            </div>
          )}

          <div
            className="
            grid
            md:grid-cols-2
            gap-4
          "
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="
                w-full
                h-12
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-4
                text-[var(--foreground)]
                focus:outline-hidden focus:ring-1 focus:ring-[#003EC7]
              "
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
                Business Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@enterprise.com"
                className="
                w-full
                h-12
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-4
                text-[var(--foreground)]
                focus:outline-hidden focus:ring-1 focus:ring-[#003EC7]
              "
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="
              w-full
              h-12
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              text-[var(--foreground)]
              focus:outline-hidden focus:ring-1 focus:ring-[#003EC7]
            "
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
              Message
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              py-3
              text-[var(--foreground)]
              focus:outline-hidden focus:ring-1 focus:ring-[#003EC7]
            "
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitContactMutation.isPending}
            className="
            px-8
            py-4
            rounded-xl
            bg-[#003EC7]
            hover:bg-[#002fad]
            text-white
            font-semibold
            transition-all
            disabled:opacity-50
            flex items-center gap-2
          "
          >
            {submitContactMutation.isPending ? "Sending..." : "Send Message →"}
          </button>
        </form>
      )}
    </div>
  );
}
