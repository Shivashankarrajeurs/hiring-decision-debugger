import { classifyEvidence } from "./evidenceStrength.js";
import { ACTION_VERBS } from "./claimExtractor.js";

export function validateClaims(claims, evidence, roleProfile) {
  if (!roleProfile?.claimDomains || !roleProfile?.evidenceMapping) {
    throw new Error("Invalid roleProfile");
  }

  return claims.map(claim => {
    const claimText = claim.sentence.toLowerCase();

    // 1️⃣ Detect ALL matching domains (FIX)
    const detectedDomains = Object.entries(roleProfile.claimDomains)
      .filter(([_, keywords]) =>
        keywords.some(keyword => claimText.includes(keyword))
      )
      .map(([domain]) => domain);

    // 2️⃣ Collect evidence matching ANY detected domain
    const relatedEvidence = evidence.filter(e =>
      detectedDomains.some(domain =>
        roleProfile.evidenceMapping[domain]?.includes(e.type)
      )
    );

    // 3️⃣ No evidence
  if (relatedEvidence.length === 0) {
  // Claim has domain + action → treat as weak claim
  if (detectedDomains.length > 0 && hasActionVerb(claimText)) {
    return {
      ...claim,
      status: "VAGUE",
      reason: "Claim contains implementation intent but lacks explicit supporting evidence"
    };
  }

  // Truly empty / buzzword claim
  return {
    ...claim,
    status: "UNVERIFIED",
    reason: "No domain-relevant evidence found"
  };
}


    // 4️⃣ Aggregate evidence strength
    const strengths = relatedEvidence.map(e =>
  classifyEvidence(e, roleProfile)
);

    const strongCount = strengths.filter(s => s === "STRONG").length;
    const weakCount = strengths.filter(s => s === "WEAK").length;

    if (strongCount >= 1 || weakCount >= 2) {
      return {
        ...claim,
        status: "SUPPORTED",
        reason: "Multiple domain-relevant implementation indicators support this claim"
      };
    }

    return {
      ...claim,
      status: "VAGUE",
      reason: "Evidence present but lacks sufficient implementation detail"
    };
  });
}


function hasActionVerb(text) {
  return ACTION_VERBS.some(verb => text.includes(verb));
}

