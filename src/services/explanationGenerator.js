// This file is ONLY responsible for explaining outcomes.
// It does NOT make decisions.

export function generateExplanations(validatedClaims, finalDecision) {
  const explanations = [];

  // 1️⃣ Claim-level explanations
  for (const claim of validatedClaims) {
    let explanationText = "";

    if (claim.status === "SUPPORTED") {
      explanationText =
        "This claim is supported by concrete, role-relevant implementation evidence.";
    } 
    else if (claim.status === "VAGUE") {
      explanationText =
        "This claim is mentioned, but the supporting evidence lacks sufficient implementation detail.";
    } 
    else if (claim.status === "UNVERIFIED") {
      explanationText =
        "This claim could not be verified because no relevant supporting evidence was found.";
    }

    explanations.push({
      claim: claim.sentence,
      status: claim.status,
      explanation: explanationText
    });
  }

  // 2️⃣ Final decision explanation (high-level)
  explanations.push({
    decision: finalDecision,
    explanation: getDecisionExplanation(finalDecision)
  });

  return explanations;
}

// ----------------------------------------
// Decision-level explanation helper
// ----------------------------------------
function getDecisionExplanation(decision) {
  if (decision === "STRONG_MATCH") {
    return "The resume contains multiple well-supported technical claims relevant to the role.";
  }

  if (decision === "NEEDS_HUMAN_REVIEW") {
    return "Some technical claims are supported, while others require human judgment due to incomplete evidence.";
  }

  if (decision === "WEAK_MATCH") {
    return "Technical experience is present, but claims lack sufficient depth or verification.";
  }

  if (decision === "REJECT") {
    return "The resume does not contain verifiable technical claims supported by evidence.";
  }

  return "No explanation available for this decision.";
}
