"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CLINIC_CONFIG } from "@/lib/clinic-config";
import { Eye, Layers, Sparkles, Sun } from "lucide-react";

interface ShadeSpecimen {
  id: string;
  code: string;
  nameAr: string;
  translucency: string;
  noteAr: string;
  enamelStops: [string, string, string];
  dentinColor: string;
  reflectance: number;
}

const SHADE_SPECIMENS: ShadeSpecimen[] = [
  {
    id: "0m2",
    code: "0M2",
    nameAr: "إشراقة خزفية فاتحة",
    translucency: "نفاذية حافة قاطعة 78%",
    noteAr: "درجة فاتحة متوازنة تناسب المينا ذات السماكة الجيدة بعد الفحص.",
    enamelStops: ["#FFFFFF", "#F8FAFC", "#E0F2FE"],
    dentinColor: "#BAE6FD",
    reflectance: 92,
  },
  {
    id: "0m3",
    code: "0M3",
    nameAr: "لؤلؤي هادئ متوازن",
    translucency: "نفاذية حافة قاطعة 84%",
    noteAr: "توازن طبيعي بين البياض الهادئ وعمق طبقة المينا الشفافة.",
    enamelStops: ["#FFFFFF", "#F1F5F9", "#E0F2FE"],
    dentinColor: "#7DD3FC",
    reflectance: 88,
  },
  {
    id: "1m1",
    code: "1M1",
    nameAr: "طبيعي مشرق (مرجع قياسي)",
    translucency: "نفاذية حافة قاطعة 86%",
    noteAr: "الدرجة الأكثر انسجاماً مع بياض العين ولون البشرة الطبيعي.",
    enamelStops: ["#F8FAFC", "#F1F5F9", "#DBEAFE"],
    dentinColor: "#93C5FD",
    reflectance: 84,
  },
  {
    id: "1m2",
    code: "1M2",
    nameAr: "عاجي طبيعي دافئ",
    translucency: "نفاذية حافة قاطعة 82%",
    noteAr: "درجة تحافظ على الدفء الطبيعي للسن مع تفتيح التصبغات السطحية.",
    enamelStops: ["#F8FAFC", "#E2E8F0", "#CBD5E1"],
    dentinColor: "#60A5FA",
    reflectance: 79,
  },
];

type AmbientPreset = "neutral" | "daylight" | "subsurface";

const AMBIENT_PRESETS: {
  id: AmbientPreset;
  labelAr: string;
  kelvin: string;
  bgClass: string;
}[] = [
  {
    id: "neutral",
    labelAr: "إضاءة الاستشارة القياسية",
    kelvin: "5500K · CRI 98",
    bgClass: "from-[#0B192C] via-[#0F223A] to-[#162E4D]",
  },
  {
    id: "daylight",
    labelAr: "ضوء النهار الطبيعي",
    kelvin: "6000K · DAYLIGHT",
    bgClass: "from-[#0F172A] via-[#1E293B] to-[#1E3A5F]",
  },
  {
    id: "subsurface",
    labelAr: "فحص نفاذية المينا",
    kelvin: "SUBSURFACE OPTICS",
    bgClass: "from-[#06101E] via-[#0B192C] to-[#0C2D48]",
  },
];

export default function ConsultationSuiteStudy() {
  const [selectedShadeId, setSelectedShadeId] = useState<string>("1m1");
  const [ambientMode, setAmbientMode] = useState<AmbientPreset>("neutral");

  const activeShade =
    SHADE_SPECIMENS.find((s) => s.id === selectedShadeId) || SHADE_SPECIMENS[2];
  const activeAmbient =
    AMBIENT_PRESETS.find((a) => a.id === ambientMode) || AMBIENT_PRESETS[0];

  return (
    <figure
      data-scroll-figure
      data-testid="consultation-suite-study"
      className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs"
    >
      {/* Interactive Studio Viewport */}
      <div
        className={`relative bg-gradient-to-br ${activeAmbient.bgClass} text-white p-6 sm:p-7 transition-colors duration-500`}
      >
        {/* Top Studio Calibration Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span>معاينة تدرجات المينا والضوء في غرفة الاستشارة</span>
          </div>
          <span
            dir="ltr"
            className="font-mono text-[11px] text-sky-300 tabular-nums whitespace-nowrap shrink-0"
          >
            {activeAmbient.kelvin}
          </span>
        </div>

        {/* Ambient Lighting Mode Switcher */}
        <div
          role="group"
          aria-label="إضاءة معاينة الدرجة اللونية"
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-950/70 border border-slate-800/90 mb-5"
        >
          {AMBIENT_PRESETS.map((preset) => {
            const isSelected = ambientMode === preset.id;
            return (
              <motion.button
                key={preset.id}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setAmbientMode(preset.id)}
                aria-pressed={isSelected}
                className={`relative px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? "text-slate-950 font-semibold"
                    : "text-slate-300 hover:text-white font-medium"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="suite-ambient-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-sky-400"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{preset.labelAr}</span>
              </motion.button>
            );
          })}
        </div>

        {/* 4 Interactive Ceramic Incisor Specimens (Full Width Row) */}
        <div
          role="radiogroup"
          aria-label="درجات السيراميك والمينا التوضيحية"
          className="grid grid-cols-4 gap-3 mb-5"
        >
          {SHADE_SPECIMENS.map((spec) => {
            const isSelected = spec.id === selectedShadeId;
            const gradId = `specimen-grad-${spec.id}`;
            return (
              <motion.button
                key={spec.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedShadeId(spec.id)}
                className={`group relative flex flex-col items-center py-3.5 px-2 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? "bg-slate-900/95 border-sky-400 shadow-lg shadow-sky-950/50"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-shade-ring"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute -top-1.5 inset-x-5 h-0.5 rounded-full bg-sky-400"
                    aria-hidden="true"
                  />
                )}

                {/* Sculpted Anatomical Ceramic Incisor Specimen */}
                <svg
                  viewBox="0 0 80 120"
                  className="w-12 h-20 overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id={gradId}
                      x1="20"
                      y1="10"
                      x2="60"
                      y2="95"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor={spec.enamelStops[0]} />
                      <stop offset="55%" stopColor={spec.enamelStops[1]} />
                      <stop offset="100%" stopColor={spec.enamelStops[2]} />
                    </linearGradient>
                  </defs>

                  {/* Anodized Calibration Stem */}
                  <rect
                    x="35"
                    y="82"
                    width="10"
                    height="30"
                    rx="2"
                    fill={isSelected ? "#38BDF8" : "#475569"}
                    opacity={isSelected ? 0.9 : 0.55}
                  />

                  {/* Ceramic Crown Contour */}
                  <path
                    d="M 18 28
                       C 18 10, 62 10, 62 28
                       L 56 76
                       C 55 86, 25 86, 24 76 Z"
                    fill={`url(#${gradId})`}
                    stroke={isSelected ? "#38BDF8" : "#CBD5E1"}
                    strokeWidth={isSelected ? "2" : "1"}
                  />

                  {/* Subsurface Dentin Core (Responds to ambientMode) */}
                  <path
                    d="M 26 34 C 26 22, 54 22, 54 34 L 49 68 C 48 74, 32 74, 31 68 Z"
                    fill={spec.dentinColor}
                    fillOpacity={
                      ambientMode === "subsurface"
                        ? 0.55
                        : ambientMode === "daylight"
                        ? 0.22
                        : 0.32
                    }
                  />

                  {/* Specular Lobe Highlight */}
                  <path
                    d="M 25 24 C 31 17, 49 17, 55 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <line
                    x1="29"
                    y1="32"
                    x2="27"
                    y2="66"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.65"
                  />
                </svg>

                <span
                  className={`mt-1.5 font-mono text-xs font-bold tabular-nums ${
                    isSelected ? "text-sky-300" : "text-slate-400"
                  }`}
                >
                  {spec.code}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Full-Width Live Optical Specimen Readout Panel */}
        <div className="rounded-xl bg-slate-950/75 border border-slate-800/90 p-4 sm:p-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeShade.id}-${ambientMode}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {activeShade.nameAr}
                </h4>
                <span
                  dir="ltr"
                  className="text-xs font-mono text-sky-400 font-semibold whitespace-nowrap shrink-0"
                >
                  SHADE · {activeShade.code}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3.5">
                {activeShade.noteAr}
              </p>

              {/* Optical Reflectance Bar */}
              <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5">
                    <Layers
                      className="w-3.5 h-3.5 text-sky-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{activeShade.translucency}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-sans text-slate-300 tabular-nums whitespace-nowrap shrink-0">
                    <Sun
                      className="w-3.5 h-3.5 text-sky-300 shrink-0"
                      aria-hidden="true"
                    />
                    <span>انعكاس ضوئي {activeShade.reflectance}%</span>
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-sky-400 origin-right"
                    initial={false}
                    animate={{ width: `${activeShade.reflectance}%` }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Clear Non-Photographic Conceptual Caption in Real Arabic Typography */}
      <figcaption className="px-5 py-3.5 text-xs text-slate-600 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 font-medium text-slate-700">
          <Eye className="w-3.5 h-3.5 text-sky-700 shrink-0" aria-hidden="true" />
          <span>{CLINIC_CONFIG.conceptualVisualNote}</span>
        </span>
        <span className="font-sans text-[11px] text-slate-500 tabular-nums">
          اختر الدرجة (1–4) لمعاينة تفاعل الإضاءة
        </span>
      </figcaption>
    </figure>
  );
}
