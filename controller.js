console.log("Controller loaded");

// ─────────────────────────────────────────────────────────────
// Imports
// ─────────────────────────────────────────────────────────────
import { zodiacSign } from "./gamestate.js";
import { getStarterOpeningLineSet } from "./lines.js";
import { getStarterAccessorySet } from "./accessories.js";
import { formatAccessoryList } from "./ui.js";

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
}
