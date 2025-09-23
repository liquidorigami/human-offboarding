import { getZodiacSign } from "./gamestate.js";
import { zodiacToneRank } from "./lines.js";
import { convertIDToDate, lookupZodiac } from "./util.js";

// Convert human ID to zodiac
export function getZodiacFromHumanID(id) {
  const mmdd = convertIDToDate(id);
  return lookupZodiac(mmdd);
}

// Score tone based on zodiac favorability
export function getToneScore(tone, zodiac) {
  const ranking = zodiacToneRank[zodiac];
  const index = ranking?.indexOf(tone);
  return index >= 0 ? 4 - index : 0;
}

// Apply 20% penalty if player zodiac is incompatible
export function applyPenalty(score, playerZodiac, humanZodiac) {
  const incompatible = zodiacCompatibility[playerZodiac]?.least;
  return humanZodiac === incompatible ? score * 0.8 : score;
}

// Convert numeric score to star rating
export function scoreToStars(score) {
  const percent = score / 10;
  if (percent >= 1.0) return "★★★★★";
  if (percent >= 0.8) return "★★★★☆";
  if (percent >= 0.6) return "★★★☆☆";
  if (percent >= 0.4) return "★★☆☆☆";
  if (percent >= 0.2) return "★☆☆☆☆";
  return "☆☆☆☆☆";
}

// Zodiac compatibility map
export const zodiacCompatibility = {
  Aries:      { most: "Leo",        least: "Capricorn" },
  Taurus:     { most: "Virgo",      least: "Sagittarius" },
  Gemini:     { most: "Aquarius",   least: "Scorpio" },
  Cancer:     { most: "Pisces",     least: "Gemini" },
  Leo:        { most: "Aries",      least: "Virgo" },
  Virgo:      { most: "Taurus",     least: "Leo" },
  Libra:      { most: "Gemini",     least: "Pisces" },
  Scorpio:    { most: "Cancer",     least: "Aquarius" },
  Sagittarius:{ most: "Aries",      least: "Taurus" },
  Capricorn:  { most: "Virgo",      least: "Aries" },
  Aquarius:   { most: "Gemini",     least: "Scorpio" },
  Pisces:     { most: "Cancer",     least: "Libra" }
};

// Reaction Bank
export const reactionBank = [ 
  
{ reaction: "files a report", tone: "PRO" },
{ reaction: "nods politely", tone: "PRO" },
{ reaction: "cleans glasses", tone: "PRO" },
{ reaction: "adjusts badge", tone: "PRO" },
{ reaction: "checks lipstick", tone: "PRO" },
{ reaction: "straightens posture", tone: "PRO" },
{ reaction: "hands over folder", tone: "PRO" },
{ reaction: "reviews checklist", tone: "PRO" },
{ reaction: "prints confirmation", tone: "PRO" },
{ reaction: "sniffles", tone: "PRO" },
{ reaction: "takes off glasses", tone: "PRO" },
{ reaction: "puts on glasses", tone: "PRO" },
{ reaction: "hands over pen", tone: "PRO" },
{ reaction: "checks calendar", tone: "PRO" },
{ reaction: "updates resume", tone: "PRO" },
{ reaction: "flags message", tone: "PRO" },
{ reaction: "starts documentation", tone: "PRO" },
{ reaction: "hands over pamphlet", tone: "PRO" },
{ reaction: "scrolls through policy", tone: "PRO" },
{ reaction: "hands over tissue", tone: "PRO" },
{ reaction: "checks inbox", tone: "PRO" },
{ reaction: "sighs quietly", tone: "PRO" },
{ reaction: "smooths shirt", tone: "PRO" },
{ reaction: "tightens ponytail", tone: "PRO" },
{ reaction: "opens spreadsheet", tone: "PRO" },
{ reaction: "packs desk", tone: "PRO" },
{ reaction: "thank you", tone: "PRO" },
{ reaction: "understood", tone: "PRO" },
{ reaction: "noted", tone: "PRO" },
{ reaction: "appreciated", tone: "PRO" },

{ reaction: "makes finger guns", tone: "AWK" },
{ reaction: "shuffles toward exit", tone: "AWK" },
{ reaction: "laughs too loud", tone: "AWK" },
{ reaction: "pushes a pull door", tone: "AWK" },
{ reaction: "waves at no one", tone: "AWK" },
{ reaction: "calls their mom", tone: "AWK" },
{ reaction: "drops their badge", tone: "AWK" },
{ reaction: "nods at the floor", tone: "AWK" },
{ reaction: "I'm still here?", tone: "AWK" },
{ reaction: "checks for cameras", tone: "AWK" },
{ reaction: "I guess?", tone: "AWK" },
{ reaction: "backs away slowly", tone: "AWK" },
{ reaction: "starts humming", tone: "AWK" },
{ reaction: "forgets what day it is", tone: "AWK" },
{ reaction: "offers a high five", tone: "AWK" },
{ reaction: "I didn’t read it", tone: "AWK" },
{ reaction: "mentions a weird dream", tone: "AWK" },
{ reaction: "tries to change subject", tone: "AWK" },
{ reaction: "I'm not crying", tone: "AWK" },
{ reaction: "leaves a doodle", tone: "AWK" },
{ reaction: "I’ll just go", tone: "AWK" },
{ reaction: "waves at the wall", tone: "AWK" },
{ reaction: "I brought snacks", tone: "AWK" },
{ reaction: "rubs their temples", tone: "AWK" },
{ reaction: "checks their shoes", tone: "AWK" },
{ reaction: "I'm not good at this", tone: "AWK" },
{ reaction: "adjusts a lanyard", tone: "AWK" },
{ reaction: "looks for a window", tone: "AWK" },
{ reaction: "I thought this was lunch", tone: "AWK" },
{ reaction: "sips from an empty cup", tone: "AWK" },

  // DAF — Direct
{ reaction: "walks out", tone: "DAF" },
{ reaction: "closes laptop", tone: "DAF" },
{ reaction: "packs up", tone: "DAF" },
{ reaction: "removes nameplate", tone: "DAF" },
{ reaction: "logs off", tone: "DAF" },
{ reaction: "drops badge", tone: "DAF" },
{ reaction: "stubs toe", tone: "DAF" },
{ reaction: "rolls eyes", tone: "DAF" },
{ reaction: "pinches nose bridge", tone: "DAF" },
{ reaction: "rests head in hands", tone: "DAF" },
{ reaction: "blinks slowly", tone: "DAF" },
{ reaction: "won’t leave", tone: "DAF" },
{ reaction: "hands over sticky note", tone: "DAF" },
{ reaction: "crosses arms", tone: "DAF" },
{ reaction: "checks time", tone: "DAF" },
{ reaction: "stares into distance", tone: "DAF" },
{ reaction: "rubs temple", tone: "DAF" },
{ reaction: "leaves mid-sentence", tone: "DAF" },
{ reaction: "opens drawer", tone: "DAF" },
{ reaction: "shuts drawer", tone: "DAF" },
{ reaction: "leans back slowly", tone: "DAF" },
{ reaction: "checks their shoes", tone: "DAF" },
{ reaction: "ok", tone: "DAF" },
{ reaction: "done", tone: "DAF" },
{ reaction: "whatever", tone: "DAF" },
{ reaction: "not my problem", tone: "DAF" },
{ reaction: "your call", tone: "DAF" },
{ reaction: "cool", tone: "DAF" },
{ reaction: "fine", tone: "DAF" },
{ reaction: "this again", tone: "DAF" },

{ reaction: "throws confetti", tone: "LOL" },
{ reaction: "offers a cookie", tone: "LOL" },
{ reaction: "starts dancing", tone: "LOL" },
{ reaction: "uploads a meme", tone: "LOL" },
{ reaction: "starts a podcast", tone: "LOL" },
{ reaction: "gives a sticker", tone: "LOL" },
{ reaction: "hands over a balloon", tone: "LOL" },
{ reaction: "I'm free now!", tone: "LOL" },
{ reaction: "starts a group chat", tone: "LOL" },
{ reaction: "I won, right?", tone: "LOL" },
{ reaction: "hums the anthem", tone: "LOL" },
{ reaction: "asks for a trophy", tone: "LOL" },
{ reaction: "I'm fabulous", tone: "LOL" },
{ reaction: "starts a farewell thread", tone: "LOL" },
{ reaction: "I'm taking the chair", tone: "LOL" },
{ reaction: "asks for cake", tone: "LOL" },
{ reaction: "I'm legendary", tone: "LOL" },
{ reaction: "laughs mid-sentence", tone: "LOL" },
{ reaction: "hands over a mug", tone: "LOL" },
{ reaction: "I'm retiring early", tone: "LOL" },
{ reaction: "starts a countdown", tone: "LOL" },
{ reaction: "I'm already gone", tone: "LOL" },
{ reaction: "hands out coupons", tone: "LOL" },
{ reaction: "I'm not mad", tone: "LOL" },
{ reaction: "draws a heart", tone: "LOL" },
{ reaction: "hands over a rubber duck", tone: "LOL" },
{ reaction: "I'm eligible for naps", tone: "LOL" },
{ reaction: "sticks a label on you", tone: "LOL" },
{ reaction: "I'm still fabulous", tone: "LOL" },
{ reaction: "hands over a tiny trophy", tone: "LOL" },

{ reaction: "shrugs", tone: "EH" },
{ reaction: "blinks", tone: "EH" },
{ reaction: "nods once", tone: "EH" },
{ reaction: "checks phone", tone: "EH" },
{ reaction: "leans back", tone: "EH" },
{ reaction: "scrolls aimlessly", tone: "EH" },
{ reaction: "bites nails", tone: "EH" },
{ reaction: "opens drawer", tone: "EH" },
{ reaction: "closes drawer", tone: "EH" },
{ reaction: "refreshes page", tone: "EH" },
{ reaction: "cleans glasses", tone: "EH" },
{ reaction: "checks nail polish", tone: "EH" },
{ reaction: "rereads message", tone: "EH" },
{ reaction: "stares at wall", tone: "EH" },
{ reaction: "checks weather", tone: "EH" },
{ reaction: "sips cold coffee", tone: "EH" },
{ reaction: "hiccups like a chipmunk", tone: "EH" },
{ reaction: "meh", tone: "EH" },
{ reaction: "ok", tone: "EH" },
{ reaction: "still here", tone: "EH" },
{ reaction: "fine", tone: "EH" },
{ reaction: "whatever", tone: "EH" },
{ reaction: "figures", tone: "EH" },
{ reaction: "guess so", tone: "EH" },
{ reaction: "makes sense", tone: "EH" },
{ reaction: "cool", tone: "EH" },
{ reaction: "alright", tone: "EH" },
{ reaction: "yep", tone: "EH" },
{ reaction: "nope", tone: "EH" },
{ reaction: "eh", tone: "EH" },
];
