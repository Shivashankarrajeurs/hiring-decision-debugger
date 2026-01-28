export const DataEngineerRoleProfile = {
  role: "DATA_ENGINEER",

  skills: [
  "etl",
  "pipeline",
  "airflow",
  "spark",
  "s3",
  "data lake",
  "warehouse"
],


  // Claim domains 
  claimDomains: {
    PIPELINE: ["etl", "pipeline", "data ingestion", "batch job", "stream"],
    ORCHESTRATION: ["airflow", "dag", "scheduler"],
    STORAGE: ["s3", "data lake", "warehouse", "bigquery", "redshift"],
    PERFORMANCE: ["latency", "throughput", "processing time"],
     SYSTEM_DESIGN: [
    "engine",
    "system",
    "architecture",
    "rule engine",
    "evaluation engine",
    "pipeline",
    "framework"
  ]
  },

  // Evidence mapping 
  evidenceMapping: {
    PIPELINE: ["PIPELINE_DESIGN"],
    ORCHESTRATION: ["ORCHESTRATION_CONFIG"],
    STORAGE: ["DATA_STORAGE"],
    PERFORMANCE: ["PERFORMANCE_METRIC"],
    SYSTEM_DESIGN: ["ARCHITECTURE_DECISION"]
  },

  //  Evidence strength rules
  evidenceStrengthRules: {
    PIPELINE_DESIGN: {
      weakIf: { always: true }
    },

    ORCHESTRATION_CONFIG: {
      strongIf: {
        keywords: ["airflow", "dag"]
      }
    },

    DATA_STORAGE: {
      weakIf: { always: true }
    },

    ARCHITECTURE_DECISION: {
  weakIf: { always: true }
}
,

    PERFORMANCE_METRIC: {
      strongIf: {
        requiresNumbers: true
      },
      weakIf: {
        causalVerbs: ["reduce", "improve", "optimize"]
      }
    }
  }
};
