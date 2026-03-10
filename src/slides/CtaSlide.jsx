"use client";

import GWLogo from "@/components/GWLogo";

export default function CtaSlide() {
  return (
    <div
      className="relative flex flex-col justify-between min-h-[70vh] p-6 overflow-hidden select-none"
      style={{ backgroundColor: "var(--gw-dark)" }}
    >
      {/* Teal halftone dot background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #00FFC2 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Teal glow bloom — top right */}
      <div
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #00FFC222 0%, transparent 70%)" }}
      />

      {/* ── TOP ROW: 2025/26 badge ── */}
      <div className="relative z-10 flex justify-end">
        <div
          className="border border-dashed px-2 py-0.5 opacity-40"
          style={{ borderColor: "var(--gw-teal)" }}
        >
          <p
            className="text-[0.45rem] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gw-teal)" }}
          >
            2025 / 26
          </p>
        </div>
      </div>

      {/* ── CENTRE: Logo + brand name ── */}
      <div className="relative z-10 flex flex-col items-center gap-3 mt-4">
        <GWLogo size={64} />
        <p
          className="uppercase tracking-[0.3em] font-bold text-sm"
          style={{ fontFamily: "var(--font-brand)", color: "var(--gw-teal)" }}
        >
          Gameweek XI
        </p>
      </div>

      {/* ── HEADLINE + SUBHEADING ── */}
      <div className="relative z-10 flex flex-col gap-3 mt-6">
        <h2
          className="leading-none tracking-wide"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--gw-teal)",
            fontSize: "clamp(2.2rem, 12vw, 3.2rem)",
          }}
        >
          ENJOYED RELIVING THE SEASON?
        </h2>

        <div className="w-12 h-[2px]" style={{ backgroundColor: "var(--gw-teal)" }} />

        <p
          className="text-sm leading-relaxed opacity-80"
          style={{ fontFamily: "var(--font-brand)", color: "var(--gw-teal-dim)" }}
        >
          Feel alive all season on Gameweek XI
        </p>
      </div>

      {/* ── CTA BUTTON ── */}
      <div className="relative z-10 mt-6">
        <a
          href="https://gameweekxi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-6 py-4 border-2 transition-all duration-150 group"
          style={{ borderColor: "var(--gw-teal)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--gw-teal)";
            e.currentTarget.querySelector("span").style.color = "var(--gw-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.querySelector("span").style.color = "var(--gw-teal)";
          }}
        >
          <span
            className="font-semibold text-sm uppercase tracking-widest transition-colors duration-150"
            style={{ fontFamily: "var(--font-brand)", color: "var(--gw-teal)" }}
          >
            Download Now
          </span>
        </a>
      </div>

      {/* ── FOOTER: URL ── */}
      <div className="relative z-10 mt-4 flex justify-center">
        <p
          className="text-xs tracking-widest opacity-50"
          style={{ fontFamily: "var(--font-mono)", color: "var(--gw-teal)" }}
        >
          gameweekxi.com
        </p>
      </div>
    </div>
  );
}
