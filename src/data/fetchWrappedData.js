const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status} fetching ${path}`);
  return res.json();
}

/**
 * Runs an array of async task functions with a maximum concurrency limit.
 * Preserves result order matching the input tasks array.
 */
async function withConcurrency(limit, tasks) {
  const results = new Array(tasks.length);
  let index = 0;

  async function runNext() {
    const i = index++;
    if (i >= tasks.length) return;
    results[i] = await tasks[i]();
    await runNext();
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, runNext)
  );

  return results;
}

function getPlayerName(elements, id) {
  const player = elements.find((p) => p.id === id);
  return player ? player.web_name : `Player ${id}`;
}

/**
 * Scores the manager against 8 archetypes and returns the best-matching one.
 */
function determineManagerType({ season, transfers, chips, picksData, bootstrap }) {
  const elements = bootstrap.elements;

  // Average current ownership across all unique starters this season
  const uniqueStarterIds = new Set();
  picksData.forEach((gw) =>
    gw.picks.filter((p) => p.position <= 11).forEach((p) => uniqueStarterIds.add(p.element))
  );
  const avgOwnership =
    [...uniqueStarterIds].reduce((sum, id) => {
      const player = elements.find((e) => e.id === id);
      return sum + (player ? parseFloat(player.selected_by_percent ?? 0) : 0);
    }, 0) / Math.max(uniqueStarterIds.size, 1);

  // Captain ownership per GW
  const captainOwnerships = picksData.map((gw) => {
    const cap = gw.picks.find((p) => p.is_captain);
    if (!cap) return 50;
    const player = elements.find((e) => e.id === cap.element);
    return player ? parseFloat(player.selected_by_percent ?? 0) : 50;
  });
  const avgCaptainOwnership =
    captainOwnerships.reduce((a, b) => a + b, 0) / Math.max(captainOwnerships.length, 1);
  const lowOwnershipCaptainPct =
    captainOwnerships.filter((o) => o < 15).length / Math.max(captainOwnerships.length, 1);

  // GW points standard deviation
  const gwPoints = season.rankJourney.map((gw) => gw.points);
  const meanPoints = gwPoints.reduce((a, b) => a + b, 0) / gwPoints.length;
  const stdDev = Math.sqrt(
    gwPoints.reduce((sum, p) => sum + Math.pow(p - meanPoints, 2), 0) / gwPoints.length
  );

  // Chips used in first half of season (GW ≤ 19)
  const earlyChips = chips.filter((c) => c.gw <= 19).length;

  // Longest consecutive rank-worsening streak
  const ranks = season.rankJourney.map((gw) => gw.rank);
  let maxDropStreak = 0;
  let streak = 0;
  for (let i = 1; i < ranks.length; i++) {
    if (ranks[i] > ranks[i - 1]) {
      streak++;
      maxDropStreak = Math.max(maxDropStreak, streak);
    } else {
      streak = 0;
    }
  }

  // Best GW score relative to the GW's highest recorded score (from bootstrap events)
  const hadExceptionalGW = season.rankJourney.some((g) => {
    const event = bootstrap.events.find((e) => e.id === g.gw);
    if (!event) return false;
    const avg = event.average_entry_score ?? 0;
    const highest = event.highest_score ?? avg * 3;
    // Score is in top ~1% if it's 80%+ of the way from average to the highest
    const threshold = avg + (highest - avg) * 0.8;
    return g.points >= threshold;
  });

  const archetypes = [
    {
      label: "The Template Merchant",
      description:
        "You played it safe all season — high-ownership picks, predictable captains. Reliable but rarely exciting.",
      traits: ["Consistent", "Risk-averse", "Reliable"],
      score: (avgOwnership > 25 ? 2 : 0) + (avgCaptainOwnership > 30 ? 2 : 0),
    },
    {
      label: "The Differential Hunter",
      description:
        "Low-owned picks and bold calls defined your season. Big swings, big variance — you lived on the edge.",
      traits: ["Bold", "High-variance", "Contrarian"],
      score: (avgOwnership < 15 ? 2 : 0) + (stdDev > 25 ? 2 : 0),
    },
    {
      label: "The Chip Blaster",
      description:
        "You loaded your chips early and hoped for the best. Patience was never really your thing.",
      traits: ["Impatient", "Chip-heavy", "Optimistic"],
      score: earlyChips >= 3 ? 4 : earlyChips >= 2 ? 2 : 0,
    },
    {
      label: "The Patient Builder",
      description:
        "Fewer than 30 transfers, barely a hit taken. You trusted your squad and let it ride all season.",
      traits: ["Patient", "Disciplined", "Frugal"],
      score: (transfers.totalMade < 30 ? 3 : 0) + (transfers.totalHits < 3 ? 1 : 0),
    },
    {
      label: "The Trigger-Happy Gaffer",
      description:
        "40+ transfers and counting. Every blank week had you reaching for the app. The market was your playground.",
      traits: ["Active", "Reactionary", "Restless"],
      score:
        (transfers.totalMade >= 40 ? 2 : transfers.totalMade >= 35 ? 1 : 0) +
        (transfers.totalHits >= 5 ? 2 : 0),
    },
    {
      label: "The Captain Gambler",
      description:
        "Over half your armband choices were low-ownership differentials. Sometimes genius, often agony.",
      traits: ["Brave", "Contrarian", "High-risk"],
      score: lowOwnershipCaptainPct > 0.5 ? 4 : lowOwnershipCaptainPct > 0.3 ? 2 : 0,
    },
    {
      label: "The Nearly Man",
      description:
        "Top 20% for most of the season, then one catastrophic stretch undid months of careful work.",
      traits: ["Consistent", "Unlucky", "Resilient"],
      score: (season.percentile <= 20 ? 2 : 0) + (maxDropStreak >= 5 ? 2 : 0),
    },
    {
      label: "The Glass Half Full",
      description:
        "The overall rank didn't reflect your potential. That one legendary gameweek? Absolutely elite.",
      traits: ["Optimistic", "Inconsistent", "Explosive"],
      score: (season.percentile > 50 ? 2 : 0) + (hadExceptionalGW ? 2 : 0),
    },
  ];

  const best = archetypes.reduce(
    (top, arch) => (arch.score > top.score ? arch : top),
    archetypes[0]
  );

  return { label: best.label, description: best.description, traits: best.traits };
}

/**
 * Fetches all FPL data for a given teamId and returns a single WrappedData object.
 *
 * @param {number|string} teamId - The FPL team ID
 * @returns {Promise<WrappedData>}
 */
export default async function fetchWrappedData(teamId) {
  // 1. Parallel fetch of independent top-level endpoints
  const [entry, history, transfers, bootstrap] = await Promise.all([
    apiFetch(`/api/fpl/entry/${teamId}`),
    apiFetch(`/api/fpl/history/${teamId}`),
    apiFetch(`/api/fpl/transfers/${teamId}`),
    apiFetch("/api/fpl/bootstrap"),
  ]);

  // 2. Determine which gameweeks have been played
  const playedGWs = history.current
    .filter((gw) => gw.points > 0)
    .map((gw) => gw.event);

  // 3. Fetch picks and live data for all played GWs (concurrency limit: 6)
  const [picksData, liveData] = await Promise.all([
    withConcurrency(
      6,
      playedGWs.map((gw) => () => apiFetch(`/api/fpl/picks/${teamId}/${gw}`))
    ),
    withConcurrency(
      6,
      playedGWs.map((gw) => () => apiFetch(`/api/fpl/live/${gw}`))
    ),
  ]);

  // -------------------------
  // Season
  // -------------------------
  const currentGWs = history.current.filter((gw) => gw.points > 0);
  const lastGW = currentGWs[currentGWs.length - 1];
  const totalManagers = bootstrap.total_players;
  const finalRank = lastGW.overall_rank;
  const percentile = parseFloat(((finalRank / totalManagers) * 100).toFixed(2));

  const chipByGW = Object.fromEntries(history.chips.map((c) => [c.event, c.name]));
  const bestGWData = currentGWs.reduce((best, gw) => (gw.points > best.points ? gw : best));
  const worstGWData = currentGWs.reduce((worst, gw) => (gw.points < worst.points ? gw : worst));

  const season = {
    totalPoints: lastGW.total_points,
    finalRank,
    percentile,
    totalManagers,
    bestGW: {
      number: bestGWData.event,
      points: bestGWData.points,
      chip: chipByGW[bestGWData.event] ?? null,
    },
    worstGW: {
      number: worstGWData.event,
      points: worstGWData.points,
    },
    rankJourney: currentGWs.map((gw) => ({
      gw: gw.event,
      rank: gw.overall_rank,
      points: gw.points,
    })),
  };

  // -------------------------
  // Captaincy
  // -------------------------
  const captainStats = picksData.map((gwPicks, i) => {
    const gwLive = liveData[i];
    const liveMap = Object.fromEntries(
      gwLive.elements.map((e) => [e.id, e.stats.total_points ?? 0])
    );

    const cap = gwPicks.picks.find((p) => p.is_captain);
    const captainRawPoints = liveMap[cap.element] ?? 0;
    const captainPoints = captainRawPoints * cap.multiplier; // 2 for C, 3 for TC

    // Best possible captain from starting XI
    const startingXI = gwPicks.picks.filter((p) => p.position <= 11);
    const optimalPoints = Math.max(...startingXI.map((p) => (liveMap[p.element] ?? 0) * 2));

    return {
      gw: gwPicks.entry_history.event,
      captainId: cap.element,
      captainPoints,
      optimalPoints,
      missed: Math.max(0, optimalPoints - captainPoints),
      hit: captainPoints >= optimalPoints,
    };
  });

  const totalCaptainPoints = captainStats.reduce((sum, g) => sum + g.captainPoints, 0);
  const missedPoints = captainStats.reduce((sum, g) => sum + g.missed, 0);
  const hitRate = parseFloat(
    ((captainStats.filter((g) => g.hit).length / captainStats.length) * 100).toFixed(1)
  );

  const bestCapGW = captainStats.reduce((best, g) =>
    g.captainPoints > best.captainPoints ? g : best
  );
  const worstCapGW = captainStats.reduce((worst, g) =>
    g.captainPoints < worst.captainPoints ? g : worst
  );

  const captaincy = {
    totalCaptainPoints,
    missedPoints,
    hitRate,
    bestCaptain: {
      player: getPlayerName(bootstrap.elements, bestCapGW.captainId),
      gw: bestCapGW.gw,
      points: bestCapGW.captainPoints,
    },
    worstCaptain: {
      player: getPlayerName(bootstrap.elements, worstCapGW.captainId),
      gw: worstCapGW.gw,
      points: worstCapGW.captainPoints,
    },
  };

  // -------------------------
  // Transfers
  // -------------------------
  const totalMade = currentGWs.reduce((sum, gw) => sum + gw.event_transfers, 0);
  const totalHits = currentGWs.reduce(
    (sum, gw) =>
      gw.event_transfers_cost < 0 ? sum + Math.abs(gw.event_transfers_cost) / 4 : sum,
    0
  );
  const netPoints = currentGWs.reduce((sum, gw) => sum + gw.event_transfers_cost, 0);

  const inCounts = {};
  const outCounts = {};
  for (const t of transfers) {
    inCounts[t.element_in] = (inCounts[t.element_in] || 0) + 1;
    outCounts[t.element_out] = (outCounts[t.element_out] || 0) + 1;
  }

  const mostTransferredIn = Object.entries(inCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, times]) => ({ player: getPlayerName(bootstrap.elements, parseInt(id)), times }));

  const mostTransferredOut = Object.entries(outCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, times]) => ({ player: getPlayerName(bootstrap.elements, parseInt(id)), times }));

  const transfersResult = { totalMade, totalHits, netPoints, mostTransferredIn, mostTransferredOut };

  // -------------------------
  // Chips
  // -------------------------
  const chips = history.chips.map((chip) => {
    const gwHistory = currentGWs.find((gw) => gw.event === chip.event);
    const event = bootstrap.events.find((e) => e.id === chip.event);
    const pointsScored = gwHistory?.points ?? 0;
    const averageThatGW = event?.average_entry_score ?? 0;

    let verdict;
    if (pointsScored >= averageThatGW * 1.5) verdict = "great";
    else if (pointsScored >= averageThatGW) verdict = "good";
    else verdict = "poor";

    return { chip: chip.name, gw: chip.event, pointsScored, averageThatGW, verdict };
  });

  // -------------------------
  // Manager type
  // -------------------------
  const managerType = determineManagerType({
    season,
    transfers: transfersResult,
    chips,
    picksData,
    bootstrap,
  });

  return {
    manager: {
      name: `${entry.player_first_name} ${entry.player_last_name}`,
      teamName: entry.name,
      id: entry.id,
    },
    season,
    captaincy,
    transfers: transfersResult,
    chips,
    managerType,
  };
}
