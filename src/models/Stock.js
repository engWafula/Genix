import {model, models, Schema} from "mongoose";

const StockSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        unique: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      category: {
        type: String,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 0,
      }
}, {timestamps: true});

export const Stock = models?.Stock || model('Stock', StockSchema);