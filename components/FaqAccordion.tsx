"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/lib/clinic-config";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className="py-5">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 text-start py-1 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded-lg"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-sky-700 tabular-nums shrink-0">
                    0{idx + 1}.
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-800 transition-colors">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "rotate-180 text-slate-900" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            {/* 60fps CSS Grid 0fr -> 1fr height transition (from 60fps-animation skill) */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden min-h-0">
                <div className="pt-3 ps-7 pe-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
