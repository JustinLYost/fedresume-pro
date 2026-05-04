import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  const { jobPosting, resume } = await request.json();

  if (!jobPosting || !resume) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `You are an expert federal resume consultant. Analyze how well a candidate's resume matches a USAJOBS posting.

JOB POSTING:
${jobPosting}

CANDIDATE RESUME:
${resume}

Respond with ONLY a JSON object (no markdown fences, no preamble) in this exact shape:
{
  "matchScore": <integer 0-100>,
  "gsLevel": "<estimated grade fit>",
  "missingKeywords": [{"keyword": "<term>", "importance": "high|medium|low", "context": "<why this matters>"}],
  "presentKeywords": ["<term>", ...],
  "specializedExperienceMatch": "<2-3 sentence assessment>",
  "rewrittenBullets": [{"original": "<bullet>", "rewritten": "<federal-style version>"}],
  "ksaStatements": [{"competency": "<KSA from posting>", "statement": "<3-5 sentence narrative>"}],
  "criticalGaps": ["<gap 1>", "<gap 2>", "<gap 3>"],
  "formattingChecklist": [{"item": "<requirement>", "status": "pass|fail|warn", "fix": "<how to fix or null>"}]
}

Provide 8-12 missing keywords, 3-5 rewritten bullets, 3-4 KSA statements, and 6 formatting items.`,
        },
      ],
    });

    const text = message.content.find((b) => b.type === "text").text;
    const cleaned = text.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleaned);

    return Response.json(analysis);
  } catch (error) {
    console.error("Analyze error:", error);
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}