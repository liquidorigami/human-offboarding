import {
  getZodiacSign,
  getCaseCount,
  recordSelections,
  currentLine,
  currentAccessory,
  getMostUsedTone,
  getTopToneFromHistory
} from "./gamestate.js";

import {
  getZodiacFromHumanID,
  getToneScore,
  applyPenalty,
  scoreToStars,
  zodiacCompatibility
} from "./reactions.js";

import { shuffle, pickRandom } from "./util.js";

// Internal state
let massOffboardUses = 0;
let lastMassOffboardRound = 0;

// Reaction tracking
const reactionLog = {};
const reactionToneMap = {
  PRO: ["nods silently", "accepts with grace", "smiles faintly"],
  EH: ["shrugs", "looks away", "sighs"],
  AWK: ["fidgets", "avoids eye contact", "mumbles something"],
  LOL: ["laughs nervously", "cracks a joke", "snorts"],
  DAF: ["walks out", "rolls eyes", "deletes badge"]
};

// Check if mass offboard is allowed
export function canMassOffboard() {
  const totalRows = getCaseCount() - 1;
  const cooldown = totalRows - lastMassOffboardRound;
  return totalRows >= 8 && cooldown >= 4 && massOffboardUses < 2;
}

// Trigger mass offboard
export function triggerMassOffboard(addScoreRow) {
  if (!currentLine || !currentAccessory) return;

  const totalRows = getCaseCount() - 1;
  const playerZodiac = getZodiacSign();
  const lineTone = getMostUsedTone();
  const accessoryTone = getTopToneFromHistory();

  const volume = getMassVolume(totalRows);
  for (let i = 0; i < volume; i++) {
    const humanID = Math.floor(1000 + Math.random() * 9000);
    const humanZodiac = getZodiacFromHumanID(humanID);

    const lineScore = getToneScore(lineTone, humanZodiac);
    const accessoryScore = getToneScore(accessoryTone, humanZodiac);

    const penalizedLine = applyPenalty(lineScore, playerZodiac, humanZodiac);
    const penalizedAccessory = applyPenalty(accessoryScore, playerZodiac, humanZodiac);

    let total = penalizedLine + penalizedAccessory;

    // Sensitivity bonus if tone matches most favorable
    const sensitivity = zodiacCompatibility[humanZodiac]?.most;
    if (playerZodiac === sensitivity) {
      total += 1.5; // subtle bonus
    }

    const rating = scoreToStars(total);
    const reactionPool = reactionToneMap[lineTone] || ["Blank stare"];
    const reactionText = pickRandom(reactionPool);


    reactionLog[reactionText] = (reactionLog[reactionText] || 0) + 1;

    recordSelections({ line: currentLine, accessory: currentAccessory });
    addScoreRow(humanID, reactionText, rating);
  }

  massOffboardUses++;
  lastMassOffboardRound = getCaseCount() - 1;
}

// Dynamic volume logic
function getMassVolume(totalRows) {
  if (totalRows < 16) return randomRange(4, 9);
  if (totalRows < 22) return randomRange(6, 11);
  if (totalRows < 38) return randomRange(9, 17);
  return randomRange(5, 12);
}

// Random integer between min and max
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
