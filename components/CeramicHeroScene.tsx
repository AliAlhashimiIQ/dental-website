"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type CeramicLightingPreset = "daylight" | "clinical" | "translucency";

const LIGHTING_OPTIONS: {
  id: CeramicLightingPreset;
  buttonLabel: string;
}[] = [
  { id: "daylight", buttonLabel: "ضوء نهاري" },
  { id: "clinical", buttonLabel: "تقييم اللون" },
  { id: "translucency", buttonLabel: "نفاذية المينا" },
];

export default function CeramicHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealWrapperRef = useRef<SVGGElement>(null);
  const scrollWrapperRef = useRef<SVGGElement>(null);
  const pointerWrapperRef = useRef<SVGGElement>(null);
  const enamelLayerRef = useRef<SVGPathElement>(null);
  const enamelTraceRef = useRef<SVGPathElement>(null);
  const dentinLayerRef = useRef<SVGPathElement>(null);
  const cuspLeftRef = useRef<SVGPathElement>(null);
  const cuspRightRef = useRef<SVGPathElement>(null);
  const lightRingScrollRef = useRef<SVGGElement>(null);
  const lightRingPointerRef = useRef<SVGCircleElement>(null);
  const scanLineRef = useRef<SVGLineElement>(null);
  const plinthRef = useRef<SVGGElement>(null);
  const calloutRightRef = useRef<SVGGElement>(null);
  const calloutLeftRef = useRef<SVGGElement>(null);
  const calloutRightLineRef = useRef<SVGLineElement>(null);
  const calloutLeftLineRef = useRef<SVGLineElement>(null);

  // Pre-bound gsap.quickTo refs for 60fps pointer tracking (zero allocation per pointermove)
  const quickToRefs = useRef<{
    toothX?: gsap.QuickToFunc;
    toothY?: gsap.QuickToFunc;
    toothRot?: gsap.QuickToFunc;
    ringX?: gsap.QuickToFunc;
    ringY?: gsap.QuickToFunc;
  }>({});

  const [lightingMode, setLightingMode] =
    useState<CeramicLightingPreset>("daylight");

  // Separated transform wrappers prevent initial reveal, pointer tilt, and ScrollTrigger scrub from fighting
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initialize gsap.quickTo instances once per mount (from gsap-web skill)
      if (pointerWrapperRef.current) {
        gsap.set(pointerWrapperRef.current, { transformOrigin: "50% 50%" });
        quickToRefs.current.toothX = gsap.quickTo(
          pointerWrapperRef.current,
          "x",
          { duration: 0.45, ease: "power3.out" }
        );
        quickToRefs.current.toothY = gsap.quickTo(
          pointerWrapperRef.current,
          "y",
          { duration: 0.45, ease: "power3.out" }
        );
        quickToRefs.current.toothRot = gsap.quickTo(
          pointerWrapperRef.current,
          "rotation",
          { duration: 0.45, ease: "power3.out" }
        );
      }

      if (lightRingPointerRef.current) {
        quickToRefs.current.ringX = gsap.quickTo(
          lightRingPointerRef.current,
          "x",
          { duration: 0.55, ease: "power3.out" }
        );
        quickToRefs.current.ringY = gsap.quickTo(
          lightRingPointerRef.current,
          "y",
          { duration: 0.55, ease: "power3.out" }
        );
      }

      // Moment 1: Initial sculptural reveal + SVG pathLength="1" contour draw-on (from svg-animation skill)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        plinthRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75 }
      )
        .fromTo(
          revealWrapperRef.current,
          { y: 18, scale: 0.95, opacity: 0, transformOrigin: "50% 50%" },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
          },
          "-=0.5"
        )
        .fromTo(
          enamelTraceRef.current,
          { strokeDashoffset: 1, opacity: 0.95 },
          {
            strokeDashoffset: 0,
            opacity: 0.35,
            duration: 1.25,
            ease: "power2.inOut",
          },
          "-=0.75"
        )
        .fromTo(
          [cuspLeftRef.current, cuspRightRef.current],
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.95"
        )
        .fromTo(
          lightRingPointerRef.current,
          { scale: 0.88, opacity: 0, transformOrigin: "50% 50%" },
          { scale: 1, opacity: 0.85, duration: 0.95 },
          "-=0.85"
        )
        .fromTo(
          [calloutRightLineRef.current, calloutLeftLineRef.current],
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.55, stagger: 0.1 },
          "-=0.65"
        )
        .fromTo(
          [calloutRightRef.current, calloutLeftRef.current],
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          "-=0.5"
        );

      // Scroll-driven depth movement on dedicated scrollWrapperRef (starts from scrollY = 0)
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.getElementById("top") || container,
          start: "top top",
          end: () => `+=${container.offsetHeight + 180}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      heroScrollTl
        .to(
          scrollWrapperRef.current,
          {
            y: -38,
            rotation: -3.5,
            scale: 1.06,
            transformOrigin: "50% 50%",
            ease: "none",
          },
          0
        )
        .to(
          dentinLayerRef.current,
          {
            y: -14,
            scale: 1.03,
            transformOrigin: "50% 50%",
            ease: "none",
          },
          0
        )
        .to(
          lightRingScrollRef.current,
          {
            y: 22,
            scale: 1.1,
            rotation: 18,
            transformOrigin: "50% 50%",
            ease: "none",
          },
          0
        )
        .to(
          plinthRef.current,
          {
            y: 16,
            scale: 0.95,
            transformOrigin: "50% 50%",
            ease: "none",
          },
          0
        )
        .fromTo(
          scanLineRef.current,
          { y: 0 },
          {
            y: 195,
            ease: "none",
          },
          0
        );
    }, container);

    return () => {
      quickToRefs.current = {};
      ctx.revert();
    };
  }, []);

  // Subtle optical pulse when switching lighting modes
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (!enamelTraceRef.current) return;

    gsap.fromTo(
      enamelTraceRef.current,
      { strokeDashoffset: 1, opacity: 0.9 },
      {
        strokeDashoffset: 0,
        opacity: 0.4,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [lightingMode]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { toothX, toothY, toothRot, ringX, ringY } = quickToRefs.current;
    if (!toothX || !toothY || !toothRot) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    toothX(relX * 16);
    toothY(relY * 12);
    toothRot(relX * 2.5);

    if (ringX && ringY) {
      ringX(-relX * 20);
      ringY(-relY * 15);
    }
  };

  const handlePointerLeave = () => {
    const { toothX, toothY, toothRot, ringX, ringY } = quickToRefs.current;
    if (toothX && toothY && toothRot) {
      toothX(0);
      toothY(0);
      toothRot(0);
    }
    if (ringX && ringY) {
      ringX(0);
      ringY(0);
    }
  };

  const modeConfig = {
    daylight: {
      label: "إضاءة نهارية طبيعية · 5500K",
      caption: "توازن الانعكاس اللؤلؤي لطبقة المينا في ضوء النهار الطبيعي",
      coreOpacity: 0.35,
      rimColor: "#38BDF8",
    },
    clinical: {
      label: "طيف التقييم السريري · 6200K",
      caption: "إبراز تفاصيل السطح وتدرجات اللون لاختيار الدرجة الملائمة",
      coreOpacity: 0.58,
      rimColor: "#7DD3FC",
    },
    translucency: {
      label: "نفاذية طبقة المينا · Subsurface",
      caption: "محاكاة تشتت الضوء داخل البورسلين الخزفي وطبقات السن",
      coreOpacity: 0.88,
      rimColor: "#0284C7",
    },
  }[lightingMode];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-testid="ceramic-hero-scene"
      className="relative w-full h-full min-h-[440px] lg:min-h-[540px] rounded-2xl bg-[#0B192C] text-slate-100 border border-slate-800 overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none"
    >
      {/* Top Technical Studio Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sky-400">LUMA · CERAMIC STUDY 01</span>
          <span aria-hidden="true">·</span>
          <span>مجسم خزفي توضيحي</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={lightingMode}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-slate-300 tabular-nums"
          >
            {modeConfig.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Main Sculptural Ceramic Tooth SVG Viewport */}
      <div className="relative z-10 my-auto flex items-center justify-center py-4">
        <svg
          viewBox="0 0 560 460"
          className="w-full max-w-[440px] h-auto overflow-visible"
          role="img"
          aria-label="مجسم خزفي تشريحي يوضح طبقات المينا وانعكاس الضوء في لُما لطب الأسنان"
        >
          <defs>
            {/* Porcelain Enamel Multi-Stop pearlescent gradient */}
            <linearGradient
              id="porcelainCrownGrad"
              x1="160"
              y1="60"
              x2="400"
              y2="370"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="32%" stopColor="#F8FAFC" />
              <stop offset="68%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>

            {/* Subsurface Dentin Core Gradient */}
            <linearGradient
              id="dentinSubsurfaceGrad"
              x1="210"
              y1="120"
              x2="350"
              y2="330"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Specular Rim Highlight */}
            <linearGradient id="rimHighlight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0B192C" stopOpacity="0" />
            </linearGradient>

            {/* Architectural Navy Plinth Gradient */}
            <linearGradient id="plinthTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <filter
              id="ceramicDropShadow"
              x="-25%"
              y="-20%"
              width="150%"
              height="150%"
            >
              <feDropShadow
                dx="0"
                dy="22"
                stdDeviation="18"
                floodColor="#020617"
                floodOpacity="0.6"
              />
            </filter>
          </defs>

          {/* Subtle Optical Axis Grid Lines */}
          <g
            stroke="#334155"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            opacity="0.65"
          >
            <line x1="280" y1="20" x2="280" y2="420" />
            <line x1="70" y1="210" x2="490" y2="210" />
          </g>

          {/* Concentric Calibration Halo (Scroll + Pointer Layers) */}
          <g ref={lightRingScrollRef}>
            <circle
              ref={lightRingPointerRef}
              cx="280"
              cy="205"
              r="156"
              fill="none"
              stroke={modeConfig.rimColor}
              strokeWidth="1.25"
              strokeOpacity="0.4"
              className="transition-colors duration-500"
            />
            <circle
              cx="280"
              cy="205"
              r="122"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="0.8"
              strokeOpacity="0.24"
              strokeDasharray="4 6"
            />
          </g>

          {/* Architectural Plinth Base */}
          <g ref={plinthRef}>
            <ellipse
              cx="280"
              cy="390"
              rx="136"
              ry="24"
              fill="url(#plinthTop)"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <ellipse
              cx="280"
              cy="386"
              rx="92"
              ry="13"
              fill="#0B192C"
              stroke="#38BDF8"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          </g>

          {/* Anatomically Plausible Sculpted Porcelain Molar / Premolar Form with 3 Nested Motion Wrappers */}
          <g ref={revealWrapperRef}>
            <g ref={scrollWrapperRef}>
              <g ref={pointerWrapperRef} filter="url(#ceramicDropShadow)">
                {/* Primary Porcelain Enamel Crown & Root Contour */}
                <path
                  ref={enamelLayerRef}
                  d="M 182 156
                     C 182 98, 232 82, 280 112
                     C 328 82, 378 98, 378 156
                     C 378 206, 360 254, 344 308
                     C 334 342, 319 374, 305 374
                     C 292 374, 288 320, 280 320
                     C 272 320, 268 374, 255 374
                     C 241 374, 226 342, 216 308
                     C 200 254, 182 206, 182 156 Z"
                  fill="url(#porcelainCrownGrad)"
                  stroke="url(#rimHighlight)"
                  strokeWidth="2.2"
                />

                {/* Normalized pathLength="1" Optical Specular Contour Trace */}
                <path
                  ref={enamelTraceRef}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  d="M 182 156
                     C 182 98, 232 82, 280 112
                     C 328 82, 378 98, 378 156
                     C 378 206, 360 254, 344 308
                     C 334 342, 319 374, 305 374
                     C 292 374, 288 320, 280 320
                     C 272 320, 268 374, 255 374
                     C 241 374, 226 342, 216 308
                     C 200 254, 182 206, 182 156 Z"
                  fill="none"
                  stroke={modeConfig.rimColor}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  opacity="0.35"
                />

                {/* Internal Subsurface Dentin & Pulp Architecture (Revealed by Lighting Preset) */}
                <path
                  ref={dentinLayerRef}
                  d="M 212 170
                     C 212 132, 248 122, 280 144
                     C 312 122, 348 132, 348 170
                     C 348 208, 334 248, 322 290
                     C 314 316, 306 336, 298 336
                     C 291 336, 286 298, 280 298
                     C 274 298, 269 336, 262 336
                     C 254 336, 246 316, 238 290
                     C 226 248, 212 208, 212 170 Z"
                  fill="url(#dentinSubsurfaceGrad)"
                  fillOpacity={modeConfig.coreOpacity}
                  stroke={modeConfig.rimColor}
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="transition-all duration-500"
                />

                {/* Sculptural Cusp Ridge Highlights & Pearlescent Contours with pathLength="1" */}
                <path
                  ref={cuspLeftRef}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  d="M 204 146 C 216 112, 250 108, 276 126"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.92"
                />
                <path
                  ref={cuspRightRef}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  d="M 286 126 C 312 108, 344 112, 356 146"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  opacity="0.75"
                />
                {/* Occlusal Developmental Groove */}
                <path
                  d="M 236 142 Q 280 162 324 142"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.45"
                />
                {/* Vertical Enamel Lobe Specular Reflection */}
                <path
                  d="M 210 175 C 212 220, 224 265, 238 312"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </g>
            </g>
          </g>

          {/* Horizontal Optical Scan Line */}
          <line
            ref={scanLineRef}
            x1="125"
            y1="140"
            x2="435"
            y2="140"
            stroke={modeConfig.rimColor}
            strokeWidth="1"
            strokeOpacity="0.6"
            strokeDasharray="6 4"
          />

          {/* Dimension & Shade Annotation Callouts */}
          <g className="text-[11px] font-mono" fill="#94A3B8" direction="ltr">
            <g ref={calloutRightRef}>
              <text x="384" y="128" textAnchor="start">
                SHADE · 1M1
              </text>
              <line
                ref={calloutRightLineRef}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="0"
                x1="356"
                y1="124"
                x2="378"
                y2="124"
                stroke="#475569"
                strokeWidth="1"
              />
            </g>
            <g ref={calloutLeftRef}>
              <text x="176" y="268" textAnchor="end">
                ENAMEL · 1.8mm
              </text>
              <line
                ref={calloutLeftLineRef}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="0"
                x1="182"
                y1="264"
                x2="205"
                y2="264"
                stroke="#475569"
                strokeWidth="1"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Interactive Optical Mode Switcher (Segmented Control with Motion layoutId) */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={lightingMode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs text-slate-300 leading-relaxed"
          >
            {modeConfig.caption}
          </motion.p>
        </AnimatePresence>

        <div
          role="group"
          aria-label="نمط الإضاءة التوضيحية للمجسم الخزفي"
          className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 self-start sm:self-auto shrink-0"
        >
          {LIGHTING_OPTIONS.map((opt) => {
            const isActive = lightingMode === opt.id;
            return (
              <motion.button
                key={opt.id}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setLightingMode(opt.id)}
                aria-pressed={isActive}
                className={`relative min-h-[40px] px-3.5 py-2 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? "text-slate-950 font-semibold"
                    : "text-slate-300 hover:text-white font-medium"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="hero-lighting-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-sky-400"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{opt.buttonLabel}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
