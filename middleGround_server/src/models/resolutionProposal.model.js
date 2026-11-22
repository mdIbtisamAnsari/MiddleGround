import mongoose from "mongoose";

const { Schema, model } = mongoose;

const resolutionProposalSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "DisputeCase",
      required: true,
      index: true,
    },

    proposedBy: {
      type: String,
      enum: ["AI_MEDIATOR", "PARTY_A", "PARTY_B"],
      default: "AI_MEDIATOR",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "ACCEPTED", "REJECTED", "SUPERSEDED"],
      default: "ACTIVE",
      index: true,
    },
    termsSummary: {
      type: String,
      required: true,
      trim: true,
    },
    acceptedBy: {
      type: [String],
      enum: ["PARTY_A", "PARTY_B"],
      default: [],
    },
  },
  { timestamps: true }
);

resolutionProposalSchema.index({ caseId: 1 });

export const ResolutionProposal = model(
  "ResolutionProposal",
  resolutionProposalSchema
);