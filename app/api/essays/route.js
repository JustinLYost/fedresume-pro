// File: app/api/essays/route.js
// This is a NEW file you need to create. Place it at app/api/essays/route.js

import Anthropic from "@anthropic-ai/sdk";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("fed_token")?.value;
  const tier = token ? verifyToken(token) : null;

  // Only the Bundle tier unlocks essay generation
  if (tier !== "bundle") {
    return Response.json({ error: "Bundle tier required" }, { status: 402 });
  }

  const { jobPosting, resume } = await request.json();

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `You are an expert federal hiring consultant helping a candidate draft starting points for the four required Merit Hiring essay questions (mandatory for all GS-05+ federal applications since October 2025).

JOB POSTING:
${jobPosting}

CANDIDATE RESUME:
${resume}

Generate four 200-word essay STARTING POINTS the candidate can personalize. Each draft should be specific to this candidate's background and the role, but written in a way that invites editing rather than feeling final.

The four required essays are:

1. "How has your commitment to the Constitution and the founding principles of the United States inspired you to pursue this role within the Federal government?"

2. "In this role, how would you use your skills and experience to improve government efficiency and effectiveness?"

3. "Describe a time when you demonstrated commitment to the public interest or to serving others. How does this experience prepare you for federal service?"

4. "Why are you specifically interested in the duties and mission of this position? What unique perspective or skills would you bring?"

Respond with ONLY a JSON object (no markdown fences, no preamble) in this exact shape:
{
  "essays": [
    {"question": "<the question text, abbreviated>", "draft": "<200-word starting point>"},
    {"question": "<...>", "draft": "<...>"},
    {"question": "<...>", "draft": "<...>"},
    {"question": "<...>", "draft": "<...>"}
  ]
}

Each draft should be approximately 180-200 words, specific to this candidate and posting, and written as a first-person narrative the candidate can edit and personalize. Do not include the word count in the draft text.`,
        },
      ],
    });

    const text = message.content.find((b) => b.type === "text").text;
    const cleaned = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    return Response.json(data);
  } catch (error) {
    console.error("Essays error:", error);
    return Response.json({ error: "Essay generation failed" }, { status: 500 });
  }
}