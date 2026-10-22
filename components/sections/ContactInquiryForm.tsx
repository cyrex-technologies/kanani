"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { contactCityOptions, contactInquiryOptions } from "@/data/contact";
import { getBranchesForCity, getDefaultBranch, getDefaultCity } from "@/lib/contact-form";

type ContactInquiryFormProps = {
  initialPosition?: string;
  initialProduct?: string;
};

export default function ContactInquiryForm({ initialPosition, initialProduct }: ContactInquiryFormProps) {
  const searchParams = useSearchParams();
  const position = initialPosition?.trim() || searchParams.get("position")?.trim();
  const product = initialProduct?.trim() || searchParams.get("product")?.trim();
  const defaultCity = getDefaultCity();

  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    interest: position ? "Careers" : contactInquiryOptions[0],
    city: defaultCity,
    preferredBranch: getDefaultBranch(defaultCity),
    product: product ?? "",
    message: position
      ? `I would like more information about the ${position} opportunity at Kanan Services Limited.`
      : product ? `I would like more information about ${product}.` : "",
    company: "",
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateCity(city: string) {
    setForm((current) => ({
      ...current,
      city,
      preferredBranch: getDefaultBranch(city),
    }));
  }

  function resetForm() {
    setStartedAt(Date.now());
    setForm({
      name: "",
      email: "",
      phone: "",
      interest: position ? "Careers" : contactInquiryOptions[0],
      city: defaultCity,
    preferredBranch: getDefaultBranch(defaultCity),
      product: product ?? "",
      message: position
        ? `I would like more information about the ${position} opportunity at Kanan Services Limited.`
        : product ? `I would like more information about ${product}.` : "",
      company: "",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const payload = new URLSearchParams({
        name: form.name,
        email: form.email,
        phone: form.phone,
        interest: form.interest,
        city: form.city,
        preferred_branch: form.preferredBranch,
        product: form.product,
        message: form.message,
        company: form.company,
        started_at: String(startedAt),
      });
      const response = await fetch("/contact-handler.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: payload,
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      setStatus({
        type: "success",
        message: result.message || "Your inquiry has been sent successfully.",
      });
      const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
      analytics.gtag?.("event", "generate_lead", {
        form_name: "contact_inquiry",
        product_name: product || undefined,
      });
      resetForm();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send your message right now.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status.type === "success") {
    return (
      <section
        className="flex min-h-[25rem] flex-col items-center justify-center rounded-[1.75rem] bg-white px-6 py-12 text-center text-[var(--kanan-text)] shadow-[0_18px_42px_rgba(0,0,0,0.16)]"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-500 ring-8 ring-emerald-50">
          <CheckCircle2 className="h-12 w-12" aria-hidden="true" />
        </span>
        <h3 className="mt-7 text-3xl font-black tracking-tight">Thank you!</h3>
        <p className="mt-3 max-w-sm text-lg leading-8 text-[var(--kanan-muted-strong)]">
          Your enquiry was submitted successfully. Our team will be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ type: "idle", message: "" })}
          className="btn-theme-primary mt-8 rounded-full px-6 py-3 text-sm font-semibold"
        >
          Send another enquiry
        </button>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
      <input
        type="text"
        value={form.company}
        onChange={(event) => updateField("company", event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <input
        type="text"
        required
        minLength={2}
        maxLength={100}
        value={form.name}
        onChange={(event) => updateField("name", event.target.value)}
        placeholder="Name"
        className="h-14 rounded-none border border-white/10 bg-white px-5 text-sm text-[var(--kanan-text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--kanan-brand-gold-soft)]"
      />

      <select
        value={form.interest}
        onChange={(event) => updateField("interest", event.target.value)}
        className="h-14 rounded-none border border-white/10 bg-white px-5 text-sm text-[var(--kanan-text)] outline-none transition focus:border-[var(--kanan-brand-gold-soft)]"
      >
        {contactInquiryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="email"
        required
        value={form.email}
        onChange={(event) => updateField("email", event.target.value)}
        placeholder="Email Address"
        className="h-14 rounded-none border border-white/10 bg-white px-5 text-sm text-[var(--kanan-text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--kanan-brand-gold-soft)]"
      />

      <textarea
        required
        minLength={10}
        maxLength={5000}
        value={form.message}
        onChange={(event) => updateField("message", event.target.value)}
        placeholder="Tell us what you need"
        rows={5}
        className="min-h-[142px] rounded-none border border-white/10 bg-white px-5 py-4 text-sm text-[var(--kanan-text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--kanan-brand-gold-soft)] lg:row-span-3"
      />

      <input
        type="tel"
        required
        maxLength={40}
        value={form.phone}
        onChange={(event) => updateField("phone", event.target.value)}
        placeholder="Phone Number"
        className="h-14 rounded-none border border-white/10 bg-white px-5 text-sm text-[var(--kanan-text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--kanan-brand-gold-soft)]"
      />

      <select
        required
        value={form.city}
        onChange={(event) => updateCity(event.target.value)}
        className="h-14 rounded-none border border-white/10 bg-white px-5 text-sm text-[var(--kanan-text)] outline-none transition focus:border-[var(--kanan-brand-gold-soft)]"
      >
        {getBranchesForCity(form.city).length > 0 ? null : (
          <option value="">Select City</option>
        )}
        {contactCityOptions.map((option) => (
          <option key={option.city} value={option.city}>
            {option.city}
          </option>
        ))}
      </select>

      <select
        required
        value={form.preferredBranch}
        onChange={(event) => updateField("preferredBranch", event.target.value)}
        className="h-14 rounded-none border border-white/10 bg-white px-5 text-sm text-[var(--kanan-text)] outline-none transition focus:border-[var(--kanan-brand-gold-soft)]"
      >
        {getBranchesForCity(form.city).map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-theme-primary h-14 rounded-none px-6 text-sm font-semibold transition lg:col-span-2"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>

      {status.type !== "idle" ? (
        <p
          className="text-sm text-red-300 lg:col-span-2"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
