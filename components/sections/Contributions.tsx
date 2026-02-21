"use client";

import { useEffect, useState } from "react";

const YEARS = [2024, 2025, 2026];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

async function fetchGitHubContributions(year: number) {
  const response = await fetch(`/api/github-contributions?year=${year}`);

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  return await response.json();
}

export default function ContributionGraph() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [calendarData, setCalendarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchGitHubContributions(selectedYear);
        setCalendarData(data);
      } catch (err) {
        console.error("Failed to load contributions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const getColor = (contributionCount: number) => {
    if (contributionCount === 0) return "bg-neutral-300 dark:bg-spaceblack border border-neutral-400 dark:border-neutral-800";
    if (contributionCount <= 3) return "bg-[#e8b4ad] dark:bg-[#003f5c]";
    if (contributionCount <= 6) return "bg-[#cc493a] dark:bg-[#005f73]";
    if (contributionCount <= 9) return "bg-[#a33b30] dark:bg-[#007991]";
    return "bg-[#4e201c] dark:bg-[#00ADB5]";
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">GitHub Contributions</h2>

      {loading ? (
        <div className="flex gap-[3px] overflow-x-auto max-w-full opacity-40 animate-pulse">
          {Array.from({ length: 53 }).map((_, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => (
                <div
                  key={di}
                  className="w-[13px] h-[13px] rounded-sm bg-neutral-300 dark:bg-neutral-800"
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        calendarData && (
          <>
            <div className="flex gap-[3px] overflow-x-auto max-w-full">
              {calendarData.weeks.map((week: any, weekIndex: number) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day: any, dayIndex: number) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-[13px] h-[13px] rounded-sm ${getColor(day.contributionCount)}`}
                      title={`${formatDate(day.date)}: ${day.contributionCount} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-4">
              Total Contributions: {calendarData.totalContributions}
            </p>
          </>
        )
      )}

      {/* Year Toggle */}
      <div className="flex items-center gap-2 mt-6">
        {YEARS.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-1.5 rounded-md font-exo2 text-sm transition-all duration-300
              ${selectedYear === year
                ? "dark:bg-[#00ADB5] bg-[#4e201c] text-white shadow-md"
                : "dark:bg-slate-800/50 bg-slate-200/50 dark:text-[#acbacf] text-[#4e201c] hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
              }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}