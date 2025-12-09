"use client";

import { useEffect, useState } from "react";

async function fetchGitHubContributions() {
  const response = await fetch("/api/github-contributions");

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  return await response.json();
}

export default function ContributionGraph() {
  const [calendarData, setCalendarData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGitHubContributions();
      setCalendarData(data);
    };

    fetchData();
  }, []);

  if (!calendarData) {
    return <div>Loading...</div>;
  }

  const getColor = (contributionCount: number) => {
    if (contributionCount === 0) return "bg-neutral-300 dark:bg-spaceblack border border-neutral-400 dark:border-neutral-800";
    if (contributionCount < 20 && contributionCount > 5) return "bg-[#4e201c] dark:bg-[#00ADB5]";
    if (contributionCount < 5 && contributionCount > 2) return "bg-[#7a2d26] dark:bg-[#007991]";
    if (contributionCount < 2) return "bg-[#a33b30] dark:bg-[#005f73]";
    return "bg-[#cc493a] dark:bg-[#003f5c]";
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">GitHub Contributions</h2>
      <div className="flex flex-wrap gap-1">
        {calendarData.weeks.map((week: any, weekIndex: number) =>
          week.contributionDays.map((day: any, dayIndex: number) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`w-4 h-4 rounded-sm ${getColor(day.contributionCount)}`}
              title={`${day.date}: ${day.contributionCount} contributions`}
            />
          ))
        )}
      </div>
      <p className="mt-4">
        Total Contributions: {calendarData.totalContributions}
      </p>
    </div>
  );
}