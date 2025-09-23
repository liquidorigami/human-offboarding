// Clamp a value between min and max
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// Convert 4-digit ID to valid MMDD
export function convertIDToDate(id) {
  const raw = String(id).padStart(4, "0");
  const mm = clamp(parseInt(raw.slice(0, 2), 10), 1, 12);
  const dd = clamp(parseInt(raw.slice(2), 10), 1, 31);

  const maxDays = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
    7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
  };

  const day = Math.min(dd, maxDays[mm]);
  return `${String(mm).padStart(2, "0")}${String(day).padStart(2, "0")}`;
}

// Map MMDD to zodiac sign
export function lookupZodiac(mmdd) {
  const date = parseInt(mmdd, 10);

  if (date >= 321 && date <= 419) return "Aries";
  if (date >= 420 && date <= 520) return "Taurus";
  if (date >= 521 && date <= 620) return "Gemini";
  if (date >= 621 && date <= 722) return "Cancer";
  if (date >= 723 && date <= 822) return "Leo";
  if (date >= 823 && date <= 922) return "Virgo";
  if (date >= 923 && date <= 1022) return "Libra";
  if (date >= 1023 && date <= 1121) return "Scorpio";
  if (date >= 1122 && date <= 1221) return "Sagittarius";
  if (date >= 1222 || date <= 119) return "Capricorn";
  if (date >= 120 && date <= 218) return "Aquarius";
  if (date >= 219 && date <= 320) return "Pisces";

  return "EH";
}

// Shuffle an array
export function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Pick a random item
export function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Get most frequent tone from a list
export function getTopTone(list) {
  const count = {};
  list.forEach(t => {
    count[t] = (count[t] || 0) + 1;
  });

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "EH";
}
