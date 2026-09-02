import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";

type FieldType = "text" | "email" | "tel" | "textarea" | "select";

interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  maxLength?: number;
}

export type FormVariant = "bespoke" | "contact" | "consultation" | "visa" | "referral";

const FIELD_SETS: Record<FormVariant, FieldDef[]> = {
  bespoke: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
    { name: "whatsapp", label: "WhatsApp / phone", type: "tel", required: true, maxLength: 25 },
    { name: "destination", label: "Destination", type: "text", required: true, maxLength: 120, placeholder: "Where do you want to go?" },
    { name: "departureLocation", label: "Departure location", type: "text", maxLength: 120 },
    { name: "travelDates", label: "Travel dates", type: "text", required: true, maxLength: 120, placeholder: "Exact dates, or a rough window" },
    { name: "travellers", label: "Number of travellers", type: "text", required: true, maxLength: 20 },
    {
      name: "travellerType",
      label: "Traveller type",
      type: "select",
      options: ["Solo", "Couple", "Group", "Family"],
      required: true,
    },
    { name: "budget", label: "Approximate budget range", type: "text", maxLength: 120 },
    { name: "accommodation", label: "Accommodation preference", type: "text", maxLength: 200 },
    { name: "interests", label: "Interests & activities", type: "text", maxLength: 300 },
    {
      name: "visaAssistance",
      label: "Do you need visa assistance?",
      type: "select",
      options: ["Not sure yet", "Yes", "No"],
    },
    { name: "message", label: "Anything else we should know?", type: "textarea", maxLength: 1500 },
  ],
  contact: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
    { name: "whatsapp", label: "WhatsApp / phone", type: "tel", maxLength: 25 },
    { name: "message", label: "Tell us about your trip", type: "textarea", required: true, maxLength: 1500 },
  ],
  consultation: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
    { name: "whatsapp", label: "WhatsApp / phone", type: "tel", required: true, maxLength: 25 },
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
    },
    { name: "message", label: "A bit more detail", type: "textarea", maxLength: 1500 },
  ],
  visa: [
    { name: "name", label: "Full name", type: "text", required: true, maxLength: 100 },
    { name: "email", label: "Email", type: "email", required: true, maxLength: 255 },
    { name: "whatsapp", label: "WhatsApp / phone", type: "tel", required: true, maxLength: 25 },
    { name: "destination", label: "Destination", type: "text", required: true, maxLength: 120 },
    { name: "message", label: "Anything else we should know?", type: "textarea", maxLength: 1500 },
  ],
  referral: [
    { name: "name", label: "Your name", type: "text", required: true, maxLength: 100 },
    { name: "contact", label: "Your contact (email or WhatsApp)", type: "text", required: true, maxLength: 150 },
    { name: "referralName", label: "Person you're referring", type: "text", required: true, maxLength: 100 },
    { name: "referralContact", label: "Their contact (email or WhatsApp)", type: "text", required: true, maxLength: 150 },
    { name: "referralPlan", label: "What are they planning?", type: "text", maxLength: 300 },
    { name: "message", label: "Optional message", type: "textarea", maxLength: 800 },
  ],
};

const SUBJECTS: Record<FormVariant, string> = {
  bespoke: "New Bespoke Trip Enquiry",
  contact: "New Website Contact Message",
  consultation: "New Consultation Request",
  visa: "New Visa Assistance Enquiry",
  referral: "New Referral",
};

function buildSchema(fields: FieldDef[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    let s: z.ZodTypeAny = z.string().trim().max(f.maxLength ?? 2000);
    if (f.type === "email") s = (s as z.ZodString).email("Please enter a valid email");
    if (f.required) {
      s = (s as z.ZodString).min(1, `${f.label} is required`);
    } else {
      s = s.optional().or(z.literal(""));
    }
    shape[f.name] = s;
  }
  return z.object(shape);
}

export default function EnquiryForm({ variant }: { variant: FormVariant }) {
  const fields = FIELD_SETS[variant];
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

    if (!accessKey) {
      setErrorMsg(
        "This form isn't fully configured yet — please email or WhatsApp us directly using the details on this page."
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
        setStatus("success");
        formRef.current?.reset();
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
        <p className="text-h3 text-navy">Thank you — we've got it.</p>
        <p className="text-body text-slate mt-2">
          We'll be in touch shortly. If it's urgent, message us directly on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot field — hidden from real users, visible to bots that fill every field. */}
      <div style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {fields.map((f) => (
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
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              maxLength={f.maxLength}
              className="field-input"
            />
          )}
        </div>
      ))}

      {errorMsg && (
        <p className="field-error" role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>

      <p className="text-body-s text-slate">
        By submitting, you agree to be contacted by JM Travels about your enquiry. See our{" "}
        <a href="/privacy-policy" className="link-editorial">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
