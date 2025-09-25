import {
  setZodiacSign,
  getZodiacSign,
  incrementCaseCount,
  getCaseCount,
  recordSelections,
  recordTone,
  setCurrentLine,
  setCurrentAccessory,
  currentLine,
  currentAccessory,
  clearCurrentSelections
} from "./gamestate.js";

import { getStarterOpeningLineSet, getRefreshedOpeningLineSet } from "./lines.js";
import { getStarterAccessorySet,
  canChangeAccessories,
  recordAccessoryChangeRound,
  getAccessorySelectionPool } from "./accessories.js";
import {
  formatAccessoryList,
  showAccessoryModal,
  hideAccessoryModal,
  getSelectedAccessories
} from "./ui.js";

import {
  getZodiacFromHumanID,
  getToneScore,
  applyPenalty,
  scoreToStars,
  calculateFinalScore,
  getReactionLabel
} from "./reactions.js";

import { canMassOffboard, triggerMassOffboard } from "./massOffboard.js";

// Error display
function showErrorMessage(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.style.display = "block";
  setTimeout(() => {
    el.style.display = "none";
    el.textContent = "";
  }, 1500);
}


// Screen toggles
function showMainScreen() {
  document.getElementById("main-screen").style.display = "block";
}

function hideIntroScreen() {
  document.getElementById("intro-screen").style.display = "none";
}

// Case setup
function setupCase() {
  incrementCaseCount();
  clearCurrentSelections();

  const currentCase = getCaseCount();
  const humanNumber = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("human-number").textContent = humanNumber;

  const lines = getStarterOpeningLineSet(currentCase);
  renderLines(lines);

  const accessories = getStarterAccessorySet(currentCase);
  renderAccessories(formatAccessoryList(accessories));

  updateSidebar(currentCase);
}

// Line rendering
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
      setCurrentLine(line.line);
      recordTone(line.tone);
    });
    lineList.appendChild(li);
  });
}

// Accessory rendering
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
      setCurrentAccessory(item);
    });
    accessoryList.appendChild(li);
  });
}

// Score table
function addScoreRow(id, reaction, rating) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${id}</td>
    <td>${reaction}</td>
    <td>${rating}</td>
  `;
  document.getElementById("score-table-body").appendChild(row);
}

function updateSidebar(caseCount, earned = 0) {
  document.getElementById("score-cases").textContent = caseCount;
  document.getElementById("score-earned").textContent = earned;
}

// Ready button
document.getElementById("ready-btn")?.addEventListener("click", () => {
  const select = document.getElementById("zodiac-select");
  const selected = select.value;
  if (!selected) return console.warn("No zodiac selected");

  setZodiacSign(selected);
  hideIntroScreen();
  showMainScreen();
  setupCase();
});

// Refresh button
document.getElementById("refresh-btn").addEventListener("click", () => {
  const caseCount = getCaseCount();
  if (caseCount < 5) return showErrorMessage("error-refresh", "Refresh available after 5 cases");

  const lines = getRefreshedOpeningLineSet(caseCount);
  renderLines(lines);
});

// Change button
document.getElementById("change-btn").addEventListener("click", () => {
  const caseCount = getCaseCount();
  if (caseCount < 5) return showErrorMessage("error-change", "Change available after 5 cases");

  const pool = getAccessorySelectionPool();
  showAccessoryModal(pool);
});

// Confirm modal
document.getElementById("confirm-modal").addEventListener("click", () => {
  const selected = getSelectedAccessories();
  if (selected.length === 3) {
    hideAccessoryModal();
    renderAccessories(selected);
    recordSelections({ accessory: selected });
  } else {
    alert("Please select exactly 3 accessories.");
  }
});

// Cancel modal
document.getElementById("cancel-modal").addEventListener("click", () => {
  hideAccessoryModal();
});

// OFFBOARD button
document.getElementById("offboard-btn").addEventListener("click", () => {
  if (!currentLine || !currentAccessory) {
    return showErrorMessage("error-offboard", "Please select both an opening line, and an accessory");
  }

  const caseCount = getCaseCount();
  const humanID = document.getElementById("human-number").textContent;
  const playerZodiac = getZodiacSign();

  const selectedLine = {
    line: currentLine,
    tone: getMostUsedTone()
  };

  const scoreData = calculateFinalScore(selectedLine, playerZodiac, humanID);
  const reaction = getReactionLabel(scoreData.tone);

  recordSelections({ line: currentLine, accessory: currentAccessory });
  addScoreRow(humanID, reaction, scoreData.stars);
  updateSidebar(caseCount, scoreData.score);
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
// mass offboard
document.getElementById("massoffboard-btn").addEventListener("click", () => {
  if (!canMassOffboard()) {
    return showErrorMessage("error-offboard", "Available after 8 cases");
  }

  triggerMassOffboard(addScoreRow);
  setupCase(); 
}); 
