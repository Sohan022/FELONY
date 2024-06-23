import mongoose from "mongoose";
const { Schema, model } = mongoose;
import optionSchema from "./option.js";

const questionSchema = new Schema(
  {
    desc: { type: String, required: true },
    maxTime: { type: Date },
    options: [optionSchema],
    correctOption: { type: String, required: true },
    scenario: { type: String },
    //    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  },
  { timestamps: true }
);

questionSchema.pre("save", function (next) {
  if (!this.maxTime) {
    const currentTime = new Date();
    this.maxTime = new Date(currentTime.getTime() + 30 * 1000); // 30 seconds from current time
  }
  next();
});

export const Question = model("Question", questionSchema);
