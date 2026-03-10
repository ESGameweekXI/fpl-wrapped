"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GWLogo from "@/components/GWLogo";

export default function Home() {
  const [teamId, setTeamId] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const id = teamId.trim();
    if (id) router.push(`/${id}`);
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">

      {/* Halftone background accent */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* Dashed border frame */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">

        {/* Season tag */}
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-xs uppercase tracking-[0.3em]">
          2025 / 26
        </p>

        {/* Headline */}
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-[var(--black)] text-8xl leading-none tracking-wide">
            FPL
          </h1>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--gw-teal)] text-8xl leading-none tracking-wide">
            WRAPPED
          </h1>
        </div>

        {/* Dashed separator */}
        <hr className="dashed-separator" />

        {/* Subheading */}
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-sm text-center leading-relaxed">
          Your 2025/26 season in review
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="teamId"
              className="font-[family-name:var(--font-mono)] text-[var(--black)] text-xs uppercase tracking-widest"
            >
              Team ID
            </label>
            <input
              id="teamId"
              type="number"
              inputMode="numeric"
              placeholder="e.g. 1234567"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
              className="
                w-full border-2 border-[var(--black)] bg-[var(--cream)]
                font-[family-name:var(--font-mono)] text-[var(--black)]
                text-lg px-4 py-3 rounded-none
                placeholder:text-[var(--faded-ink)] placeholder:opacity-60
                focus:outline-none focus:border-[var(--red)]
                transition-colors
              "
            />
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-xs leading-relaxed">
              Find your Team ID on the FPL website under Points
            </p>
          </div>

          <button
            type="submit"
            className="
              w-full bg-[var(--black)] text-[var(--cream)]
              font-[family-name:var(--font-display)] text-2xl tracking-widest
              px-6 py-4 border-2 border-[var(--black)]
              hover:bg-[var(--red)] hover:border-[var(--red)]
              active:scale-95
              transition-all duration-150
            "
          >
            REVEAL MY SEASON
          </button>
        </form>

        {/* Footer rule */}
        <hr className="dashed-separator" />
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.6rem] uppercase tracking-widest text-center">
          Not affiliated with the Premier League or FPL
        </p>
      </div>

      {/* GWLogo — bottom-right corner */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 opacity-70">
        <GWLogo size={28} />
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
          by Gameweek XI
        </p>
      </div>
    </main>
  );
}
