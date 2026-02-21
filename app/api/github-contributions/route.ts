import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');

  const query = `
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const username = "sahiwl";

  let from: string;
  let to: string;

  if (yearParam) {
    const year = parseInt(yearParam, 10);
    from = new Date(year, 0, 1).toISOString();
    const now = new Date();
    // If the requested year is the current year or future, cap `to` at now
    if (year >= now.getFullYear()) {
      to = now.toISOString();
    } else {
      to = new Date(year, 11, 31, 23, 59, 59).toISOString();
    }
  } else {
    from = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
    to = new Date().toISOString();
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username, from, to },
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.data || !data.data.user) {
      console.error("Error fetching GitHub contributions:", data);
      return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 500 });
    }

    return NextResponse.json(data.data.user.contributionsCollection.contributionCalendar);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
