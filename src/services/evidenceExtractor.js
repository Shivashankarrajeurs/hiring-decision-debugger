import { EVIDENCE_BUCKETS } from "../config/evidenceBuckets.js";

const PERFORMANCE_CAUSAL_VERBS = [
  "reduce",
  "improve",
  "optimize",
  "increase",
  "decrease"
];

export function extractEvidence(text) {
  const sentences = text
    .toLowerCase()
    .split(/[.\n]/)
    .map(s => s.trim())
    .filter(Boolean);

  const evidence = [];
   const performanceKeywords = EVIDENCE_BUCKETS.PERFORMANCE_METRIC;
  for (const sentence of sentences) {

    
    if (
       PERFORMANCE_CAUSAL_VERBS.some(v => sentence.includes(v)) &&
  performanceKeywords.some(k => sentence.includes(k))
    ) {
      evidence.push({
        type: "PERFORMANCE_METRIC",
        keywordsMatched: ["causal-performance"],
        sourceText: sentence
      });
    }

    // keyword-based extraction
    for (const [type, keywords] of Object.entries(EVIDENCE_BUCKETS)) {
      const matched = [];

      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        if (regex.test(sentence)) {
          matched.push(keyword);
        }
      }

      if (matched.length > 0) {
        evidence.push({
          type,
          keywordsMatched: matched,
          sourceText: sentence
        });
      }
    }
  }

  return evidence;
}
