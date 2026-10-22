"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

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

  const [startedAt] = useState(() => Date.now());
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
          className={`text-sm lg:col-span-2 ${
            status.type === "success" ? "text-emerald-300" : "text-red-300"
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
