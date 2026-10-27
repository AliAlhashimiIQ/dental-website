"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Coordinates smooth, non-flashing scroll animations across the page's
 * editorial sections while respecting `prefers-reduced-motion`.
 */
export default function PageScrollChoreography() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Service Information Section: Staggered expectation rows + dark question card depth
      const serviceSection = document.getElementById("service-info");
      if (serviceSection) {
        const expectationRows = serviceSection.querySelectorAll(
          "[data-scroll-expectation]"
        );
        const questionsCard = serviceSection.querySelector(
          "[data-scroll-questions-card]"
        );
        const conceptualFigure = serviceSection.querySelector(
          "[data-scroll-figure]"
        );

        if (expectationRows.length > 0) {
          gsap.from(expectationRows, {
            x: 18,
            y: 12,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: serviceSection,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (questionsCard) {
          gsap.from(questionsCard, {
            y: 28,
            scale: 0.98,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: questionsCard,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (conceptualFigure) {
          gsap.from(conceptualFigure, {
            y: 22,
            scale: 0.99,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: conceptualFigure,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      // 2. Booking Request Container: Architectural elevation entrance
      const bookingContainer = document.getElementById("booking-request");
      if (bookingContainer) {
        gsap.from(bookingContainer, {
          y: 28,
          scale: 0.985,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bookingContainer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // 3. Closing CTA Section: Subtle horizon lift
      const closingCta = document.querySelector("[data-scroll-closing-cta]");
      if (closingCta) {
        gsap.from(closingCta, {
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: closingCta,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return null;
}
