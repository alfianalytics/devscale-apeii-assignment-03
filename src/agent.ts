import { Agent, createSummaryMemoryCompactor } from "@anvia/core";
import { OpenAIClient } from "@anvia/openai";
import { memory } from "./prisma/db.js";
import { checkPlayerAvailability, generateOpponentReport, recommendLineupTactics } from "./tools.js";
import "dotenv/config";

const client = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY!,
  baseUrl: process.env.OPENAI_BASE_URL,
});

const model = client.completionModel({ modelId: "deepseek-v4.1-flash" });

export const cityAnalyst = new Agent({
  id: "city-tactical-analyst",
  model,
  instructions:
    "You are the Lead Tactical Analyst for Manchester City under Pep Guardiola. " +
    "Your goal is to provide elite football analysis, assess squad fitness, analyze opponents, and construct match plans. " +
    "Always consult your tools to gather verified player availability, opponent scouting reports, and tactical recommendations.",
  tools: [checkPlayerAvailability, generateOpponentReport, recommendLineupTactics],
  memory: {
    store: memory,
    savePolicy: "turn",
    compaction: {
      trigger: { afterTokens: 500 }, // Triggers compaction when context exceeds 500 tokens
      retention: { recentTurns: 1 },  // Keeps the latest turn uncompacted, compacts older history
      compactor: createSummaryMemoryCompactor({
        model,
        instructions: "Summarize key tactical insights, player fitness notes, and opponent scouting conclusions accurately.",
      }),
    },
  },
});
