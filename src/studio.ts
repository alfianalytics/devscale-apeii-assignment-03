import { Studio } from "@anvia/studio";
import { cityAnalyst } from "./agent.js";

new Studio([cityAnalyst]).start();
