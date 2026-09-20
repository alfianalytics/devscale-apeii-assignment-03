import { db } from "./prisma/db.js";

async function showCompaction() {
  const sessions = await db.orm.public.AgentMemorySession.all();
  const compactedSessions = sessions.filter(s => s.compactionState !== null);

  console.log(`\n======================================================`);
  console.log(`📊 TOTAL SESSIONS: ${sessions.length}`);
  console.log(`✨ SESSIONS WITH COMPACTION: ${compactedSessions.length}`);
  console.log(`======================================================\n`);

  for (const s of compactedSessions) {
    console.log(`🔹 Session ID: ${s.sessionId}`);
    console.log(`   User ID:    ${s.userId || "anonymous"}`);
    console.log(`   Updated At: ${s.updatedAt}`);
    console.log(`   --- Compaction Details ---`);
    const state = s.compactionState as any;
    console.log(`   Generation:                 ${state?.generation}`);
    console.log(`   Messages Compacted:         ${state?.summary?.metadata?.anvia?.memoryCompaction?.compactedMessageCount}`);
    console.log(`   Summarized Up To Position:  ${state?.summarizedThroughPosition}`);
    console.log(`\n📝 Stored Compacted Summary Text:`);
    console.log(`------------------------------------------------------`);
    console.log(state?.summary?.content);
    console.log(`------------------------------------------------------\n`);
  }
}

showCompaction().then(() => process.exit(0)).catch(console.error);
