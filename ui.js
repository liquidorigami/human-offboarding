// Format accessory list
export function formatAccessoryList(accessories) {
  return sortAccessoriesAlphabetically(accessories).map(a => a.item);
}
// Generate accessory modal every 5 cases
export function getModalTitle(caseCount) {
  return caseCount % 5 === 0
    ? "Choose Your Next Set"
    : "Your Current Set";
}
// Style tone labels for UI
export const toneLabels = {
  PRO: "Professional",
  AWK: "Awkward",
  DAF: "Direct",
  LOL: "Funny",
  EH:  "Neutral"
};
