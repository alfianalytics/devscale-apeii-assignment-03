# Assignment 03: Build a Simple Agent

> **AI Product Engineering with TypeScript Batch II**  
> *Third Assignment*

---

## 🎯 Objective

Submit an agent that runs in **Anvia Studio**, uses its **tools**, and keeps **compacted conversation history in Prisma**.

---

## 📋 Requirements & Steps

### 1. Create a Simple Agent
- Initialize an agent using `@anvia/core`.
- Configure instructions and attach an LLM completion model (e.g. via `@anvia/openai` connecting to the Devscale Gateway or direct provider).

### 2. Give the Agent at least Three Related Tools
- Implement a cohesive set of at least **3 tools** designed around a single domain or use case (e.g., weather/travel tools, project management/issue tracker tools, calculator/financial tools, etc.).
- Ensure parameters and schemas are typed and validated using Zod.

### 3. Bind the Agent to Studio
- Register the agent with `@anvia/studio`.
- Start the Studio web server so conversations, tool executions, and sessions can be interacted with and inspected through the UI.

### 4. Use Prisma Memory with Compaction Enabled
- Connect a Prisma-backed session memory store using `@anvia/memory-prisma`.
- Ensure the Prisma schema includes the required models (including `compactionState`).
- Enable conversation memory compaction so the store projects the latest checkpoint summary plus the unsummarized tail for model context.

---

## 📚 References & Sources
- Anvia · Studio sessions
- Anvia · Prisma memory
- Anvia · Compaction
