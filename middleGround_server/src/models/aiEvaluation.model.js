import mongoose from "mongoose";

const { Schema, model } = mongoose;

const disputedPointSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    partyAClaim: {
      type: String,
      required: true,
      trim: true,
    },
    partyBClaim: {
      type: String,
      required: true,
      trim: true,
    },
    supportingEvidenceIds: {
      type: [Schema.Types.ObjectId],
      ref: "EvidenceItem",
      default: [],
    },
    missingInfo: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const aiEvaluationSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "DisputeCase",
      required: true,
      index: true,
    },
    stage: {
      type: String,
      enum: [
        "FACT_EXTRACTION",
        "CONTENTION_MAPPING",
        "PROPOSAL_GENERATION",
        "ESCALATION_DOSSIER",
      ],
      required: true,
      index: true,
    },
    modelName: {
      type: String,
      required: true,
      trim: true,
    },
    agreedFacts: {
      type: [String],
      default: [],
    },
    disputedPoints: {
      type: [disputedPointSchema],
      default: [],
    },
    unverifiedClaims: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

aiEvaluationSchema.index({ caseId: 1, stage: 1 });

export const AiEvaluation = model("AiEvaluation", aiEvaluationSchema);