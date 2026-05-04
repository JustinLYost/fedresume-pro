// File: app/api/rewrite/route.js
// REPLACE the existing file with this updated version.
// The only change is the tier check now accepts "rewrite" OR "bundle".

import Anthropic from "@anthropic-ai/sdk";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("fed_token")?.value;
  const tier = token ? verifyToken(token) : null;

  // Rewrite is unlocked at Rewrite tier ($39) and Bundle tier ($79)
  if (!tier || (tier !== "rewrite" && tier !== "bundle")) {
    return Response.json({ error: "Payment required" }, { status: 402 });
  }

  const { jobPosting, resume } = await request.json();

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `You are an expert federal resume writer. Rewrite the candidate's resume in the CURRENT 2-page federal/USAJOBS format (per the OPM Merit Hiring Plan, effective September 27, 2025), optimized for the specific posting below.

CRITICAL FORMATTING RULES (per Sept 2025 OPM rules):
- The resume MUST fit on 2 pages — USAJOBS rejects longer resumes.
- Every position still requires: Title, Employer, Dates (MM/YYYY format), Hours per week, Salary, and Supervisor (name, phone, may-contact yes/no).
- Use concise duty paragraphs (2-3 sentences each) followed by 3-4 quantified accomplishment bullets per role — fitting all of this in 2 pages requires tight, high-density writing.
- Do NOT use the old 4-5 page expanded narrative format. The new rules require condensed federal formatting.

JOB POSTING:
${jobPosting}

CURRENT RESUME:
${resume}

Generate a complete 2-page federal-style resume rewrite in plain text. Requirements:
- Header: Name, contact info, US Citizen status, Veterans' Preference (if applicable)
- Brief Professional Summary (2-3 sentences max)
- Work Experience: For each role, include all required federal fields then a tight duty paragraph + 3-4 quantified bullets using posting keywords
- Education and Certifications sections (concise)
- Use clear ASCII section dividers (=== style)
- Total length: aim for what would print as exactly 2 pages — be ruthless about cutting fluff
- Output PLAIN TEXT only, no markdown formatting`,
        },
      ],
    });

    const text = message.content.find((b) => b.type === "text").text;
    return Response.json({ text });
  } catch (error) {
    console.error("Rewrite error:", error);
    return Response.json({ error: "Rewrite failed" }, { status: 500 });
  }
}