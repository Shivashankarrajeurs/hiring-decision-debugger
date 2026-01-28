export const ACTION_VERBS = [
  "designed",
  "implemented",
  "created",
  "developed",
  "built",
  "deployed",
  "optimized",
  "configured",
  "reduced",
  "improved",
  "decreased",
  "increased",
  "scheduled"
];



export function extractClaims(text,roleProfile) {
  const sentences = text
    .toLowerCase()
    .split(/[.\n]/)
    .map(s => s.trim())
    .filter(Boolean);

  const claims = [];

  for (const sentence of sentences) {
    const hasVerb = ACTION_VERBS.some(v => sentence.includes(v));
    const matchedSkills = roleProfile.skills.filter(skill =>
      sentence.includes(skill)
    );

    // 🔹 1. Performance claim with metrics (NEW)
    if (
      hasVerb &&
      hasPerformanceMetric(sentence) &&
      hasComparison(sentence)
    ) {
      claims.push({
        type: "performance_impact",
        sentence,
        skills: []
      });
      continue;
    }

    // 🔹 Meta system / architecture claim
if (
  hasVerb &&
  roleProfile.claimDomains.SYSTEM_DESIGN?.some(k =>
    sentence.includes(k)
  )
) {
  claims.push({
    type: "system_design",
    sentence,
    skills: []
  });
  continue;
}


    // 🔹 2. Skill-based implementation claim (EXISTING)
    if (hasVerb && matchedSkills.length > 0) {
      claims.push({
        type: "skill_usage",
        sentence,
        skills: matchedSkills
      });
    }
  }

  return claims;
}


function hasPerformanceMetric(sentence) {
  return /\d+\s?(ms|s|sec|seconds|%)/i.test(sentence);
}

function hasComparison(sentence) {
  return /from\s+\d+.*to\s+\d+/i.test(sentence);
}
