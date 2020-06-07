import { Schema, model } from 'mongoose';
import { eventHandler } from './';

export const schema = new Schema(
  {
    babyId: String,
    date: { type: Date, default: Date.now },
    height: Number,
    weight: Number,
    headCircumference: Number,
  },
  {
    timestamps: true,
  }
);

export const Model = model('Measurement', schema);

export function handler(socket) {
  eventHandler(socket, 'measurement', Model);
}

export default {
  schema,
  Model,
  handler,
};
