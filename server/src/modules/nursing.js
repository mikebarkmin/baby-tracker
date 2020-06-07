import { Schema, model } from 'mongoose';
import { eventHandler } from './';

export const schema = new Schema(
  {
    babyId: String,
    date: { type: Date, default: Date.now },
    end: Date,
    breast: {
      type: String,
      enum: ['right', 'left', 'both'],
      default: 'right',
    },
    breastPosition: Number,
  },
  {
    timestamps: true,
  }
);

export const Model = model('Nursing', schema);

export function handler(socket) {
  eventHandler(socket, 'nursing', Model);
}
export default {
  schema,
  Model,
  handler,
};
