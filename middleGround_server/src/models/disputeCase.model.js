import mongoose from "mongoose";

const { Schema, model } = mongoose;

const disputeCaseSchema = new Schema(
  {
    caseCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "refund",
        "freelance_deliverable",
        "rent_deposit",
        "service_contract",
        "other",
      ],
      default: "other",
      index: true,
    },
    status: {
      type: String,
      enum: [
        "DRAFT",
        "AWAITING_PARTIES",
        "IN_ANALYSIS",
        "PROPOSAL_ROUND",
        "AWAITING_SIGNATURES",
        "RESOLVED",
        "ESCALATED",
        "CLOSED",
      ],
      default: "DRAFT",
      index: true,
    },
    roundNumber: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const DisputeCase = model("DisputeCase", disputeCaseSchema);