// Player identity
export let zodiacSign = null;

// Case tracking
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
