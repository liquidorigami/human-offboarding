export const accessoryBank = [
  // PRO — Professional
{ item: "tissue box", tone: "PRO" },
{ item: "cup of tea", tone: "PRO" },
{ item: "stress ball", tone: "PRO" },
{ item: "HR pamphlet", tone: "PRO" },
{ item: "sympathy pen", tone: "PRO" },
{ item: "folded note", tone: "PRO" },
{ item: "company water bottle", tone: "PRO" },
{ item: "soft mint", tone: "PRO" },
  // AWK — Awkward
{ item: "greeting card", tone: "AWK" },
{ item: "old calendar", tone: "AWK" },
{ item: "event tote bag", tone: "AWK" },
{ item: "novelty mug", tone: "AWK" },
{ item: "single sock", tone: "AWK" },
{ item: "half-deflated ball", tone: "AWK" },
{ item: "‘You tried’ sticker", tone: "AWK" },
{ item: "holiday ornament", tone: "AWK" },
  // DAF — Direct
{ item: "rock", tone: "DAF" },
{ item: "blank sticky note", tone: "DAF" },
{ item: "‘Not a metaphor’", tone: "DAF" },
{ item: "‘Seen’ stamp", tone: "DAF" },
{ item: "marker with no cap", tone: "DAF" },
{ item: "folder labeled ‘Nothing’", tone: "DAF" },
{ item: "receipt for nothing", tone: "DAF" },
{ item: "leadless pencil", tone: "DAF" },
  // LOL — Funny
{ item: "balloon", tone: "LOL" },
{ item: "lottery scratcher", tone: "LOL" },
{ item: "photo frame", tone: "LOL" },
{ item: "‘Best Exit’ award", tone: "LOL" },
{ item: "rubber chicken", tone: "LOL" },
{ item: "‘Oops!’ plaque", tone: "LOL" },
{ item: "tiny trophy", tone: "LOL" },
{ item: "‘Bye Felicia’ mug", tone: "LOL" },
  // EH — Neutral
{ item: "stapler", tone: "EH" },
{ item: "blank envelope", tone: "EH" },
{ item: "desk plant", tone: "EH" },
{ item: "whiteboard marker", tone: "EH" },
{ item: "badge lanyard", tone: "EH" },
{ item: "paperclip chain", tone: "EH" },
{ item: "system alert", tone: "EH" },
{ item: "office chair", tone: "EH" },
];

import { getZodiacSign } from "./gamestate.js";
import { zodiacToneMap } from "./lines.js";

export const accessoryBank = [
  { item: "Clipboard", tone: "PRO" },
  { item: "Succulent", tone: "PRO" },
  { item: "Farewell card", tone: "NEU" },
  { item: "USB stick", tone: "NEU" },
  { item: "Security escort", tone: "WILD" },
  // Add full list here
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getStarterAccessorySet(caseCount) {
  const sign = getZodiacSign();
  const preferredTones = zodiacToneMap[sign] || ["EH"];

  const filtered = accessoryBank.filter(a =>
    preferredTones.includes(a.tone)
  );

  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(a => a.item);
}

export function getAccessorySelectionPool() {
  const shuffled = [...accessoryBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 7).map(a => a.item);
}


