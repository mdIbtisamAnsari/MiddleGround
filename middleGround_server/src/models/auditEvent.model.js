import mongoose from "mongoose";

const { Schema, model } = mongoose;

const auditEventSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "DisputeCase",
      required: true,
      index: true,
    },
    actorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    eventType: {
      type: String,
      enum: [
        "CASE_CREATED",
        "STATEMENT_SUBMITTED",
        "EVIDENCE_UPLOADED",
        "AI_EVALUATION_COMPLETED",
        "PROPOSAL_CREATED",
        "PROPOSAL_ACCEPTED",
        "PROPOSAL_REJECTED",
        "CASE_ESCALATED",
        "CASE_RESOLVED",
      ],
      required: true,
    },
    summary: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditEvent = model("AuditEvent", auditEventSchema);