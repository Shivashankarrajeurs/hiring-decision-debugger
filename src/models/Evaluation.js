import mongoose from "mongoose";

const EvaluationSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },
    claims: [],
    evidence: [],
    ruleResults: [],
    finalDecision: {
      outcome: String,
      confidence: String,
      summary: String,
      missingEvidence: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Evaluation", EvaluationSchema);
