import mongoose, { model, models, Schema } from "mongoose";


const SaleSchema = new Schema({
  item: { type: mongoose.Types.ObjectId, ref: 'MenuItem' },
  amount: {
    type: Number,
    required: true,
    min: 0,
  }}, {timestamps: true});

export const Sale = models?.Sale || model('Sale', SaleSchema);
