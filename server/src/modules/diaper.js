import { Schema, model } from 'mongoose';
import { eventHandler } from './';

export const schema = new Schema(
  {
    babyId: String,
    date: { type: Date, default: Date.now },
    pee: Boolean,
    poop: Boolean,
    poopColor: Number,
  },
  {
    timestamps: true,
  }
);

export const Model = model('Diaper', schema);

export function handler(socket) {
  eventHandler(socket, 'diaper', Model);
}

export default {
  schema,
  Model,
  handler,
};
