import { createTool } from "@anvia/core";
import { z } from "zod";

// Tool 1: Check player fitness and medical status
export const checkPlayerAvailability = createTool({
  name: "checkPlayerAvailability",
  description: "Check match fitness, injury status, recovery percentage, and playing restrictions for a Manchester City player.",
  inputSchema: z.object({
    playerName: z.string().describe("The name of the Manchester City player (e.g. 'Erling Haaland', 'Kevin De Bruyne', 'Rodri', 'Phil Foden')"),
  }),
  execute: async ({ playerName }) => {
    const database: Record<string, any> = {
      "erling haaland": { status: "Available", fitness: "100%", minutesLimit: 90, medicalNotes: "Fully fit, completed full training session." },
      "kevin de bruyne": { status: "Doubtful", fitness: "75%", minutesLimit: 30, medicalNotes: "Recovering from minor hamstring fatigue. Recommended as a second-half substitute." },
      "rodri": { status: "Available", fitness: "95%", minutesLimit: 90, medicalNotes: "Match fit, no physical issues detected." },
      "phil foden": { status: "Available", fitness: "100%", minutesLimit: 90, medicalNotes: "High stamina metrics in latest session." },
    };

    const key = playerName.toLowerCase();
    const result = database[key] || {
      status: "Available",
      fitness: "90%",
      minutesLimit: 90,
      medicalNotes: "Standard matchday clearance.",
    };

    return { player: playerName, ...result };
  },
});

// Tool 2: Generate scouting report on the opponent
export const generateOpponentReport = createTool({
  name: "generateOpponentReport",
  description: "Generates an in-depth tactical scouting report for an opponent team, detailing formation, pressing style, key threats, and vulnerabilities.",
  inputSchema: z.object({
    opponentName: z.string().describe("The name of the opponent club (e.g. 'Arsenal', 'Real Madrid', 'Liverpool')"),
  }),
  execute: async ({ opponentName }) => {
    const reports: Record<string, any> = {
      arsenal: {
        formation: "4-3-3 / 4-4-2 mid-block out of possession",
        pressingIntensity: "High in opening 20 minutes, transitions to compact zonal mid-block",
        keyThreat: "Bukayo Saka on the right wing and Martin Ødegaard in right half-space",
        vulnerabilities: "Space left behind aggressive fullbacks when transitioning from attack to defense. Susceptible to quick switches of play.",
      },
      "real madrid": {
        formation: "4-3-1-2 diamond or asymmetrical 4-3-3",
        pressingIntensity: "Mid-to-low block, extremely dangerous vertical transitional threat",
        keyThreat: "Vinícius Júnior and Kylian Mbappé exploiting channels behind high defensive lines",
        vulnerabilities: "Leaves center midfield underloaded during sustained opponent possession spells.",
      },
    };

    const key = opponentName.toLowerCase();
    return (
      reports[key] || {
        formation: "4-4-2 compact low block",
        pressingIntensity: "Low block, direct counter-attacks",
        keyThreat: "Direct long balls to target striker",
        vulnerabilities: "Struggles defending half-spaces and overloaded central midfield.",
      }
    );
  },
});

// Tool 3: Recommend Pep-style tactical lineup
export const recommendLineupTactics = createTool({
  name: "recommendLineupTactics",
  description: "Recommends tactical setups and formations for Manchester City to counter opponent weaknesses while factoring in player availability.",
  inputSchema: z.object({
    opponent: z.string().describe("The opponent to face"),
    tacticalApproach: z.enum(["possession-control", "high-press-overload", "counter-control"]).describe("Desired tactical strategy"),
  }),
  execute: async ({ opponent, tacticalApproach }) => {
    return {
      opponent,
      recommendedFormation: "3-2-4-1 (Inverted Full-back / Box Midfield)",
      setup: {
        defense: "Three center-backs with Josko Gvardiol stepping into midfield when building up.",
        midfieldBox: "Rodri paired with John Stones as double pivot to control transitions.",
        attackingAttackingMidfielders: "Two attacking 8s exploiting half-spaces behind the opponent's midfield line.",
        striker: "Erling Haaland pinning center-backs to create space for cut-backs.",
      },
      tacticalDirectives: [
        `Implement ${tacticalApproach} principles to monopolize the central midfield corridor.`,
        "Utilize third-man runs to exploit the opponent's full-backs when they step out.",
        "Maintain 5-second counter-pressing rule immediately upon turnover.",
      ],
    };
  },
});
