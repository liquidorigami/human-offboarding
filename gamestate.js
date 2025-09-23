console.log("gamestate.js loaded");
console.log("setZodiacSign:", typeof setZodiacSign);

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
  return sorted[0][0]; // returns tone string
}
let zodiacSign = null;

export function setZodiacSign(sign) {
  zodiacSign = sign;
}

export function getZodiacSign() {
  return zodiacSign;
}

let caseCount = 1;
export function incrementCaseCount() {
  caseCount++;
}
export function getCaseCount() {
  return caseCount;
}

// Selections per case
export let selectedOpeningLines = [];
export let selectedAccessories = [];

export function recordSelections({ line, accessory }) {
  selectedOpeningLines.push(line);
  selectedAccessories.push(accessory);
  
}

// Current selections (for enabling OFFBOARD)
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

// Top tone logic (for unlock pools)
import { getTopTone } from "./util.js";

export function getTopToneFromHistory() {
  return getTopTone(selectedAccessories);
}
