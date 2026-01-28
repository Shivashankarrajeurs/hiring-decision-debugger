export function classifyEvidence(evidence, roleProfile) {
  const rules = roleProfile.evidenceStrengthRules?.[evidence.type];
  if (!rules) return "WEAK";

  const text = evidence.sourceText.toLowerCase();
  const numbers = text.match(/\d+/g);

  // 🔥 STRONG evidence rules
  if (
    rules.strongIf?.requiresNumbers &&
    numbers &&
    numbers.length >= 2
  ) {
    return "STRONG";
  }

  // 🟡 WEAK evidence rules
  if (
    rules.weakIf?.causalVerbs &&
    rules.weakIf.causalVerbs.some(v => text.includes(v))
  ) {
    return "WEAK";
  }

  if (rules.weakIf?.always) {
    return "WEAK";
  }

  return "WEAK";
}
