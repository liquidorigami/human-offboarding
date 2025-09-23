console.log("Controller loaded");

// Error display
function showError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = "block";
  setTimeout(() => {
    el.style.display = "none";
  }, 1500);
}

// Imports
import {
  setZodiacSign,
  currentLine,
  currentAccessory,
  incrementCaseCount,
  getCaseCount,
  recordSelections,
  recordTone
} from "./gamestate.js";
import { getRefreshedOpeningLineSet, getStarterOpeningLineSet } from "./lines.js";
import { getStarterAccessorySet, getAccessorySelectionPool } from "./accessories.js";
import {
  formatAccessoryList,
  showAccessoryModal,
  hideAccessoryModal,
  getSelectedAccessories
} from "./ui.js";

// DOM Helpers
function showMainScreen() {
  document.getElementById("main-screen").style.display = "block";
}

function hideIntroScreen() {
  document.getElementById("intro-screen").style.display = "none";
}

// Ready Button Logic
document.getElementById("ready-btn")?.addEventListener("click", () => {
  const select = document.getElementById("zodiac-select");
  const selected = select.value;

  if (!selected) {
    console.warn("No zodiac selected");
    return;
  }

  setZodiacSign(selected);
  hideIntroScreen();
  showMainScreen();
  setupCase();
});

// Case Setup
function setupCase() {
  incrementCaseCount();
  const currentCase = getCaseCount();

  const humanNumber = Math.floor(1000 + Math.random() * 9000);
  const humanEl = document.getElementById("human-number");
  if (humanEl) humanEl.textContent = humanNumber;

  const lines = getStarterOpeningLineSet(currentCase);
  renderLines(lines);

  if (currentCase % 5 === 0) {
    const pool = getAccessorySelectionPool();
    showAccessoryModal(pool);
  } else {
    const accessories = getStarterAccessorySet(currentCase);
    renderAccessories(formatAccessoryList(accessories));
  }

  updateSidebar(currentCase);
}

// Rendering
function renderLines(lines) {
  const lineList = document.getElementById("opening-line-options");
  lineList.innerHTML = "";
  lines.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line.line;
    li.classList.add("option");
    li.addEventListener("click", () => {
      document.querySelectorAll("#opening-line-options li").forEach(el =>
        el.classList.remove("selected")
      );
      li.classList.add("selected");
      currentLine = line.line;
      recordTone(line.tone);
    });
    lineList.appendChild(li);
  });
}

function renderAccessories(accessories) {
  const accessoryList = document.getElementById("accessory-options");
  accessoryList.innerHTML = "";
  accessories.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("option");
    li.addEventListener("click", () => {
      document.querySelectorAll("#accessory-options li").forEach(el =>
        el.classList.remove("selected")
      );
      li.classList.add("selected");
      currentAccessory = item;
    });
    accessoryList.appendChild(li);
  });
}

// Buttons
document.getElementById("refresh-btn").addEventListener("click", () => {
  const caseCount = getCaseCount();
  if (caseCount < 5) return showError("error-refresh");

  const lines = getRefreshedOpeningLineSet(caseCount);
  renderLines(lines);
});

document.getElementById("change-btn").addEventListener("click", () => {
  const caseCount = getCaseCount();
  if (caseCount < 5) return showError("error-change");

  const accessories = getStarterAccessorySet(caseCount);
  renderAccessories(formatAccessoryList(accessories));
});

document.getElementById("offboard-btn").addEventListener("click", () => {
  if (!currentLine || !currentAccessory) {
    return showError("error-offboard");
  }

  const caseCount = getCaseCount();
  const humanID = document.getElementById("human-number").textContent;

  // Placeholder logic — you can replace with actual reaction/rating logic later
  const reaction = "Neutral";
  const rating = "★★★";

  recordSelections({ line: currentLine, accessory: currentAccessory });
  addScoreRow(humanID, reaction, rating);
  setupCase();
});


// Sidebar toggles
document.getElementById("progress-toggle").addEventListener("click", () => {
  document.getElementById("progress-panel").classList.toggle("hidden");
});

document.getElementById("clockout-toggle").addEventListener("click", () => {
  document.getElementById("clockout-panel").classList.toggle("hidden");
});

document.getElementById("cease-btn").addEventListener("click", () => {
  location.reload();
});

// Sidebar updates
function updateSidebar(caseCount, earned = 0) {
  document.getElementById("score-cases").textContent = caseCount;
  document.getElementById("score-earned").textContent = earned;
}

function addScoreRow(id, reaction, rating) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${id}</td>
    <td>${reaction}</td>
    <td>${rating}</td>
  `;
  document.getElementById("score-table-body").appendChild(row);
}

// MassOffboard logic
let massClicks = 0;

document.getElementById("mass-offboard-btn").addEventListener("click", () => {
  const caseCount = getCaseCount();
  if (caseCount < 8) return showError("error-mass");
  if (massClicks >= 2) return showError("error-exhausted");
  massClicks++;

  setupCase();
});
