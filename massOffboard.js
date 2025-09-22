export function triggerMassOffboard({
  massOffboardUses,
  reactionBank,
  reactionLog,
  score,
  caseNumber,
  lastMassOffboardRound,
  selectedLine,
  selectedAccessory,
  hasDelivered,
  createHumanID,
  calculateToneScore,
  getZodiacSensitivity,
  toneMatchesSensitivity,
  renderLineOptions,
  renderAccessoryOptions,
  updateDOM
}) {
  console.log("Mass Offboard triggered");

  if (massOffboardUses >= 2) {
    console.warn("Mass Offboard blocked — usage limit reached");
    updateDOM("exhausted");
    return { massOffboardUses, score, caseNumber, lastMassOffboardRound };
  }

  const batchSize = 4;
  for (let i = 0; i < batchSize; i++) {
    const humanID = createHumanID();
    const selectedTone = "NEU";
    const toneScore = calculateToneScore(selectedTone);
    const accessoryBonus = 0;
    let total = toneScore + accessoryBonus;

    const sensitivity = getZodiacSensitivity(humanID);
    if (toneMatchesSensitivity(selectedTone, sensitivity)) {
      total += 2;
    }

    const maxPossible = toneScore + accessoryBonus + 2;
    const percentage = total / maxPossible;
    const stars = Math.round(percentage * 5);
    const starRating = "★".repeat(stars) + "☆".repeat(5 - stars);

    const reactionPool = reactionBank[selectedTone] || [];
    const reactionText = reactionPool[Math.floor(Math.random() * reactionPool.length)] || "Blank stare";
    reactionLog[reactionText] = (reactionLog[reactionText] || 0) + 1;

    score += total;
    caseNumber += 1;

    updateDOM("row", { humanID, reactionText, starRating });
  }

  massOffboardUses += 1;
  lastMassOffboardRound = caseNumber;

  updateDOM("score", { caseNumber, score });
  selectedLine = null;
  selectedAccessory = null;
  hasDelivered = false;

  renderLineOptions();
  renderAccessoryOptions();
  updateDOM("resetOptions");

  if (massOffboardUses >= 2) {
    updateDOM("exhausted");
  }

  return { massOffboardUses, score, caseNumber, lastMassOffboardRound };
}
