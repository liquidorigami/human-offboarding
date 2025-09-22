// Shuffle an array
export function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Pick a random item
export function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Sort accessories alphabetically by item name
export function sortAccessoriesAlphabetically(accessories) {
  return [...accessories].sort((a, b) => a.item.localeCompare(b.item));
}

// Count tone frequency from an array of { tone } objects
export function getTopTone(accessoryHistory) {
  const counts = accessoryHistory.reduce((acc, a) => {
    acc[a.tone] = (acc[a.tone] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "EH";
}
