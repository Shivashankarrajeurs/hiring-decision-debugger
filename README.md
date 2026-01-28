# Hiring Decision Debugger
An Explainable, Rule-Based Resume Evaluation Engine

## Overview

Most Applicant Tracking Systems (ATS) rely on keyword matching, which leads to:
- Buzzword-heavy resumes passing
- Strong but concise resumes getting rejected
- Zero transparency in hiring decisions

Hiring Decision Debugger takes a different approach.

Instead of asking:
> Does the resume contain keywords?

It asks:
> What technical claims does the candidate make, and what evidence supports them?

This project implements a claim–evidence–decision reasoning engine that evaluates resumes the way a senior engineer or interviewer would.


## Core Idea

The system evaluates resumes using explicit reasoning, not scoring or ML black boxes.

Every decision is based on:
- Technical claims extracted from the resume
- Evidence supporting those claims
- Role-specific rules defining what counts as strong or weak evidence
- A final decision that may still involve human judgment

This makes the system:
- Explainable
- Defensible
- Role-aware
- Human-aligned


## Architecture

Resume Text->Claim Extraction (role-aware)->Evidence Extraction (role-agnostic)->Claim Validation (role-specific rules)->Decision Engine->Decision + Confidence + Explanations


## Key Concepts

###  Claims

A claim is a concrete statement of technical work.

Valid claims:
- Implemented JWT authentication with role-based access control
- Reduced processing latency from 45 minutes to 12 minutes
- Built a configuration-driven rule engine without modifying core logic

Not valid claims:
- Worked on backend
- Used modern technologies
- Experienced in cloud platforms

Claims must show action and intent.


###  Evidence

Evidence answers how a claim is supported.

The system uses universal evidence buckets:
- DB_DESIGN
- API_DESIGN
- AUTH_MECHANISM
- SCALING_TECHNIQUE
- PERFORMANCE_METRIC
- ARCHITECTURE_DECISION

These buckets represent types of proof, not tools or buzzwords.


### Role Profiles (Config-Driven)

The core engine is domain-agnostic.

All role-specific logic lives in role profiles, which define:
- Claim domains
- Evidence mappings
- Evidence strength rules
- Skill vocabulary

Implemented roles:
- Backend Engineer
- Data Engineer

Adding a new role requires only a new configuration file and no changes to core logic.


###  Claim Validation

Each extracted claim is classified as:
- SUPPORTED – backed by sufficient evidence
- VAGUE – intent exists, evidence weak
- UNVERIFIED – no supporting evidence

Evidence strength is determined by role-specific policies.


###  Decision Engine

Final decisions are based on validated claims.

Possible outcomes:
- STRONG_MATCH
- NEEDS_HUMAN_REVIEW
- WEAK_MATCH
- REJECT

Each decision includes:
- A confidence level (HIGH / MEDIUM / LOW)
- A clear explanation
- Per-claim reasoning


##  Why NEEDS_HUMAN_REVIEW Is a Feature

This system does not aim for full automation.

When resumes contain:
- Strong architectural claims
- Aggregated weak evidence
- Context-dependent design decisions

The engine intentionally returns NEEDS_HUMAN_REVIEW.

This mirrors real hiring behavior where human judgment is required.


##  Example

Input (Data Engineer): "Built ETL pipelines to ingest data into an S3 data lake.Reduced data processing latency from 45 minutes to 12 minutes by optimizing Spark jobs."


Output:

```json
{
  "decision": "NEEDS_HUMAN_REVIEW",
  "confidence": "MEDIUM",
  "reason": "Some claims are strongly supported, while others require human judgment."
}


##  Tech Stack
- Node.js
- Express
- Modular rule engine (no ML, no black boxes)
- MongoDB schemas designed but persistence intentionally  deferred

What This Project Intentionally Avoids??
- Machine learning without explainability
- Resume scoring systems
- UI-heavy dashboards
- Keyword stuffing logic
This is a reasoning engine, not a UI product.

## Design Principles
- Explainability over automation
- Configuration over hardcoding
- Strict by default, relaxed only with justification
- Human judgment as a feature, not an error

## Test Coverage
The system has been validated against:
- Strong technical resumes
- Buzzword-only resumes
- Weak fresher profiles
- Mixed-evidence cases
- Backend and Data Engineer roles
- Architecture-heavy system design resumes
All scenarios produce predictable, defensible outcomes.

## Conclusion
Hiring Decision Debugger demonstrates:
- Real-world backend system design
- Rule-based reasoning
- Role-aware evaluation
- Explainable decision-making
- Strong judgment under ambiguity
It is intentionally not a UI application because hiring decisions are about thinking, not pixels.

## Author

Built by Shivashankar Raje Urs to showcase backend reasoning, system design, and explainable decision-making.

## Project Status

Complete and intentionally frozen.  
No further features planned.






