import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { site } from "@/config/site";

type FieldType = "text" | "email" | "tel" | "textarea" | "select" | "date";

interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
  options?: string[];
  required?: boolean;
  /** Overrides the default "<Label> is required" message (useful when the label is a question). */
  requiredMessage?: string;
  maxLength?: number;
}

// A row is either a single field (full width) or a group of fields laid out
// side by side on wider screens (contact pairs, departure date + trip length).
type FieldRow = FieldDef | FieldDef[];

export type FormVariant = "bespoke" | "services" | "contact" | "consultation" | "visa" | "referral";

const contactRow: FieldDef[] = [
  { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
  { name: "whatsapp", label: "WhatsApp / phone", type: "tel", required: true, maxLength: 25 },
];

const FIELD_SETS: Record<FormVariant, FieldRow[]> = {
  // Kept to the essentials: enough to reach out with a real sense of the trip.
  // Budget, accommodation, interests and visa needs come up in the follow-up
  // conversation (or in the optional notes) rather than as separate fields.
  // WhatsApp is the main channel, so email is optional here.
  bespoke: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    [{ ...contactRow[0], required: false }, contactRow[1]],
    {
      name: "destination",
      label: "Where would you like to go?",
      type: "text",
      required: true,
      requiredMessage: "Please tell us where you'd like to go",
      maxLength: 120,
      placeholder: "e.g. Zanzibar, or \"not sure yet\"",
    },
    [
      { name: "departureDate", label: "Departure date", type: "date", required: true, hint: "Approximate is fine." },
      {
        name: "tripLength",
        label: "Trip length",
        type: "select",
        options: ["2 to 3 nights", "4 to 6 nights", "1 week", "2 weeks", "More than 2 weeks", "Not sure yet"],
        required: true,
      },
    ],
    {
      name: "travellers",
      label: "Number of travellers",
      type: "select",
      options: ["1", "2", "3 to 5", "6 to 10", "More than 10"],
      required: true,
    },
    {
      name: "message",
      label: "Anything else we should know?",
      type: "textarea",
      maxLength: 1500,
      placeholder: "Optional: the occasion, a rough budget, or the kind of trip you have in mind.",
    },
  ],
  // Anything that isn't a full trip. The timeline helps triage urgent requests
  // (visa appointments, near-term flights) without asking for exact dates.
  services: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    [{ ...contactRow[0], required: false }, contactRow[1]],
    {
      name: "service",
      label: "Which service do you need?",
      type: "select",
      options: [
        "Visa assistance",
        "Travel consultation",
        "Flight booking",
        "Hotel / accommodation booking",
        "Airport transfers or activities",
        "Something else",
      ],
      required: true,
      requiredMessage: "Please choose the service you need",
    },
    [
      {
        name: "destination",
        label: "Destination (if relevant)",
        type: "text",
        maxLength: 120,
        placeholder: "e.g. United Kingdom, Dubai",
      },
      {
        name: "timeline",
        label: "When do you need this?",
        type: "select",
        options: ["As soon as possible", "Within 2 weeks", "Within 1 to 3 months", "More than 3 months away", "Just exploring for now"],
        required: true,
        requiredMessage: "Please tell us when you need this",
      },
    ],
    {
      name: "message",
      label: "Tell us a bit more",
      type: "textarea",
      maxLength: 1500,
      placeholder: "Optional: travel dates, number of people, visa type, or anything specific.",
    },
  ],
  contact: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    [contactRow[0], { ...contactRow[1], required: false }],
    { name: "message", label: "Tell us about your trip", type: "textarea", required: true, maxLength: 1500 },
  ],
  consultation: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    contactRow,
    {
      name: "topic",
      label: "What do you need help with?",
      type: "select",
      options: [
        "Choosing a destination",
        "Reviewing my itinerary",
        "Understanding the visa process",
        "Planning a group trip",
        "Something else",
      ],
      required: true,
      requiredMessage: "Please choose what you need help with",
    },
    { name: "message", label: "A bit more detail", type: "textarea", maxLength: 1500 },
  ],
  visa: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    contactRow,
    { name: "destination", label: "Destination", type: "text", required: true, maxLength: 120 },
    { name: "message", label: "Anything else we should know?", type: "textarea", maxLength: 1500 },
  ],
  referral: [
    [
      { name: "name", label: "Your name", type: "text", required: true, maxLength: 100 },
      { name: "contact", label: "Your contact (email or WhatsApp)", type: "text", required: true, maxLength: 150 },
    ],
    [
      { name: "referralName", label: "Person you're referring", type: "text", required: true, maxLength: 100 },
      { name: "referralContact", label: "Their contact (email or WhatsApp)", type: "text", required: true, maxLength: 150 },
    ],
    { name: "referralPlan", label: "What are they planning?", type: "text", maxLength: 300 },
    { name: "message", label: "Optional message", type: "textarea", maxLength: 800 },
  ],
};

const SUBJECTS: Record<FormVariant, string> = {
  bespoke: "New Bespoke Trip Enquiry",
  services: "New Service Enquiry",
  contact: "New Website Contact Message",
  consultation: "New Consultation Request",
  visa: "New Visa Assistance Enquiry",
  referral: "New Referral",
};

function buildSchema(fields: FieldDef[]): z.ZodTypeAny {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    let s: z.ZodTypeAny = z.string().trim().max(f.maxLength ?? 2000);
    if (f.type === "email") s = (s as z.ZodString).email("Please enter a valid email");
    if (f.required) {
      const message =
        f.requiredMessage ?? (f.type === "select" ? `Please choose ${f.label.toLowerCase()}` : `${f.label} is required`);
      s = (s as z.ZodString).min(1, message);
    } else {
      s = s.optional().or(z.literal(""));
    }
    shape[f.name] = s;
  }
  return z.object(shape);
}

function formatDate(value: string) {
  if (!value) return value;
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function EnquiryForm({ variant }: { variant: FormVariant }) {
  const rows = FIELD_SETS[variant];
  const fields = rows.flat();
  const schema = buildSchema(fields);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);

    // Honeypot: real users never fill this hidden field.
    if ((fd.get("company_website") as string)?.length) {
      setStatus("success");
      formRef.current?.reset();
      return;
    }

    const data: Record<string, string> = {};
    for (const f of fields) data[f.name] = ((fd.get(f.name) as string) ?? "").trim();

    const result = schema.safeParse(data);
    if (!result.success) {
      setErrorMsg(result.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    // Send human-readable dates in the notification email rather than raw ISO values.
    for (const f of fields) {
      if (f.type === "date" && data[f.name]) data[f.name] = formatDate(data[f.name]);
    }

    if (!accessKey) {
      setErrorMsg(
        "This form isn't fully configured yet. Please email or WhatsApp us directly using the details on this page."
      );
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[JM Travels] ${SUBJECTS[variant]}`,
          from_name: "JM Travels Website",
          botcheck: "",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        window.location.href = "/thank-you";
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong sending your enquiry. Please try again or reach us on WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card-surface shadow-soft p-8 text-center" role="status">
        <p className="text-h3 text-navy">Thank you, we've got it.</p>
        <p className="text-body text-slate mt-2">
          We'll be in touch shortly. If it's urgent, message us directly on WhatsApp.
        </p>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  const renderField = (f: FieldDef) => (
    <div key={f.name}>
      <label htmlFor={f.name} className="field-label">
        {f.label}
        {f.required && <span aria-hidden="true"> *</span>}
      </label>
      {f.type === "textarea" ? (
        <textarea id={f.name} name={f.name} placeholder={f.placeholder} maxLength={f.maxLength} rows={4} className="field-input" />
      ) : f.type === "select" ? (
        <select id={f.name} name={f.name} className="field-input" defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {f.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : f.type === "date" ? (
        <input
          id={f.name}
          name={f.name}
          type="date"
          className="field-input"
          aria-describedby={f.hint ? `${f.name}-hint` : undefined}
          min={today}
        />
      ) : (
        <input
          id={f.name}
          name={f.name}
          type={f.type}
          placeholder={f.placeholder}
          maxLength={f.maxLength}
          className="field-input"
          aria-describedby={f.hint ? `${f.name}-hint` : undefined}
        />
      )}
      {f.hint && (
        <p id={`${f.name}-hint`} className="text-body-s text-slate mt-1.5">
          {f.hint}
        </p>
      )}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot field — hidden from real users, visible to bots that fill every field. */}
      <div style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {rows.map((row) =>
        Array.isArray(row) ? (
          <div key={row.map((f) => f.name).join("+")} className="grid sm:grid-cols-2 gap-6 sm:gap-4">
            {row.map(renderField)}
          </div>
        ) : (
          renderField(row)
        )
      )}

      {errorMsg && (
        <p className="field-error" role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>

      <p className="text-body-s text-slate">
        We typically reply within {site.responseTimePromise}. By submitting,
        you agree to be contacted by JM Travels about your enquiry. See our{" "}
        <a href="/privacy-policy" className="link-editorial">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
