"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import useWrappedData from "@/hooks/useWrappedData";
import slidesConfig from "@/slides.config";
import ProgressDots from "@/components/ProgressDots";

/** Convert kebab-case id to PascalCase filename, e.g. 'total-points' → 'TotalPointsSlide' */
function toPascalCase(str) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// Build dynamic component map once at module level (outside render)
const slideComponents = Object.fromEntries(
  slidesConfig.map(({ id }) => {
    const name = `${toPascalCase(id)}Slide`;
    return [
      id,
      dynamic(() => import(`@/slides/${name}`), { loading: () => null }),
    ];
  })
);

const enabledSlides = slidesConfig.filter((s) => s.enabled);

export default function WrappedPage() {
  const { teamId } = useParams();
  const { data, loading, error } = useWrappedData(teamId);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Loading ──────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center gap-4">
        <p
          className="
            font-[family-name:var(--font-display)] text-[var(--black)]
            text-4xl tracking-widest animate-pulse
          "
        >
          LOADING YOUR SEASON...
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-xs uppercase tracking-widest">
          Crunching the numbers
        </p>
      </main>
    );
  }

  // ── Error ────────────────────────────────────────────────────
  if (error) {
    return (
      <main className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center gap-6 px-8">
        <h1
          className="
            font-[family-name:var(--font-display)] text-[var(--red)]
            text-5xl tracking-wide text-center leading-none
          "
        >
          SOMETHING WENT WRONG
        </h1>
        <hr className="dashed-separator" />
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-sm text-center leading-relaxed max-w-xs">
          We couldn&apos;t load your season data. Check your Team ID and try
          again.
        </p>
        <Link
          href="/"
          className="
            font-[family-name:var(--font-mono)] text-[var(--black)] text-sm
            border-b border-[var(--black)] pb-0.5
            hover:text-[var(--red)] hover:border-[var(--red)]
            transition-colors
          "
        >
          ← Back to home
        </Link>
      </main>
    );
  }

  // ── Slideshow ────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center gap-8 px-4 py-10">
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        className="w-full max-w-sm"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {enabledSlides.map(({ id }) => {
          const SlideComponent = slideComponents[id];
          return (
            <SwiperSlide
              key={id}
              className="rounded-none border-2 border-[var(--black)] bg-[var(--cream)] overflow-hidden"
            >
              <SlideComponent {...data} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <ProgressDots total={enabledSlides.length} current={activeIndex} />
    </main>
  );
}
