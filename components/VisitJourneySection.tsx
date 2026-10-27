"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { VISIT_JOURNEY_STEPS } from "@/lib/clinic-config";
import { ArrowLeft, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGE_BADGES = [
  "المرحلة 1 من 3 · الاستماع وتحديد الهدف",
  "المرحلة 2 من 3 · الفحص السريري للمينا",
  "المرحلة 3 من 3 · مناقشة الخيارات المتاحة",
];

function StageVisualCanvas({ activeStepIndex }: { activeStepIndex: number }) {
  return (
    <div className="relative aspect-[4/3] w-full bg-[#0B192C] text-white overflow-hidden select-none">
      {/* Subtle Optical Calibration Grid Background */}
      <svg
        viewBox="0 0 640 480"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="stageAmbientGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.18" />
            <stop offset="65%" stopColor="#0284C7" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0B192C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="640" height="480" fill="url(#stageAmbientGlow)" />
        <g stroke="#334155" strokeOpacity="0.35" strokeWidth="0.75">
          <line x1="60" y1="120" x2="580" y2="120" />
          <line x1="60" y1="240" x2="580" y2="240" />
          <line x1="60" y1="360" x2="580" y2="360" />
          <line x1="160" y1="40" x2="160" y2="440" />
          <line x1="320" y1="40" x2="320" y2="440" />
          <line x1="480" y1="40" x2="480" y2="440" />
        </g>
      </svg>

      <AnimatePresence mode="wait" initial={false}>
        {/* STAGE 1 VISUAL: Porcelain Shade Calibration Fan & Target Goal */}
        {activeStepIndex === 0 && (
          <motion.div
            key="stage-visual-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-6"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-mono text-sky-400">
                FIG. 01 · SHADE &amp; GOAL ASSESSMENT
              </span>
              <span className="font-sans tabular-nums">مقياس التدرج اللوني</span>
            </div>

            <svg
              viewBox="0 0 560 300"
              className="w-full h-auto my-auto overflow-visible"
              role="img"
              aria-label="رسم توضيحي لمقياس تدرجات السيراميك والمينا الطبيعية"
            >
              <defs>
                <linearGradient id="s1CrownLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#BAE6FD" />
                </linearGradient>
                <linearGradient id="s1CrownCenter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#E0F2FE" />
                  <stop offset="100%" stopColor="#7DD3FC" />
                </linearGradient>
                <linearGradient id="s1Stem" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* Optical Calibration Arc */}
              <motion.path
                d="M 80 230 Q 280 95 480 230"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.25"
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.45 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* 5 Sculpted Ceramic Shade Specimens */}
              {[
                { code: "2M1", x: 115, y: 128, rot: -16, active: false },
                { code: "1M2", x: 196, y: 102, rot: -8, active: false },
                { code: "1M1", x: 280, y: 88, rot: 0, active: true },
                { code: "0M3", x: 364, y: 102, rot: 8, active: false },
                { code: "0M2", x: 445, y: 128, rot: 16, active: false },
              ].map((item, idx) => (
                <g
                  key={item.code}
                  transform={`translate(${item.x}, ${item.y}) rotate(${item.rot})`}
                >
                  {/* Anodized Holder Stem */}
                  <rect
                    x="-6"
                    y="70"
                    width="12"
                    height="76"
                    rx="2.5"
                    fill="url(#s1Stem)"
                  />
                  {/* Sculpted Incisor Crown */}
                  <path
                    d="M -28 0 C -28 -30, 28 -30, 28 0 L 22 68 C 22 78, -22 78, -22 68 Z"
                    fill={
                      item.active ? "url(#s1CrownCenter)" : "url(#s1CrownLight)"
                    }
                    stroke={item.active ? "#38BDF8" : "#E2E8F0"}
                    strokeWidth={item.active ? "2.2" : "1.2"}
                    opacity={item.active ? 1 : 0.82 - Math.abs(idx - 2) * 0.1}
                  />
                  {/* Specular Ridge */}
                  <path
                    d="M -18 -6 C -9 -20, 9 -20, 18 -6"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {item.active && (
                    <circle
                      cx="0"
                      cy="26"
                      r="38"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                    />
                  )}
                  <text
                    x="0"
                    y="108"
                    fill={item.active ? "#38BDF8" : "#CBD5E1"}
                    fontFamily="monospace"
                    fontSize="11"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {item.code}
                  </text>
                </g>
              ))}

              {/* Precision Reference Bar */}
              <rect
                x="110"
                y="244"
                width="340"
                height="32"
                rx="6"
                fill="#0F172A"
                stroke="#334155"
                strokeWidth="1.2"
              />
              <line
                x1="140"
                y1="260"
                x2="420"
                y2="260"
                stroke="#38BDF8"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              <circle cx="280" cy="260" r="4.5" fill="#38BDF8" />
            </svg>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <span>تحديد الدرجة الطبيعية المنسجمة مع ملامح الوجه</span>
              <span className="font-mono text-sky-400">REF · 1M1</span>
            </div>
          </motion.div>
        )}

        {/* STAGE 2 VISUAL: Cross-Sectional Enamel & Dentin Optical Study */}
        {activeStepIndex === 1 && (
          <motion.div
            key="stage-visual-1"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-6"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-mono text-sky-400">
                FIG. 02 · ENAMEL THICKNESS &amp; OPTICS
              </span>
              <span className="font-sans tabular-nums">فحص سماكة المينا</span>
            </div>

            <svg
              viewBox="0 0 560 300"
              className="w-full h-auto my-auto overflow-visible"
              role="img"
              aria-label="رسم هندسي يوضح تفاعل الضوء مع طبقة المينا والعاج لتقييم الملاءمة"
            >
              <defs>
                <linearGradient id="s2Enamel" x1="180" y1="30" x2="360" y2="270" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#E0F2FE" />
                  <stop offset="100%" stopColor="#93C5FD" />
                </linearGradient>
                <linearGradient id="s2Dentin" x1="210" y1="70" x2="330" y2="240" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>

              {/* Concentric Diagnostic Rings */}
              <circle
                cx="260"
                cy="150"
                r="122"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.22"
                strokeWidth="1.2"
              />
              <circle
                cx="260"
                cy="150"
                r="92"
                fill="none"
                stroke="#94A3B8"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeDasharray="4 5"
              />

              {/* Outer Enamel Shell */}
              <path
                d="M 185 92
                   C 185 45, 230 35, 260 58
                   C 290 35, 335 45, 335 92
                   C 335 135, 320 178, 308 220
                   C 300 248, 288 268, 278 268
                   C 268 268, 265 230, 260 230
                   C 255 230, 252 268, 242 268
                   C 232 268, 220 248, 212 220
                   C 200 178, 185 135, 185 92 Z"
                fill="url(#s2Enamel)"
                stroke="#38BDF8"
                strokeWidth="2"
              />

              {/* Inner Dentin Layer */}
              <path
                d="M 208 105
                   C 208 72, 238 65, 260 82
                   C 282 65, 312 72, 312 105
                   C 312 140, 300 175, 290 208
                   C 284 228, 278 242, 272 242
                   C 266 242, 263 212, 260 212
                   C 257 212, 254 242, 248 242
                   C 242 242, 236 228, 230 208
                   C 220 175, 208 140, 208 105 Z"
                fill="url(#s2Dentin)"
                fillOpacity="0.65"
                stroke="#7DD3FC"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Animated Incident & Refracted Optical Rays */}
              <motion.path
                d="M 75 68 L 210 112 L 288 142"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              />
              <circle cx="210" cy="112" r="4" fill="#38BDF8" />

              {/* Callout Annotations (LTR technical labels + clean lines) */}
              <g stroke="#7DD3FC" strokeWidth="1.2">
                <line x1="325" y1="82" x2="380" y2="82" />
                <circle cx="325" cy="82" r="3" fill="#38BDF8" />
                <line x1="305" y1="158" x2="380" y2="158" />
                <circle cx="305" cy="158" r="3" fill="#7DD3FC" />
              </g>
              <g fontFamily="monospace" fontSize="11" fill="#E2E8F0">
                <text x="388" y="79" textAnchor="start" fill="#38BDF8" fontWeight="700">
                  ENAMEL · 1.8mm
                </text>
                <text x="388" y="95" textAnchor="start" fill="#94A3B8" fontSize="10">
                  SURFACE INTEGRITY
                </text>
                <text x="388" y="155" textAnchor="start" fill="#7DD3FC" fontWeight="700">
                  DENTIN CHROMA
                </text>
                <text x="388" y="171" textAnchor="start" fill="#94A3B8" fontSize="10">
                  BASE SHADE CORE
                </text>
              </g>
            </svg>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <span>التأكد من سلامة المينا واللثة قبل اقتراح أي تبييض</span>
              <span className="font-mono text-sky-400">ENAMEL CHECK</span>
            </div>
          </motion.div>
        )}

        {/* STAGE 3 VISUAL: Clinical Pathways Comparison Matrix (Replaces old flat table SVG) */}
        {activeStepIndex === 2 && (
          <motion.div
            key="stage-visual-2"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-6"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-mono text-sky-400">
                FIG. 03 · CLINICAL PATHWAY MATRIX
              </span>
              <span className="font-sans tabular-nums">مقارنة الخيارات المتاحة</span>
            </div>

            {/* 3 Structured Clinical Pathway Cards inside the Viewport */}
            <div className="my-auto space-y-2.5 py-2">
              {[
                {
                  code: "OPTION 01",
                  title: "تبييض موضعي داخل العيادة",
                  meta: "إشراف سريري مباشر · عزل كامل للثة",
                  barWidth: "88%",
                },
                {
                  code: "OPTION 02",
                  title: "قوالب منزلية مخصصة بإشراف الطبيب",
                  meta: "تفتيح تدريجي هادئ · يناسب الأسنان الحساسة",
                  barWidth: "76%",
                },
                {
                  code: "OPTION 03",
                  title: "عناية تمهيدية وتلميع للمينا",
                  meta: "إزالة التصبغات السطحية قبل قرار التبييض",
                  barWidth: "64%",
                },
              ].map((pathway, i) => (
                <motion.div
                  key={pathway.code}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {pathway.title}
                    </span>
                    <span className="font-mono text-[10px] text-sky-400 shrink-0">
                      {pathway.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mb-2">
                    {pathway.meta}
                  </p>
                  <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-sky-400 origin-right"
                      initial={{ width: "0%" }}
                      animate={{ width: pathway.barWidth }}
                      transition={{
                        duration: 0.55,
                        delay: 0.1 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <span>اختيار المسار الأنسب لحساسية أسنانك ونمط حياتك</span>
              <span className="font-mono text-sky-400">3 PATHWAYS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VisitJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerBlockRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stickyFrameRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Moment 2: Scroll-linked progression through the 3 consultation stages
  useEffect(() => {
    const section = sectionRef.current;
    const stepsContainer = stepsContainerRef.current;
    if (!section || !stepsContainer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Sticky visual frame entrance
      if (stickyFrameRef.current) {
        gsap.from(stickyFrameRef.current, {
          y: 28,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsContainer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Vertical progress rail accurately tracks the steps column from top to bottom
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0.08, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsContainer,
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Each chapter smoothly reveals and activates its corresponding visual stage when scrolled into view
      stepRefs.current.forEach((stepEl, idx) => {
        if (!stepEl) return;

        gsap.from(stepEl, {
          y: 24,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepEl,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        ScrollTrigger.create({
          trigger: stepEl,
          start: "top 58%",
          end: "bottom 45%",
          onEnter: () => setActiveStepIndex(idx),
          onEnterBack: () => setActiveStepIndex(idx),
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSelectStep = (idx: number, shouldScrollToArticle: boolean) => {
    setActiveStepIndex(idx);
    if (shouldScrollToArticle && stepRefs.current[idx]) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      stepRefs.current[idx]?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  const currentBadge = STAGE_BADGES[activeStepIndex] || STAGE_BADGES[0];
  const currentStep =
    VISIT_JOURNEY_STEPS[activeStepIndex] || VISIT_JOURNEY_STEPS[0];

  return (
    <section
      id="visit-journey"
      ref={sectionRef}
      aria-labelledby="journey-heading"
      className="py-20 lg:py-28 border-t border-slate-200 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div ref={headerBlockRef} className="max-w-3xl mb-14 lg:mb-16">
          <p className="text-xs font-medium text-sky-700 mb-3">
            مسار الزيارة · 3 خطوات متدرجة
          </p>
          <h2
            id="journey-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.2] text-balance"
          >
            كيف تسير زيارة استشارة تبييض الأسنان في لُما؟
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            نؤمن بأن القرار التجميلي السليم يبدأ بالفهم والفحص الهادئ، وليس
            بالاستعجال. لذلك صممنا مسار الزيارة في 3 مراحل واضحة تضع صحة المينا
            وراحتك أولاً.
          </p>
        </div>

        {/* Interactive Step Selector Bar with shared layoutId indicator (from micro-interaction skill) */}
        <div
          role="tablist"
          aria-label="مراحل زيارة الاستشارة"
          className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-slate-200"
        >
          {VISIT_JOURNEY_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <motion.button
                key={step.number}
                role="tab"
                type="button"
                whileTap={{ scale: 0.97 }}
                aria-selected={isSelected}
                onClick={() => handleSelectStep(idx, true)}
                className={`relative min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                  isSelected
                    ? "text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="visit-journey-active-tab"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-slate-900"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">
                  <span className="font-mono tabular-nums me-2">
                    {step.number}.
                  </span>
                  <span>{step.title}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Asymmetric Editorial 2-Column Sequence (No 3 generic cards) */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Right Column (in RTL): Vertical Editorial Narrative Chapters */}
          <div className="lg:col-span-7 relative ps-6 sm:ps-9">
            {/* Subtle vertical progress rail */}
            <div
              aria-hidden="true"
              className="absolute start-0 top-2 bottom-2 w-[3px] rounded-full bg-slate-200 overflow-hidden"
            >
              <div
                ref={progressLineRef}
                className="w-full h-full bg-sky-600 origin-top rounded-full"
              />
            </div>

            <div className="divide-y divide-slate-200">
              {VISIT_JOURNEY_STEPS.map((step, index) => {
                const isActive = activeStepIndex === index;
                return (
                  <article
                    key={step.number}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    onClick={() => handleSelectStep(index, false)}
                    className={`relative py-10 lg:py-14 first:pt-2 last:pb-2 transition-all duration-300 cursor-pointer ${
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-90"
                    }`}
                  >
                    {/* Active Stage Node Marker on the Rail */}
                    <span
                      aria-hidden="true"
                      className={`absolute -start-[29px] sm:-start-[41px] top-12 first:top-4 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-sky-600 border-white ring-4 ring-sky-500/20 scale-110"
                          : "bg-slate-300 border-white"
                      }`}
                    />

                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <span
                        className={`text-xs font-semibold transition-colors ${
                          isActive ? "text-sky-700" : "text-slate-500"
                        }`}
                      >
                        {step.kicker}
                      </span>
                      <span
                        className={`font-mono text-2xl sm:text-3xl font-bold tabular-nums transition-colors ${
                          isActive ? "text-sky-700/80" : "text-slate-300"
                        }`}
                      >
                        0{step.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-base text-slate-600 leading-relaxed mb-5 max-w-2xl">
                      {step.description}
                    </p>

                    <ul className="space-y-2.5 text-sm text-slate-700">
                      {step.talkingPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-1 transition-colors ${
                              isActive ? "text-sky-600" : "text-slate-400"
                            }`}
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Left Column (in RTL): Sticky Interactive Visual Study Frame */}
          <div
            ref={stickyFrameRef}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 bg-slate-50">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentBadge}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-medium text-slate-900"
                  >
                    {currentBadge}
                  </motion.span>
                </AnimatePresence>
                <span className="font-mono tabular-nums text-slate-500">
                  STAGE 0{currentStep.number} / 03
                </span>
              </div>

              {/* RTL Stage Progress Indicator Bar */}
              <div
                aria-hidden="true"
                className="h-1 w-full bg-slate-100 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-sky-600 origin-right"
                  initial={false}
                  animate={{ scaleX: (activeStepIndex + 1) / 3 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Bespoke Animated Stage Visual Canvas */}
              <StageVisualCanvas activeStepIndex={activeStepIndex} />

              <div className="p-5 sm:p-6 bg-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentStep.number}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-xs text-slate-500 mb-2">
                      {currentStep.visualCaption}
                    </p>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed mb-4">
                      نحرص في هذه الخطوة على توضيح ما يناسب أسنانك فعلياً، دون وعود
                      مسبقة بنتائج ثابتة قبل الفحص السريري.
                    </p>
                  </motion.div>
                </AnimatePresence>
                <a
                  href="#booking-request"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>احجز موعداً لبدء الاستشارة</span>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
