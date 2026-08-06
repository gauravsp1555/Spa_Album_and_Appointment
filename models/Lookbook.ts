import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILookbook extends Document {
  title: string;
  icon: string;
  bgColor: string;
  createdAt?: Date;
}

const LookbookSchema: Schema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  bgColor: { type: String, required: true, default: "#ffffff" },
  createdAt: { type: Date, default: Date.now },
});

const Lookbook: Model<ILookbook> =
  mongoose.models.Lookbook || mongoose.model<ILookbook>("Lookbook", LookbookSchema);

export default Lookbook;
