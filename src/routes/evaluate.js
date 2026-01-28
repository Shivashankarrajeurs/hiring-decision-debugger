import express from "express";
import Resume from "../models/Resume.js";
import Evaluation from "../models/Evaluation.js";


import { extractClaims } from "../services/claimExtractor.js";
import { extractEvidence } from "../services/evidenceExtractor.js";
import { validateClaims } from "../services/claimValidator.js";
import { BackendRoleProfile } from "../roles/backend.js";
import { DataEngineerRoleProfile } from "../roles/dataEngineer.js";
import { evaluateResume } from "../services/finalEvaluator.js";




const router = express.Router();

const ROLE_MAP = {
  BACKEND: BackendRoleProfile,
  DATA_ENGINEER: DataEngineerRoleProfile
};

router.post("/", async (req, res) => {
  try {
    const { role,resumeText } = req.body;

    

    if (!resumeText || typeof resumeText !== "string") {
      return res
        .status(400)
        .json({ error: "resumeText is required and must be a string" });
    }

    if (!role){
      return res.status(400).json({error:"role is required (BACKEND or DATA_ENGINEER)"})
    }

    const roleProfile = ROLE_MAP[role];

    // 1️⃣ Save Resume (raw input)
    // const resume = await Resume.create({
    //   rawText: resumeText,
    //   extractedSections: {
    //     experience: [],
    //     projects: [],
    //     skills: []
    //   }
    // });

    // 2️⃣ Extract claims
    const claims = extractClaims(resumeText,roleProfile);
    //console.log("Claims:")
    //console.log(claims)
    let evidence = extractEvidence(resumeText);
    //console.log("Evidence")
    //console.log(evidence)
    const validatedClaims = validateClaims(claims, evidence,roleProfile);
    console.log("Validation:");
    console.log(validatedClaims)

    const finalText=evaluateResume(validatedClaims);
    console.log("Result:")
    console.log(finalText);


    

    //console.log(claims);

    //console.log(evidence);
    

    // 3️⃣ Save Evaluation (derived judgment)
    // const evaluation = await Evaluation.create({
    //   resumeId: resume._id,
    //   claims,
    //   evidence,
    //   ruleResults: [],
    //   finalDecision: null
    // });

    res.json({
      finalText
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;