import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { PrismaMemoryStore } from '@anvia/memory-prisma/v8';
import type { Contract } from './contract.js';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

export const memory = new PrismaMemoryStore({
  client: db,
});

await memory.validate();
