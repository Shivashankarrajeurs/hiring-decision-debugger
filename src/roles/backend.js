export const BackendRoleProfile = {




  role: "BACKEND",


  skills : [
  "node.js",
  "express",
  "mongodb",
  "jwt",
  "react",
  "aws",
  "docker"
],



  claimDomains: {
    AUTH: ["jwt", "authentication", "rbac"],
    DATABASE: ["mongodb", "schema", "index"],
    DEPLOYMENT: ["deploy", "aws", "ec2", "production"],
    API: ["api", "endpoint", "rest"],
    PERFORMANCE: ["latency", "cache", "redis"],
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

  evidenceMapping: {
    AUTH: ["AUTH_MECHANISM"],
    DATABASE: ["DB_DESIGN"],
    DEPLOYMENT: ["SCALING_TECHNIQUE"],
    API: ["API_DESIGN"],
    PERFORMANCE: ["PERFORMANCE_METRIC", "SCALING_TECHNIQUE"],
    SYSTEM_DESIGN: ["ARCHITECTURE_DECISION"]
  },

  // 
  evidenceStrengthRules: {
    PERFORMANCE_METRIC: {
      strongIf: {
        requiresNumbers: true
      },
      weakIf: {
        causalVerbs: ["reduce", "improve", "optimize", "increase", "decrease"]
      }
    },

    DB_DESIGN: {
      weakIf: {
        always: true
      }
    },

    AUTH_MECHANISM: {
      weakIf: {
        always: true
      }
    },

    SCALING_TECHNIQUE: {
      weakIf: {
        always: true
      }
    },

    ARCHITECTURE_DECISION: {
  weakIf: { always: true }
},


    API_DESIGN: {
      weakIf: {
        always: true
      }
    }
  }
};
