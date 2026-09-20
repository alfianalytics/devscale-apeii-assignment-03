# Assignment 03: Manchester City Tactical Analyst Agent

> **AI Product Engineering with TypeScript Batch II**  
> Anvia Agent with Custom Tool Suite, Studio UI, and Prisma 8 Memory with Compaction.

---

## 🎯 Objective

Build and submit an autonomous AI agent that:
1. Runs in **Anvia Studio**.
2. Executes a cohesive suite of **at least three related tools**.
3. Keeps **durable and compacted conversation history in Prisma 8 (PostgreSQL)**.

---

## ⚽ Project Overview: Manchester City Tactical Analyst

This agent acts as the Lead Tactical Analyst for Manchester City under Pep Guardiola. It helps backroom staff assess player fitness, scout upcoming opponents, and recommend matchday tactics based on tactical weaknesses and player availability.

### 🛠️ The 3 Related Tools (`src/tools.ts`)

- **`checkPlayerAvailability`**:
  - Checks real-time player match fitness, recovery percentage, and playing restrictions (e.g. Erling Haaland is 100% fit for 90 mins; Kevin De Bruyne is doubtful at 75% load capacity, suitable as a 30-min second-half substitute).
- **`generateOpponentReport`**:
  - Generates tactical scouting dossiers for opponents (e.g. Arsenal, Real Madrid), detailing formations, pressing intensities, danger men, and transition vulnerabilities.
- **`recommendLineupTactics`**:
  - Synthesizes tactical setups (e.g. 3-2-4-1 Inverted Fullback / Box Midfield) with tactical directives to exploit the opponent's weaknesses while accounting for squad fitness.

---

## 🧠 Prisma 8 Memory & Compaction Architecture

- **Database:** PostgreSQL running in Docker (`postgres:16`).
- **Store:** `@anvia/memory-prisma/v8` attached via `PrismaMemoryStore`.
- **Compaction Policy:**
  - **Save Policy:** `"turn"` — updates memory after each turn.
  - **Trigger:** `{ afterTokens: 500 }` — triggers compaction when context length crosses 500 tokens.
  - **Retention:** `{ recentTurns: 1 }` — retains the latest turn verbatim for immediate conversational flow, while older turns are summarized.
  - **Compactor:** `createSummaryMemoryCompactor` uses the LLM to extract key tactical takeaways and updates the `compactionState` JSON column in the `AgentMemorySession` table.

---

## 📁 Project Structure

```text
devscale-apeii-assignment-03/
├── src/
│   ├── prisma/
│   │   ├── contract.prisma   # Prisma 8 PSL contract with Anvia Memory models
│   │   ├── contract.json     # Compiled contract schema
│   │   ├── contract.d.ts     # Auto-generated contract type definitions
│   │   └── db.ts             # Prisma 8 PostgreSQL runtime & MemoryStore
│   ├── agent.ts              # Manchester City Analyst Agent definition with compaction
│   ├── tools.ts              # The 3 analyst tools (Zod-validated)
│   ├── studio.ts             # Anvia Studio web server launcher
│   ├── test-compaction.ts    # Multi-turn test script demonstrating compaction
│   └── show-compaction.ts    # Terminal inspector for compacted database state
├── .env                      # Database URL and AI Gateway credentials
├── prisma.config.ts          # Prisma 8 CLI configuration
├── tsconfig.json             # TypeScript compiler options (NodeNext, ES Modules)
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js:** v22.18+ or v24+
- **pnpm:** v11+
- **Docker:** (for local PostgreSQL)

### 2. Start PostgreSQL Database

```bash
docker run --name postgres-anvia -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:16
```
*(If already created previously: `docker start postgres-anvia`)*

### 3. Environment Variables (`.env`)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"
OPENAI_API_KEY=your_devscale_or_openai_key
OPENAI_BASE_URL=https://gateway.devscale.id/v1
```

### 4. Setup Prisma 8 Database Schema

```bash
pnpm exec prisma contract emit
pnpm exec prisma db update
```

---

## 🖥️ Running & Testing

### Option A: Launch Anvia Studio (Recommended)

Start the Studio web server:
```bash
pnpm exec tsx src/studio.ts
```
1. Open [http://localhost:4021/playground](http://localhost:4021/playground) in your browser.
2. Select the **`city-tactical-analyst`** agent.
3. Test tool executions by asking:
   > *"We are playing Arsenal this weekend. Check if Haaland and De Bruyne are available, scout Arsenal's weaknesses, and suggest our lineup tactics."*
4. Click the **Memory** tab on the left sidebar to inspect live sessions, message history, and durable state.

---

### Option B: Test & Inspect Compaction via CLI

To verify that conversation history is compacted and stored in PostgreSQL without manually chatting in the UI:

1. **Run the automated 3-turn test:**
   ```bash
   pnpm exec tsx src/test-compaction.ts
   ```
2. **Inspect the compacted summary stored in PostgreSQL:**
   ```bash
   pnpm exec tsx src/show-compaction.ts
   ```
   *This reads `compactionState` from PostgreSQL and displays the generation number, compacted message count, and the synthesized tactical summary.*
