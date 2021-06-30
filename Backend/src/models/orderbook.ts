import G from '../types';
import { model, Schema } from "mongoose";

const orderBookSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    status: { type: String, required: true },
    main: { type: String, required: true },
    pair: { type: String, required: true },
    limit: { type: String, required: true },
    units: { type: String, required: true },
    direction: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
)

export const orderBookEntry = model<G.orderBookEntry>("orderbook", orderBookSchema);


