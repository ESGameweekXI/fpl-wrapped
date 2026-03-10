"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import StatCard from "@/components/StatCard";

// Use hex values directly — SVG attributes don't resolve CSS custom properties
const COLORS = {
  black:    "#1A1208",
  cream:    "#F5EDD6",
  fadedInk: "#5C4A2A",
  green:    "#1E5631",
  red:      "#C0392B",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { gw, rank, points } = payload[0].payload;
  return (
    <div
      className="border-2 border-[var(--black)] bg-[var(--cream)] px-3 py-2"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <p className="text-[0.55rem] uppercase tracking-widest text-[var(--faded-ink)]">GW {gw}</p>
      <p className="text-sm font-bold text-[var(--black)]">Rank {rank.toLocaleString()}</p>
      <p className="text-[0.55rem] text-[var(--faded-ink)]">{points} pts</p>
    </div>
  );
}

/**
 * RankJourneySlide — line chart of overall rank across the season.
 * Props: { season }
 */
export default function RankJourneySlide({ season }) {
  if (!season) return null;

  const { rankJourney } = season;

  const bestRank  = Math.min(...rankJourney.map((g) => g.rank));
  const worstRank = Math.max(...rankJourney.map((g) => g.rank));

  return (
    <div className="relative flex flex-col bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none gap-4">

      {/* Paper grain */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
          Season Overview
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
          YOUR RANK JOURNEY
        </h2>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── AXIS LABEL ── */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
          ↑ Better rank
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
          GW →
        </span>
      </div>

      {/* ── CHART ── */}
      <div className="relative z-10 w-full" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={rankJourney}
            margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          >
            <XAxis
              dataKey="gw"
              tick={{ fill: COLORS.fadedInk, fontSize: 9, fontFamily: "IBM Plex Mono" }}
              tickLine={false}
              axisLine={{ stroke: COLORS.black, strokeWidth: 1.5 }}
              interval={Math.floor(rankJourney.length / 6)}
            />
            <YAxis
              reversed
              domain={["auto", "auto"]}
              tick={{ fill: COLORS.fadedInk, fontSize: 9, fontFamily: "IBM Plex Mono" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                v >= 1_000_000
                  ? `${(v / 1_000_000).toFixed(1)}M`
                  : v >= 1_000
                  ? `${Math.round(v / 1_000)}k`
                  : v
              }
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Best rank reference line */}
            <ReferenceLine
              y={bestRank}
              stroke={COLORS.green}
              strokeDasharray="4 3"
              strokeWidth={1}
            />
            <Line
              type="monotone"
              dataKey="rank"
              stroke={COLORS.black}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: COLORS.black, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── STAT CARDS ── */}
      <div className="relative z-10 flex gap-3 flex-wrap">
        <StatCard
          label="Best Rank"
          value={bestRank.toLocaleString()}
          accent="green"
        />
        <StatCard
          label="Worst Rank"
          value={worstRank.toLocaleString()}
          accent="red"
        />
      </div>
    </div>
  );
}
