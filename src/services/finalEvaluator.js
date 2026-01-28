import { computeClaimStats } from "./claimStats.js";
import { applyDecisionRules } from "./decisionEngine.js";
import { decisionRules } from "../rules/decisionRules.js";
import { generateExplanations } from "./explanationGenerator.js";
import { determineConfidence } from "./confidenceEngine.js";

export function evaluateResume(validatedClaims) {
  //  Compute stats
  const stats = computeClaimStats(validatedClaims);

  //  Apply rule engine
  const decisionResult = applyDecisionRules(stats, decisionRules);

  //  Generate explanations
  const claimExplanations = generateExplanations(
    validatedClaims,
    decisionResult.decision
  );

  const confidence=determineConfidence(decisionResult.decision,stats);

  return {
    decision: decisionResult.decision,
    confidence,
    decisionExplanation: decisionResult.explanation,
    stats,
    claims: validatedClaims,
    explanations: claimExplanations
  };
}
