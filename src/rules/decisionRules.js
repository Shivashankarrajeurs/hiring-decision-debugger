export const decisionRules = [
  {
    name: "Strong match",
    when: stats => stats.supported >= 3,
    decision: "STRONG_MATCH",
    explanation: "Multiple critical claims are strongly supported by evidence."
  },
  {
    name: "Needs human review",
    when: stats => stats.supported >= 1 && stats.vague >= 1,
    decision: "NEEDS_HUMAN_REVIEW",
    explanation: "Some claims are supported, but others lack sufficient clarity."
  },

  {
    name: "Single strong claim",
    when: stats => stats.supported >= 1,
    decision: "NEEDS_HUMAN_REVIEW",
    explanation: "At least one technical claim is strongly supported and requires human evaluation."
  },
  {
    name: "Weak match",
    when: stats => stats.supported === 0 && stats.vague >= 1,
    decision: "WEAK_MATCH",
    explanation: "Claims exist but are weakly supported."
  },
  {
    name: "Reject",
    when: stats => stats.supported === 0 && stats.vague === 0,
    decision: "REJECT",
    explanation: "No verifiable technical claims were found."
  }
];
