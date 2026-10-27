"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "motion/react";
import {
  CLINIC_CONFIG,
  CLINIC_SERVICES,
  CLINIC_WHATSAPP_NUMBER,
  PREFERRED_DATES,
  PREFERRED_TIME_SLOTS,
} from "@/lib/clinic-config";
import {
  BookingRequestInput,
  BookingValidationErrors,
  getWhatsAppSubmissionInfo,
  resolveBookingDetails,
  validateBookingStep,
} from "@/lib/booking";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Edit3,
  MessageSquare,
  Sparkles,
  User,
} from "lucide-react";

export default function BookingRequestFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [stepDirection, setStepDirection] = useState<1 | -1>(1);
  const [formState, setFormState] = useState<BookingRequestInput>({
    serviceId: CLINIC_SERVICES[0].id,
    preferredDateId: PREFERRED_DATES[0].id,
    preferredTimeId: PREFERRED_TIME_SLOTS[0].id,
    patientName: "",
    patientPhone: "",
    optionalNote: "",
  });
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [copied, setCopied] = useState<boolean>(false);

  const summaryCardRef = useRef<HTMLDivElement>(null);

  // Pulse live summary card subtly when selection changes
  useEffect(() => {
    const card = summaryCardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      card,
      { scale: 0.992 },
      { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" }
    );
  }, [
    formState.serviceId,
    formState.preferredDateId,
    formState.preferredTimeId,
  ]);

  const handleNextStep = (targetStep: 2 | 3 | 4) => {
    const validationStep = (targetStep - 1) as 1 | 2 | 3;
    const result = validateBookingStep(validationStep, formState);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setStepDirection(1);
    setStep(targetStep);
  };

  const handleJumpToStep = (target: 1 | 2 | 3) => {
    setErrors({});
    setStepDirection(target < step ? -1 : 1);
    setStep(target);
  };

  const handleCopyMessage = async () => {
    const { message } = getWhatsAppSubmissionInfo(
      formState,
      CLINIC_WHATSAPP_NUMBER
    );
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback copy via textarea if clipboard API is restricted in iframe
      const textarea = document.createElement("textarea");
      textarea.value = message;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const resolved = resolveBookingDetails(formState);
  const submissionInfo = getWhatsAppSubmissionInfo(
    formState,
    CLINIC_WHATSAPP_NUMBER
  );

  // In RTL, advancing forward moves right-to-left (entering from left: -14px)
  const stepVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -14 : 14,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 14 : -14,
    }),
  };

  return (
    <div
      id="booking-request"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white overflow-hidden"
    >
      {/* Top Progress Header */}
      <div className="bg-[#0B192C] text-white px-6 py-6 sm:px-8 sm:py-7 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-sky-400 mb-1">
              طلب موعد استشارة · خطوات سريعة ومباشرة
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              نسّق زيارتك المفضلة في لُما
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-lg">
            {CLINIC_CONFIG.bookingDisclaimer}
          </p>
        </div>

        {/* 4-Step Indicator Bar with Shared layoutId Highlight */}
        <ol
          aria-label="خطوات طلب الموعد"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-6 border-t border-slate-800/80 text-xs"
        >
          {[
            { num: 1, label: "نوع الاستشارة" },
            { num: 2, label: "اليوم والوقت المفضل" },
            { num: 3, label: "الاسم والتواصل" },
            { num: 4, label: "مراجعة الطلب" },
          ].map((item) => {
            const isCurrent = step === item.num;
            const isDone = step > item.num;
            return (
              <li
                key={item.num}
                className={`relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border transition-colors ${
                  isCurrent
                    ? "border-sky-400 text-white font-semibold"
                    : isDone
                    ? "bg-slate-900/70 border-slate-700 text-slate-200"
                    : "bg-slate-900/30 border-slate-800/80 text-slate-400"
                }`}
              >
                {isCurrent && (
                  <motion.span
                    layoutId="booking-step-active-bg"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-sky-500/15"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs tabular-nums shrink-0 transition-colors ${
                    isCurrent
                      ? "bg-sky-400 text-slate-950 font-bold"
                      : isDone
                      ? "bg-sky-900 text-sky-200"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : item.num}
                </span>
                <span className="relative z-10 truncate">{item.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Main Interactive Body: 2-Column Layout (Active Step Controls + Live Summary Rail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-200">
        {/* Step Controls Column with RTL-aware AnimatePresence */}
        <div className="lg:col-span-7 p-6 sm:p-8 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={stepDirection}>
            <motion.div
              key={step}
              custom={stepDirection}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div role="region" aria-labelledby="step-1-heading">
                  <div className="mb-6">
                    <span className="text-xs font-mono text-sky-700">
                      STEP 1 OF 4
                    </span>
                    <h3
                      id="step-1-heading"
                      className="text-xl font-bold text-slate-900 mt-1"
                    >
                      اختر نوع الاستشارة أو الفحص
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      جميع الزيارات تبدأ بفحص وتقييم هادئ قبل اقتراح أي إجراء.
                    </p>
                  </div>

                  <div
                    role="radiogroup"
                    aria-labelledby="step-1-heading"
                    className="space-y-3.5"
                  >
                    {CLINIC_SERVICES.map((srv) => {
                      const selected = formState.serviceId === srv.id;
                      return (
                        <motion.button
                          key={srv.id}
                          type="button"
                          role="radio"
                          whileTap={{ scale: 0.985 }}
                          aria-checked={selected}
                          onClick={() => {
                            setFormState((prev) => ({
                              ...prev,
                              serviceId: srv.id,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              serviceId: undefined,
                            }));
                          }}
                          className={`w-full text-start p-5 rounded-xl border transition-colors cursor-pointer ${
                            selected
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50 text-slate-900"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span
                                className={`text-xs font-sans tabular-nums ${
                                  selected ? "text-sky-300" : "text-slate-500"
                                }`}
                              >
                                {srv.code} · {srv.durationNote}
                              </span>
                              <p className="text-base sm:text-lg font-bold mt-1">
                                {srv.title}
                              </p>
                              <p
                                className={`text-sm mt-1.5 leading-relaxed ${
                                  selected ? "text-slate-200" : "text-slate-600"
                                }`}
                              >
                                {srv.description}
                              </p>
                            </div>
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                                selected
                                  ? "border-sky-400 bg-sky-400 text-slate-950"
                                  : "border-slate-400"
                              }`}
                            >
                              {selected && <Check className="w-3.5 h-3.5" />}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {errors.serviceId && (
                    <p
                      role="alert"
                      className="mt-3 text-sm font-medium text-red-600"
                    >
                      {errors.serviceId}
                    </p>
                  )}

                  <div className="mt-8 flex items-center justify-end">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNextStep(2)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>متابعة لاختيار الوقت المفضل</span>
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* STEP 2: Preferred Date and Time */}
              {step === 2 && (
                <div role="region" aria-labelledby="step-2-heading">
                  <div className="mb-6">
                    <span className="text-xs font-mono text-sky-700">
                      STEP 2 OF 4
                    </span>
                    <h3
                      id="step-2-heading"
                      className="text-xl font-bold text-slate-900 mt-1"
                    >
                      حدد اليوم والفترة الزمنية المفضلة لديك
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      هذه الأوقات تمثل تفضيلك الأولي (وليست حجوزات فورية)،
                      وسيتواصل معك فريق العيادة لتأكيد الموعد الأقرب.
                    </p>
                  </div>

                  {/* Preferred Day Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      اليوم المفضل للزيارة
                    </label>
                    <div
                      role="radiogroup"
                      aria-label="اليوم المفضل للزيارة"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {PREFERRED_DATES.map((d) => {
                        const selected = formState.preferredDateId === d.id;
                        return (
                          <motion.button
                            key={d.id}
                            type="button"
                            role="radio"
                            whileTap={{ scale: 0.98 }}
                            aria-checked={selected}
                            onClick={() => {
                              setFormState((prev) => ({
                                ...prev,
                                preferredDateId: d.id,
                              }));
                              setErrors((prev) => ({
                                ...prev,
                                preferredDateId: undefined,
                              }));
                            }}
                            className={`p-4 rounded-xl border text-start transition-colors cursor-pointer ${
                              selected
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-200 bg-slate-50/60 hover:border-slate-300 text-slate-900"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-base">
                                {d.label}
                              </span>
                              <Calendar
                                className={`w-4 h-4 ${
                                  selected ? "text-sky-400" : "text-slate-400"
                                }`}
                                aria-hidden="true"
                              />
                            </div>
                            <p
                              className={`text-xs mt-1 ${
                                selected ? "text-slate-300" : "text-slate-500"
                              }`}
                            >
                              {d.dateFormatted}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.preferredDateId && (
                      <p role="alert" className="mt-2 text-sm text-red-600">
                        {errors.preferredDateId}
                      </p>
                    )}
                  </div>

                  {/* Preferred Time Period Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      الفترة الزمنية المفضلة (بالأرقام 1, 2, 3)
                    </label>
                    <div
                      role="radiogroup"
                      aria-label="الفترة الزمنية المفضلة"
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      {PREFERRED_TIME_SLOTS.map((slot) => {
                        const selected = formState.preferredTimeId === slot.id;
                        return (
                          <motion.button
                            key={slot.id}
                            type="button"
                            role="radio"
                            whileTap={{ scale: 0.98 }}
                            aria-checked={selected}
                            onClick={() => {
                              setFormState((prev) => ({
                                ...prev,
                                preferredTimeId: slot.id,
                              }));
                              setErrors((prev) => ({
                                ...prev,
                                preferredTimeId: undefined,
                              }));
                            }}
                            className={`p-4 rounded-xl border text-start transition-colors cursor-pointer ${
                              selected
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-200 bg-slate-50/60 hover:border-slate-300 text-slate-900"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm">
                                {slot.label}
                              </span>
                              <Clock
                                className={`w-4 h-4 ${
                                  selected ? "text-sky-400" : "text-slate-400"
                                }`}
                                aria-hidden="true"
                              />
                            </div>
                            <p
                              className={`font-sans text-xs tabular-nums ${
                                selected ? "text-sky-300" : "text-slate-600"
                              }`}
                            >
                              {slot.hours} {slot.period}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.preferredTimeId && (
                      <p role="alert" className="mt-2 text-sm text-red-600">
                        {errors.preferredTimeId}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleJumpToStep(1)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      <span>السابق</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNextStep(3)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>متابعة لبيانات التواصل</span>
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* STEP 3: Patient Name & Optional Contact */}
              {step === 3 && (
                <div role="region" aria-labelledby="step-3-heading">
                  <div className="mb-6">
                    <span className="text-xs font-mono text-sky-700">
                      STEP 3 OF 4
                    </span>
                    <h3
                      id="step-3-heading"
                      className="text-xl font-bold text-slate-900 mt-1"
                    >
                      الاسم الكريم ومعلومات التواصل
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      نكتفي بالاسم ورقم التواصل لتنسيق الموعد. لا نطلب أي سجل
                      طبي عبر الموقع.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="patient-name-input"
                        className="block text-sm font-semibold text-slate-900 mb-2"
                      >
                        الاسم الكامل <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="patient-name-input"
                          type="text"
                          required
                          value={formState.patientName}
                          onChange={(e) => {
                            setFormState((prev) => ({
                              ...prev,
                              patientName: e.target.value,
                            }));
                            if (errors.patientName) {
                              setErrors((prev) => ({
                                ...prev,
                                patientName: undefined,
                              }));
                            }
                          }}
                          placeholder="مثال: سارة العبيدي"
                          aria-invalid={Boolean(errors.patientName)}
                          aria-describedby={
                            errors.patientName
                              ? "patient-name-error"
                              : undefined
                          }
                          className={`w-full rounded-lg border px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.patientName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:border-slate-900 focus:ring-slate-900/20"
                          }`}
                        />
                      </div>
                      {errors.patientName && (
                        <p
                          id="patient-name-error"
                          role="alert"
                          className="mt-2 text-sm font-medium text-red-600"
                        >
                          {errors.patientName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="patient-phone-input"
                        className="block text-sm font-semibold text-slate-900 mb-2"
                      >
                        رقم الهاتف للتواصل{" "}
                        <span className="text-xs font-normal text-slate-500">
                          (اختياري · يفضل بالأرقام 1, 2, 3)
                        </span>
                      </label>
                      <input
                        id="patient-phone-input"
                        type="tel"
                        dir="ltr"
                        value={formState.patientPhone}
                        onChange={(e) => {
                          setFormState((prev) => ({
                            ...prev,
                            patientPhone: e.target.value,
                          }));
                          if (errors.patientPhone) {
                            setErrors((prev) => ({
                              ...prev,
                              patientPhone: undefined,
                            }));
                          }
                        }}
                        placeholder="0770 123 4567"
                        aria-invalid={Boolean(errors.patientPhone)}
                        aria-describedby={
                          errors.patientPhone
                            ? "patient-phone-error"
                            : undefined
                        }
                        className={`w-full rounded-lg border px-4 py-3 text-base text-end font-mono tabular-nums text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.patientPhone
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-slate-900 focus:ring-slate-900/20"
                        }`}
                      />
                      {errors.patientPhone && (
                        <p
                          id="patient-phone-error"
                          role="alert"
                          className="mt-2 text-sm font-medium text-red-600"
                        >
                          {errors.patientPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="patient-note-input"
                        className="block text-sm font-semibold text-slate-900 mb-2"
                      >
                        استفسار مختصر تود مناقشته في الزيارة{" "}
                        <span className="text-xs font-normal text-slate-500">
                          (اختياري)
                        </span>
                      </label>
                      <textarea
                        id="patient-note-input"
                        rows={2}
                        maxLength={200}
                        value={formState.optionalNote}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            optionalNote: e.target.value,
                          }))
                        }
                        placeholder="مثال: أود السؤال عن الفرق بين التبييض في العيادة والقوالب المنزلية"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleJumpToStep(2)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      <span>السابق</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNextStep(4)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>مراجعة ملخص الطلب</span>
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review Request & WhatsApp Message Preview / Copy */}
              {step === 4 && (
                <div role="region" aria-labelledby="step-4-heading">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-sky-700">
                        STEP 4 OF 4 · REVIEW
                      </span>
                      <h3
                        id="step-4-heading"
                        className="text-xl font-bold text-slate-900 mt-1"
                      >
                        مراجعة طلب الموعد ورسالة واتساب الجاهزة
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {CLINIC_CONFIG.bookingDisclaimer}
                      </p>
                    </div>
                  </div>

                  {/* Quick Edit Controls */}
                  <div className="flex flex-wrap items-center gap-2 mb-6 pb-5 border-b border-slate-200">
                    <span className="text-xs text-slate-500 me-1">
                      تعديل سريع للبيانات:
                    </span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleJumpToStep(1)}
                      className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>تغيير الاستشارة</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleJumpToStep(2)}
                      className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>تعديل اليوم والوقت</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleJumpToStep(3)}
                      className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>تعديل الاسم أو الرقم</span>
                    </motion.button>
                  </div>

                  {/* Generated Arabic WhatsApp Message Preview */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <MessageSquare
                          className="w-4 h-4 text-sky-700"
                          aria-hidden="true"
                        />
                        <span>
                          معاينة رسالة طلب الموعد (جاهزة للإرسال عبر واتساب)
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        ARABIC RTL FORMAT
                      </span>
                    </div>

                    <pre
                      data-testid="whatsapp-message-preview"
                      className="whitespace-pre-wrap font-sans text-sm text-slate-800 bg-white p-4 rounded-lg border border-slate-200 leading-relaxed select-all"
                    >
                      {submissionInfo.message}
                    </pre>

                    {/* Demo vs Configured Number Behavior */}
                    {!submissionInfo.isConfigured ? (
                      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          وضع العرض التجريبي: لم يتم ربط رقم واتساب حقيقي بعد في
                          متغير{" "}
                          <code className="font-mono text-slate-900 bg-slate-200/70 px-1.5 py-0.5 rounded">
                            CLINIC_WHATSAPP_NUMBER
                          </code>
                          . يمكنك نسخ نص الرسالة المنسق مباشرة لتجربة التدفق.
                        </p>
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.96 }}
                          onClick={handleCopyMessage}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {copied ? (
                              <motion.span
                                key="copied"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.16 }}
                                className="inline-flex items-center gap-2"
                              >
                                <Check
                                  className="w-4 h-4 text-sky-400"
                                  aria-hidden="true"
                                />
                                <span>تم نسخ نص الطلب بنجاح</span>
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.16 }}
                                className="inline-flex items-center gap-2"
                              >
                                <Copy className="w-4 h-4" aria-hidden="true" />
                                <span>نسخ رسالة الطلب</span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.96 }}
                          onClick={handleCopyMessage}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>{copied ? "تم النسخ" : "نسخ النص"}</span>
                        </motion.button>
                        <a
                          href={submissionInfo.whatsappUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>إرسال الطلب عبر واتساب</span>
                          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Live Architectural Summary Rail (Always Visible) */}
        <div className="lg:col-span-5 bg-slate-50/80 p-6 sm:p-8 flex flex-col justify-between">
          <div ref={summaryCardRef}>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
              <div>
                <p className="text-xs font-mono text-slate-500">
                  REQUEST SUMMARY
                </p>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  ملخص تفضيلات الزيارة
                </h4>
              </div>
              <span className="text-xs text-sky-700 font-medium">
                يتحدث تلقائياً
              </span>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-white border border-slate-200/90">
                <dt className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>نوع الزيارة المختارة</span>
                </dt>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={resolved.service.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <dd className="font-bold text-slate-900">
                      {resolved.service.title}
                    </dd>
                    <dd className="text-xs text-slate-500 mt-0.5">
                      {resolved.service.durationNote}
                    </dd>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90">
                  <dt className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>اليوم المفضل</span>
                  </dt>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.dd
                      key={resolved.dateOption.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="font-bold text-slate-900"
                    >
                      {resolved.dateOption.label}
                    </motion.dd>
                  </AnimatePresence>
                  <dd className="text-xs text-slate-500 mt-0.5">تفضيل مبدئي</dd>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90">
                  <dt className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>الفترة المفضلة</span>
                  </dt>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={resolved.timeOption.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <dd className="font-bold text-slate-900">
                        {resolved.timeOption.label}
                      </dd>
                      <dd className="font-mono text-xs text-slate-500 tabular-nums mt-0.5">
                        {resolved.timeOption.hours}
                      </dd>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90">
                <dt className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>الاسم ومعلومات التواصل</span>
                </dt>
                <dd className="font-bold text-slate-900">
                  {resolved.cleanName ? (
                    resolved.cleanName
                  ) : (
                    <span className="text-slate-400 font-normal">
                      يُدخل في الخطوة 3
                    </span>
                  )}
                </dd>
                {resolved.cleanPhone && (
                  <dd className="font-sans text-xs text-slate-600 tabular-nums mt-1">
                    هاتف: <span dir="ltr">{resolved.cleanPhone}</span>
                  </dd>
                )}
              </div>
            </dl>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
            <p className="font-semibold text-slate-800">
              {CLINIC_CONFIG.bookingDisclaimer}
            </p>
            <p>
              العنوان التوضيحي: {CLINIC_CONFIG.cityAr} · {CLINIC_CONFIG.hoursAr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
