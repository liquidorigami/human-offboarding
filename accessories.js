export const accessoryBank = [

{ item: "tissue box", tone: "PRO" },
{ item: "cup of tea", tone: "PRO" },
{ item: "stress ball", tone: "PRO" },
{ item: "HR pamphlet", tone: "PRO" },
{ item: "sympathy pen", tone: "PRO" },
{ item: "folded note", tone: "PRO" },
{ item: "company water bottle", tone: "PRO" },
{ item: "soft mint", tone: "PRO" },
{ item: "clipboard", tone: "PRO" },
{ item: "succulent", tone: "PRO" },

{ item: "greeting card", tone: "AWK" },
{ item: "old calendar", tone: "AWK" },
{ item: "event tote bag", tone: "AWK" },
{ item: "novelty mug", tone: "AWK" },
{ item: "single sock", tone: "AWK" },
{ item: "half-deflated ball", tone: "AWK" },
{ item: "‘You tried’ sticker", tone: "AWK" },
{ item: "holiday ornament", tone: "AWK" },
{ item: "light bulb", tone: "AWK" },

{ item: "rock", tone: "DAF" },
{ item: "blank sticky note", tone: "DAF" },
{ item: "‘Not a metaphor’", tone: "DAF" },
{ item: "‘Seen’ stamp", tone: "DAF" },
{ item: "marker with no cap", tone: "DAF" },
{ item: "folder labeled ‘Nothing’", tone: "DAF" },
{ item: "receipt for nothing", tone: "DAF" },
{ item: "leadless pencil", tone: "DAF" },
{ item: "security escort", tone: "DAF" },
  
{ item: "balloon", tone: "LOL" },
{ item: "lottery scratcher", tone: "LOL" },
{ item: "photo frame", tone: "LOL" },
{ item: "‘Best Exit’ award", tone: "LOL" },
{ item: "rubber chicken", tone: "LOL" },
{ item: "‘Oops!’ plaque", tone: "LOL" },
{ item: "tiny trophy", tone: "LOL" },
{ item: "‘Bye Felicia’ mug", tone: "LOL" },

{ item: "stapler", tone: "EH" },
{ item: "blank envelope", tone: "EH" },
{ item: "desk plant", tone: "EH" },
{ item: "whiteboard marker", tone: "EH" },
{ item: "badge lanyard", tone: "EH" },
{ item: "paperclip chain", tone: "EH" },
{ item: "system alert", tone: "EH" },
{ item: "office chair", tone: "EH" },
{ item: "farewell card", tone: "EH" },
];

import { getZodiacSign } from "./gamestate.js";
import { zodiacToneMap } from "./lines.js";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getStarterAccessorySet(caseCount) {
  const pro = accessoryBank.filter(a => a.tone === "PRO");
  const eh = accessoryBank.filter(a => a.tone === "EH");
  const any = accessoryBank.filter(a =>
    ["AWK", "LOL", "DAF", "PRO", "EH"].includes(a.tone)
  );

  const selected = [
    pickRandom(pro),
    pickRandom(eh),
    pickRandom(any)
  ];

  return selected.map(a => a.item);
}

export function getAccessorySelectionPool() {
  const shuffled = [...accessoryBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 7).map(a => a.item);
}



