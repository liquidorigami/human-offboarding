// ─────────────────────────────────────────────────────────────
// Imports (if needed)
// ─────────────────────────────────────────────────────────────
// Currently no imports required

// ─────────────────────────────────────────────────────────────
// Mass Offboard UI Updates
// ─────────────────────────────────────────────────────────────
export function disableMassOffboardButton() {
  const btn = document.getElementById("mass-offboard-btn");
  if (btn) btn.disabled = true;
}

export function showMassOffboardExhaustion() {
  const indicator = document.getElementById("mass-offboard-indicator");
  if (indicator) {
    indicator.textContent = "Mass Offboard exhausted";
    indicator.classList.remove("hidden");
  }
}

export function hideMassOffboardIndicator() {
  const indicator = document.getElementById("mass-offboard-indicator");
  if (indicator) indicator.classList.add("hidden");
}

// ─────────────────────────────────────────────────────────────
// Score and Progress Updates
// ─────────────────────────────────────────────────────────────
export function addScoreRow(humanID, reactionText, starRating) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${humanID}</td><td>${reactionText}</td><td>${starRating}</td>`;
  document.getElementById("score-rows")?.appendChild(row);
}

export function updateCaseCount(caseNumber) {
  const caseEl = document.getElementById("case-count");
  if (caseEl) caseEl.textContent = caseNumber;
}

export function updateTotalScore(score) {
  const scoreEl = document.getElementById("total-score");
  if (scoreEl) scoreEl.textContent = `Total Score: ${score}`;
}

export function updateCertProgress(caseNumber) {
  const certEl = document.getElementById("cert-progress");
  if (certEl) certEl.textContent = `${Math.min(caseNumber, 15)}/15`;
}

// ─────────────────────────────────────────────────────────────
// Option Highlighting
// ─────────────────────────────────────────────────────────────
export function resetOptionHighlights() {
  document.querySelectorAll(".option").forEach(opt =>
    opt.classList.remove("selected", "locked")
  );
}

export function highlightSelection(el) {
  resetOptionHighlights();
  el.classList.add("selected");
}

// ─────────────────────────────────────────────────────────────
// Screen Visibility
// ─────────────────────────────────────────────────────────────
export function showMainScreen() {
  document.getElementById("main-screen").style.display = "block";
}

export function hideIntroScreen() {
  document.getElementById("intro-screen").style.display = "none";
}

// ─────────────────────────────────────────────────────────────
// Error Messaging
// ─────────────────────────────────────────────────────────────
export function showTemporaryError(id, message, duration = 1000) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.classList.remove("hidden");
    setTimeout(() => el.classList.add("hidden"), duration);
  }
}
