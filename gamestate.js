console.log("gamestate.js loaded");

// Player Zodiac
let zodiacSign = null;

export function setZodiacSign(sign) {
  zodiacSign = sign;
}

export function getZodiacSign() {
  return zodiacSign;
}

// Case Progression
let caseCount = 1;

export function incrementCaseCount() {
  caseCount++;
}

export function getCaseCount() {
  return caseCount;
}

// Tone Usage
let toneUsage = {
  PRO: 0,
  EH: 0,
  AWK: 0,
  LOL: 0,
  DAF: 0
};

export function recordTone(tone) {
  if (toneUsage[tone] !== undefined) {
    toneUsage[tone]++;
  }
}

export function getMostUsedTone() {
  const sorted = Object.entries(toneUsage).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "EH";
}

// Selection History
export let selectedOpeningLines = [];
export let selectedAccessories = [];

export function recordSelections({ line, accessory }) {
  selectedOpeningLines.push(line);
  selectedAccessories.push(accessory);
}

// Current Selections
export let currentLine = null;
export let currentAccessory = null;

export function setCurrentLine(line) {
  currentLine = line;
}

export function setCurrentAccessory(accessory) {
  currentAccessory = accessory;
}

export function clearCurrentSelections() {
  currentLine = null;
  currentAccessory = null;
}

// Top Tone from History
import { getTopTone } from "./util.js";

export function getTopToneFromHistory() {
  return getTopTone(selectedAccessories);
}

//reset game
export function resetGameState() {
  zodiacSign = null;
  caseCount = 1;
  toneUsage = { PRO: 0, EH: 0, AWK: 0, LOL: 0, DAF: 0 };
  selectedOpeningLines = [];
  selectedAccessories = [];
  clearCurrentSelections();
}

//debug maybe
export function getCurrentSelections() {
  return {
    line: currentLine,
    accessory: currentAccessory
  };
}
