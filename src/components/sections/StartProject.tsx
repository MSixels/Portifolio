"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";
import { SectionFrost } from "../Overlay";

/* Shared control styling — matches the frosted/cyan aesthetic. */
const CONTROL =
  "w-full rounded-[12px] border border-white/[0.12] bg-white/[0.02] px-[16px] py-[13px] text-[15px] text-ink outline-none transition-colors duration-[200ms] placeholder:text-muted-3 focus:border-[rgba(90,140,255,0.55)] focus:bg-[rgba(90,140,255,0.04)]";

const PROJECT_TYPES = [
  { value: "mvp", labelKey: "form.type.mvp" },
  { value: "api", labelKey: "form.type.api" },
  { value: "web", labelKey: "form.type.web" },
  { value: "maintenance", labelKey: "form.type.maint" },
];

/**
 * UI-only service-request form. Submission is intentionally inert
 * (preventDefault) — backend wiring comes later. Every control is
 * associated with a <label htmlFor>, required fields are flagged for
 * assistive tech, and native validation is disabled (noValidate) so
 * the semantic `required` stays without browser bubbles.
 */
export function StartProject() {
  const { t } = useI18n();

  return (
    <section
      id="iniciar-projeto"
      className="relative mx-auto max-w-[1240px] px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vh,120px)]"
    >
      <SectionHeader number="08" labelKey="sec.start" />

      <div className="grid grid-cols-1 gap-[clamp(28px,4vw,64px)] md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal delay={60}>
            <h2 className="max-w-[16ch] font-display text-[clamp(30px,4vw,52px)] font-normal leading-[1.08] tracking-[-0.5px] text-ink">
              {t("start.head")}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-[22px] max-w-[46ch] text-[clamp(15px,1.4vw,17px)] font-light leading-[1.7] text-muted">
              {t("start.sub")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 gap-[18px] sm:grid-cols-2"
          >
            {/* Project type — native select with a custom chevron */}
            <Field id="sp-type" label={t("form.type.label")} required>
              <div className="relative">
                <select
                  id="sp-type"
                  name="projectType"
                  required
                  aria-required="true"
                  defaultValue=""
                  className={`${CONTROL} appearance-none bg-base pr-[40px]`}
                >
                  <option value="" disabled>
                    {t("form.type.placeholder")}
                  </option>
                  {PROJECT_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>

            <Field id="sp-stack" label={t("form.stack.label")}>
              <input
                id="sp-stack"
                name="stack"
                type="text"
                autoComplete="off"
                placeholder={t("form.stack.ph")}
                className={CONTROL}
              />
            </Field>

            <Field id="sp-deadline" label={t("form.deadline.label")}>
              <input
                id="sp-deadline"
                name="deadline"
                type="text"
                autoComplete="off"
                placeholder={t("form.deadline.ph")}
                className={CONTROL}
              />
            </Field>

            <Field id="sp-budget" label={t("form.budget.label")}>
              <input
                id="sp-budget"
                name="budget"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder={t("form.budget.ph")}
                className={CONTROL}
              />
            </Field>

            {/* Problem description — spans both columns */}
            <Field
              id="sp-desc"
              label={t("form.desc.label")}
              required
              className="sm:col-span-2"
            >
              <textarea
                id="sp-desc"
                name="description"
                required
                aria-required="true"
                rows={5}
                placeholder={t("form.desc.ph")}
                className={`${CONTROL} resize-y min-h-[130px] leading-[1.6]`}
              />
            </Field>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-[12px] bg-accent px-[24px] py-[15px] text-[14.5px] font-medium text-[#04060a] transition-colors duration-[220ms] hover:bg-[#54e4ff] sm:w-auto"
              >
                {t("form.submit")}
              </button>
            </div>
          </form>
        </Reveal>
      </div>

      <SectionFrost />
    </section>
  );
}

/* Label + control wrapper. `id` links the <label> to the control the
 * caller renders, keeping the accessible name explicit. */
function Field({
  id,
  label,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-[8px] block font-mono text-[11px] uppercase tracking-[1.5px] text-muted-2"
      >
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute right-[15px] top-1/2 -translate-y-1/2 text-muted-2"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
