import mongoose from "mongoose";
const { Schema, model } = mongoose;

const optionSchema = new Schema({
    key: { type: String, required: true },
    desc: { type: String, required: true }
});

export const Option = model('Option', optionSchema);
export default optionSchema;
