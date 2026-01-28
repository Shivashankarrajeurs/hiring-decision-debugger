export function determineConfidence(decision, stats) {
  if (decision === "STRONG_MATCH" && stats.supported >= 2) {
    return "HIGH";
  }

  if (decision === "NEEDS_HUMAN_REVIEW" && stats.supported >= 1) {
    return "MEDIUM";
  }

  if (decision === "WEAK_MATCH") {
    return "LOW";
  }

  if (decision === "REJECT") {
    return "LOW";
  }

  return "LOW"; // safe fallback
}
