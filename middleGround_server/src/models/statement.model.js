import mongoose from "mongoose";

const { Schema, model } = mongoose;



const statementSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "DisputeCase",
      required: true,
      index: true,
    },
    authorId: {
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
    version: {
      type: Number,
      required: true,
      min: 1,
    },
    visibility: {
      type: String,
      enum: ["PRIVATE_TO_SYSTEM", "SHARED_SUMMARY_ONLY", "SHARED_FULL"],
      default: "PRIVATE_TO_SYSTEM",
    },
    summaryText: {
      type: String,
      required: true,
      trim: true,
    },
    requestedRemedy: {
      type: String,
      required: true,
      trim: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

statementSchema.index(
  { caseId: 1, side: 1, version: 1 },
  { unique: true }
);

export const Statement = model("Statement", statementSchema);