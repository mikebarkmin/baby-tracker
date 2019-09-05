import { Schema, model } from 'mongoose';
import { eventHandler } from './';

export const schema = new Schema(
  {
    babyId: String,
    date: { type: Date, default: Date.now },
    wakeup: Date
  },
  {
    timestamps: true
  }
);

export const Model = model('Sleep', schema);

export function handler(socket) {
  eventHandler(socket, 'sleep', Model);
}

export default {
  schema,
  Model,
  handler
};

