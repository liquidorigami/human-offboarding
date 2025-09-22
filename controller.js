console.log("Controller loaded");
let caseCount = 1;

// ─────────────────────────────────────────────────────────────
// Imports
// ─────────────────────────────────────────────────────────────
import { zodiacSign } from "./gamestate.js";
import { getStarterOpeningLineSet } from "./lines.js";
import { openingLineBank } from "./lines.js";
import { getStarterAccessorySet, getAccessorySelectionPool } from "./accessories.js";
import { formatAccessoryList, showAccessoryModal, hideAccessoryModal, getSelectedAccessories } from "./ui.js";

// ─────────────────────────────────────────────────────────────
// DOM Helpers (inline for now)
// ─────────────────────────────────────────────────────────────
function showMainScreen() {
  document.getElementById("main-screen").style.display = "block";
}

function hideIntroScreen() {
  document.getElementById("intro-screen").style.display = "none";
}

// ─────────────────────────────────────────────────────────────
// Ready Button Logic
// ─────────────────────────────────────────────────────────────
document.getElementById("ready-btn")?.addEventListener("click", () => {
  const select = document.getElementById("zodiac-select");
  const selected = select.value;

  if (!selected) {
    console.warn("No zodiac selected");
    return;
  }

  // Store zodiac sign
  zodiacSign = selected;

  // Transition to main screen
  hideIntroScreen();
  showMainScreen();

  // Initialize first case
  setupCase();
});

// ─────────────────────────────────────────────────────────────
// Case Setup
// ─────────────────────────────────────────────────────────────
function setupCase() {
  caseCount++;

  // Generate Human ID
  const humanNumber = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("human-number").textContent = humanNumber;

  // Populate Opening Lines
  const lines = getStarterOpeningLineSet(1); // caseCount = 1
  const lineList = document.getElementById("opening-line-options");
  lineList.innerHTML = "";
  lines.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line.line;
    li.classList.add("option");
    lineList.appendChild(li);
  });

  // Populate Accessories
  const accessories = getStarterAccessorySet(1);
  const accessoryList = document.getElementById("accessory-options");
  accessoryList.innerHTML = "";
  formatAccessoryList(accessories).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("option");
    accessoryList.appendChild(li);
  });

  // Accessory selection
    const caseCount = 1; // Replace with actual case tracking

  if (caseCount % 5 === 0) {
    const pool = getAccessorySelectionPool();
    showAccessoryModal(pool);
  } else {
    const accessories = getStarterAccessorySet(caseCount);
    renderAccessories(accessories);
  }
}

function renderAccessories(accessories) {
  const accessoryList = document.getElementById("accessory-options");
  accessoryList.innerHTML = "";
  accessories.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("option");
    accessoryList.appendChild(li);
  });

}
