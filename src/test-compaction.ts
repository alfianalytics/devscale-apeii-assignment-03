import { cityAnalyst } from "./agent.js";

async function runCompactionTest() {
  const sessionId = "compaction_test_" + Date.now();
  const session = { sessionId, userId: "pep_guardiola" };

  console.log(`\n🚀 Starting Compaction Test with session: ${sessionId}\n`);

  // Turn 1: Detailed query that generates lots of tokens (tool call + detailed answer)
  console.log("--- Turn 1: Asking about player fitness and detailed status ---");
  const turn1 = await cityAnalyst.generate({
    prompt: "Give me a thorough, detailed fitness check on Erling Haaland and Kevin De Bruyne.",
    session,
  });
  console.log(`Turn 1 Response preview: ${turn1.text.slice(0, 120)}...`);

  // Turn 2: Another detailed query that pushes total tokens well past 500
  console.log("\n--- Turn 2: Scouting report on Arsenal with tactical deep-dive ---");
  const turn2 = await cityAnalyst.generate({
    prompt: "Provide a detailed scouting report on Arsenal's formation, weaknesses, and pressing traps.",
    session,
  });
  console.log(`Turn 2 Response preview: ${turn2.text.slice(0, 120)}...`);

  // Turn 3: Triggers compaction of older turns while retaining the most recent turn
  console.log("\n--- Turn 3: Asking for tactical lineup recommendation ---");
  const turn3 = await cityAnalyst.generate({
    prompt: "Based on our previous discussion about player fitness and Arsenal, what tactical lineup should we use?",
    session,
  });
  console.log(`Turn 3 Response preview: ${turn3.text.slice(0, 120)}...`);

  console.log("\n✅ All turns completed! Now let's check PostgreSQL for compactionState.");
}

runCompactionTest().catch(console.error);
