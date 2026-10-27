import React from "react";
import CeramicHeroScene from "@/components/CeramicHeroScene";
import VisitJourneySection from "@/components/VisitJourneySection";
import ConsultationSuiteStudy from "@/components/ConsultationSuiteStudy";
import BookingRequestFlow from "@/components/BookingRequestFlow";
import FaqAccordion from "@/components/FaqAccordion";
import PageScrollChoreography from "@/components/PageScrollChoreography";
import {
  CLINIC_CONFIG,
  CLINIC_SERVICES,
  SERVICE_EXPECTATIONS,
} from "@/lib/clinic-config";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function LumaDentalHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <PageScrollChoreography />
      {/* Strict 3-Zone Top Navigation Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Custom Typographic Wordmark (Single Element) */}
          <a
            href="#top"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            لُما لطب الأسنان
          </a>

          {/* Zone 2: 4 Single-Line Navigation Links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#visit-journey"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              خطوات الزيارة
            </a>
            <a
              href="#service-info"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              معلومات الاستشارة
            </a>
            <a
              href="#booking-request"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              طلب موعد
            </a>
            <a
              href="#faq"
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              الأسئلة الشائعة
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href="#booking-request"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0B192C] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              اطلب موعد
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* 1. HERO SECTION */}
        <section
          aria-labelledby="hero-heading"
          className="pt-10 pb-16 lg:pt-16 lg:pb-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Editorial Copy Column */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 mb-6">
                    <span className="text-sky-700 font-semibold">
                      LUMA DENTAL
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>استشارات تبييض الأسنان والعناية بالمينا</span>
                    <span aria-hidden="true">·</span>
                    <span>بغداد</span>
                  </div>

                  <h1
                    id="hero-heading"
                    className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 tracking-tight leading-[1.16] text-balance"
                  >
                    إشراقة هادئة تبدأ بفهم طبيعة أسنانك.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                    في عيادة لُما لطب الأسنان، نخصص الزيارة الأولى لتقييم صحة
                    المينا واللثة بدقة، ومناقشة خيارات تبييض الأسنان الملائمة
                    لحالتك بوضوح تام وبدون استعجال.
                  </p>

                  {/* Immediate Primary & Secondary CTAs */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href="#booking-request"
                      className="min-h-[44px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#0B192C] text-white text-base font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>اطلب موعد</span>
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </a>

                    <a
                      href="#visit-journey"
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-base font-medium hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>اكتشف خطوات الزيارة</span>
                    </a>
                  </div>
                </div>

                {/* Operational & Transparency Footnote inside Hero */}
                <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
                  <div>
                    <p className="font-sans text-slate-500 tabular-nums mb-1">
                      01 · النهج السريري
                    </p>
                    <p className="font-semibold text-slate-900">
                      فحص الملاءمة قبل أي إجراء
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-slate-500 tabular-nums mb-1">
                      02 · أوقات الاستقبال
                    </p>
                    <p className="font-semibold text-slate-900 tabular-nums">
                      10:00 صباحاً – 8:00 مساءً
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-slate-500 tabular-nums mb-1">
                      03 · تنسيق الموعد
                    </p>
                    <p className="font-semibold text-slate-900">
                      طلب إلكتروني يتأكد بالتواصل
                    </p>
                  </div>
                </div>
              </div>

              {/* Signature Visual Column: Ceramic Tooth Sculpture */}
              <div className="lg:col-span-6 flex">
                <CeramicHeroScene />
              </div>
            </div>
          </div>
        </section>

        {/* 2. VISIT JOURNEY SECTION (Consultation -> Suitability Assessment -> Discussing Options) */}
        <VisitJourneySection />

        {/* 3. SERVICE INFORMATION SECTION (What to expect, what to ask, clear route to booking) */}
        <section
          id="service-info"
          aria-labelledby="service-info-heading"
          className="py-20 lg:py-28 border-t border-slate-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Editorial Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium text-sky-700 mb-3">
                  معلومات الخدمة والاستشارة · شفافية تامة
                </p>
                <h2
                  id="service-info-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2] text-balance"
                >
                  ماذا تتوقع في جلسة الاستشارة، وما الذي يمكنك السؤال عنه؟
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  نبتعد عن الوعود المسبقة أو الأرقام الدعائية؛ هدفنا تزويدك
                  بمعلومات طبية دقيقة تساعدك على فهم طبيعة أسنانك واختيار الإجراء
                  الأنسب لك.
                </p>
              </div>
            </div>

            {/* Asymmetric Editorial Grid: What to Expect + Conceptual Clinic Study */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
              {/* What the visitor can expect */}
              <div className="lg:col-span-7 space-y-8">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    ما الذي يمكنك توقعه خلال الزيارة
                  </h3>
                </div>

                <div className="divide-y divide-slate-200">
                  {SERVICE_EXPECTATIONS.whatToExpect.map((item) => (
                    <div
                      key={item.index}
                      data-scroll-expectation
                      className="py-6 first:pt-0 last:pb-0 flex items-start gap-5"
                    >
                      <span className="font-mono text-sm font-bold text-sky-700 tabular-nums mt-1 shrink-0">
                        {item.index}.
                      </span>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Available Consultation Scope Table */}
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-4">
                    نطاق جلسات الاستشارة المتاحة للحجز:
                  </h4>
                  <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                    {CLINIC_SERVICES.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <span className="font-mono text-xs text-sky-700 tabular-nums me-2">
                            {service.code}.
                          </span>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">
                            {service.title}
                          </span>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {service.subtitle}
                          </p>
                        </div>
                        <span className="text-xs font-sans text-slate-500 tabular-nums shrink-0">
                          {service.durationNote}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What the visitor can ask about + Conceptual Architecture Visual */}
              <div className="lg:col-span-5 space-y-6">
                <div
                  data-scroll-questions-card
                  className="rounded-2xl bg-[#0B192C] text-white p-6 sm:p-8 border border-slate-800"
                >
                  <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-3">
                    <HelpCircle className="w-4 h-4" aria-hidden="true" />
                    <span>حوار مفتوح مع الطبيب</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    أسئلة نشجعك على طرحها في الزيارة
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    لا تتردد في استفسار الطبيب عن أي تفصيل يخص حساسية الأسنان أو
                    تناسق اللون:
                  </p>

                  <ul className="space-y-3.5 text-sm text-slate-100 divide-y divide-slate-800">
                    {SERVICE_EXPECTATIONS.questionsToAsk.map((question, i) => (
                      <li key={question} className="pt-3.5 first:pt-0 flex gap-3">
                        <span className="font-mono text-sky-400 text-xs tabular-nums mt-1 shrink-0">
                          {i + 1}.
                        </span>
                        <span className="leading-relaxed">{question}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-300">
                      هل لديك استفسار خاص بحالتك؟
                    </span>
                    <a
                      href="#booking-request"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-bold hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>اطلب موعد استشارة</span>
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Interactive Ceramic Shade & Ambient Lighting Study with non-photographic caption */}
                <ConsultationSuiteStudy />
              </div>
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE APPOINTMENT REQUEST SECTION */}
        <section
          aria-label="نموذج طلب موعد"
          className="py-20 lg:py-28 border-t border-slate-200 bg-[#F1F5F9]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingRequestFlow />
          </div>
        </section>

        {/* 5. USEFUL FAQ SECTION */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-20 lg:py-28 border-t border-slate-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium text-sky-700 mb-3">
                  معلومات واضحة قبل الحضور
                </p>
                <h2
                  id="faq-heading"
                  className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2] text-balance"
                >
                  أسئلة شائعة حول طلب الموعد والاستشارة
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  إجابات مختصرة حول كيفية تنسيق الموعد وطبيعة الزيارة الأولى في
                  لُما لطب الأسنان.
                </p>
              </div>

              <div className="lg:col-span-7">
                <FaqAccordion />
              </div>
            </div>
          </div>
        </section>

        {/* 6. CLOSING CTA SECTION */}
        <section
          aria-labelledby="closing-cta-heading"
          className="py-16 lg:py-24 bg-[#0B192C] text-white border-t border-slate-800"
        >
          <div
            data-scroll-closing-cta
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-sky-400 mb-2">
                  LUMA DENTAL · BAGHDAD
                </p>
                <h2
                  id="closing-cta-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.2] text-balance"
                >
                  ابدأ بخطوة هادئة لفهم ما يناسب ابتسامتك.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  اختر الوقت المفضل لديك في أقل من دقيقة، وسيتواصل معك فريق
                  العيادة لتأكيد الموعد وترتيب زيارتك.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href="#booking-request"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-sky-500 text-slate-950 text-base font-bold hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>اطلب موعد الآن</span>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#visit-journey"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>مراجعة خطوات الزيارة</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* DISCREET DEMO FOOTER */}
      <footer className="bg-[#07111E] text-slate-400 border-t border-slate-800/80 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-200">
              {CLINIC_CONFIG.brandNameAr}
            </span>
            <span aria-hidden="true">·</span>
            <span>{CLINIC_CONFIG.brandNameEn}</span>
            <span aria-hidden="true">·</span>
            <span>{CLINIC_CONFIG.bookingDisclaimer}</span>
          </div>

          <div className="text-slate-400 font-medium">
            {CLINIC_CONFIG.demoCredits}
          </div>
        </div>
      </footer>
    </div>
  );
}
