import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    rawText: {
      type: String,
      required: true
    },
    extractedSections: {
      experience: [String],
      projects: [String],
      skills: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
