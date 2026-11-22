import mongoose from "mongoose";

const { Schema, model } = mongoose;

const evidenceItemSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "DisputeCase",
      required: true,
      index: true,
    },
    uploadedBy: {
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
    kind: {
      type: String,
      enum: [
        "IMAGE",
        "PDF",
        "CHAT_LOG",
        "RECEIPT",
        "LINK",
        "TEXT_EXHIBIT",
      ],
      required: true,
    },
    url: {
      type: String,
      trim: true,
    },
    geminiSummary: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const EvidenceItem = model("EvidenceItem", evidenceItemSchema);