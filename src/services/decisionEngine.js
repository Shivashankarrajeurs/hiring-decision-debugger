export function applyDecisionRules(stats, rules) {
  for (const rule of rules) {
    if (rule.when(stats)) {
      return {
        decision: rule.decision,
        explanation: rule.explanation
      };
    }
  }

  // fallback safety
  return {
    decision: "REJECT",
    explanation: "No applicable decision rule matched."
  };
}
