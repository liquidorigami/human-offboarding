console.log("lines.js loaded");

export const openingLineBank = [
  // PRO — Professional
{ line: "The team has reviewed your assignment.", tone: "PRO" },
{ line: "This update reflects departmental priorities.", tone: "PRO" },
{ line: "We appreciate your time with the company.", tone: "PRO" },
{ line: "The budget no longer supports this role.", tone: "PRO" },
{ line: "This decision aligns with company strategy.", tone: "PRO" },
{ line: "The department is moving in a new direction.", tone: "PRO" },
{ line: "We’ve completed your transition paperwork.", tone: "PRO" },
{ line: "The company thanks you for your service.", tone: "PRO" },
{ line: "This change was approved at the team level.", tone: "PRO" },
{ line: "We’ve updated your status internally.", tone: "PRO" },


  // AWK — Awkward
{ line: "So… this is happening.", tone: "AWK" },
{ line: "I didn’t write this.", tone: "AWK" },
{ line: "This is kind of a surprise.", tone: "AWK" },
{ line: "I’m just the messenger.", tone: "AWK" },
{ line: "This isn’t easy to say.", tone: "AWK" },
{ line: "I’m not sure what this means.", tone: "AWK" },
{ line: "This is… not ideal.", tone: "AWK" },
{ line: "I didn’t expect this either.", tone: "AWK" },
{ line: "This might feel abrupt.", tone: "AWK" },
{ line: "I’m supposed to say something.", tone: "AWK" },
{ line: "I guess I’ll start here.", tone: "AWK" },
{ line: "This is a little weird.", tone: "AWK" },
{ line: "I didn’t rehearse this.", tone: "AWK" },
{ line: "This is not a prank.", tone: "AWK" },
{ line: "I’m still figuring this out.", tone: "AWK" },
{ line: "I wasn’t trained for this.", tone: "AWK" },
{ line: "This is new for me too.", tone: "AWK" },
{ line: "I’m not great at this.", tone: "AWK" },
{ line: "This is happening, I think.", tone: "AWK" },
{ line: "I didn’t see this coming.", tone: "AWK" },
{ line: "I’m not sure what to say.", tone: "AWK" },
{ line: "This is a surprise to me.", tone: "AWK" },
{ line: "I’m just reading the message.", tone: "AWK" },
{ line: "I didn’t expect to be here.", tone: "AWK" },
{ line: "This is awkward, right?", tone: "AWK" },
{ line: "I’m not crying, you are.", tone: "AWK" },
{ line: "I brought snacks, I guess.", tone: "AWK" },
{ line: "I thought this was lunch.", tone: "AWK" },
{ line: "I’m not good at this.", tone: "AWK" },
{ line: "I’ll just go now.", tone: "AWK" },

  // DAF — Direct
{ line: "This isn’t my decision.", tone: "DAF" },
{ line: "I just have to say it.", tone: "DAF" },
{ line: "You already know what this is.", tone: "DAF" },
{ line: "I’m not here to explain it.", tone: "DAF" },
{ line: "This is your update. Not mine.", tone: "DAF" },
{ line: "I’m just here to confirm it.", tone: "DAF" },
{ line: "You’ll figure it out.", tone: "DAF" },
{ line: "I’m not staying for questions.", tone: "DAF" },
{ line: "This is happening. That’s all.", tone: "DAF" },
{ line: "I’ve done my part. You do yours.", tone: "DAF" },

  // LOL — Funny
{ line: "You’ve been gently rotated out.", tone: "LOL" },
{ line: "Your desk is now a snack station.", tone: "LOL" },
{ line: "You’ve been reclassified as ‘legend.’", tone: "LOL" },
{ line: "Your badge now opens the vending machine.", tone: "LOL" },
{ line: "You’ve been promoted to free time.", tone: "LOL" },
{ line: "Your inbox is now a memory.", tone: "LOL" },
{ line: "You’ve been reassigned to the void.", tone: "LOL" },
{ line: "Your role has been absorbed by the ether.", tone: "LOL" },
{ line: "You’ve been gently nudged into history.", tone: "LOL" },
{ line: "You’re now eligible for naps.", tone: "LOL" },

  // EH — Neutral
{ line: "This kind of thing happens.", tone: "EH" },
{ line: "It’s just how things go sometimes.", tone: "EH" },
{ line: "You’re not the only one today.", tone: "EH" },
{ line: "This was bound to happen eventually.", tone: "EH" },
{ line: "It’s not really up to me.", tone: "EH" },
{ line: "I just pass these along.", tone: "EH" },
{ line: "It’s nothing personal. Or maybe it is.", tone: "EH" },
{ line: "This is just what the system does.", tone: "EH" },
{ line: "I don’t make the rules. I just read them.", tone: "EH" },
{ line: "It’s not a big deal unless you make it one.", tone: "EH" }
];

export function getStarterOpeningLineSet(caseCount) {
  // Adjust tone mix based on case count
  let selectedLines = [];

  if (caseCount === 1) {
    // First case: mostly neutral/professional
    selectedLines = openingLineBank.filter(line =>
      ["PRO", "EH"].includes(line.tone)
    ).slice(0, 5);
  } else if (caseCount === 2) {
    // Second case: introduce awkwardness
    selectedLines = openingLineBank.filter(line =>
      ["AWK", "PRO", "EH"].includes(line.tone)
    ).slice(0, 5);
  } else {
    // Later cases: mix in direct and funny
    selectedLines = openingLineBank.filter(line =>
      ["DAF", "LOL", "AWK", "EH"].includes(line.tone)
    ).slice(0, 5);
  }

  return selectedLines;
}
