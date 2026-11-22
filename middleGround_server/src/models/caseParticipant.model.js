import mongoose from "mongoose";

const { Schema, model } = mongoose;

const caseParticipantSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "DisputeCase",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    side: {
      type: String,
      enum: ["PARTY_A", "PARTY_B"],
      required: true,
    },
    intakeStatus: {
      type: String,
      enum: ["PENDING", "SUBMITTED", "REVISED"],
      default: "PENDING",
    },
    hasAcceptedCurrentProposal: {
      type: Boolean,
      default: false,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

caseParticipantSchema.index({ caseId: 1, userId: 1 }, { unique: true });
caseParticipantSchema.index({ caseId: 1, side: 1 }, { unique: true });

export const CaseParticipant = model("CaseParticipant", caseParticipantSchema);