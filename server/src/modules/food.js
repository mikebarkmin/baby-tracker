import { Schema, model } from 'mongoose';
import { eventHandler } from './';

export const schema = new Schema(
  {
    babyId: String,
    type: String,
    amount: Number,
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Model = model('Food', schema);

export function handler(socket) {
  eventHandler(socket, 'food', Model);
  socket.on('food/getTypes', function (callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;
    Model.find({ babyId })
      .distinct('type')
      .then((docs) => {
        callback({ msg: 'success', types: docs });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });
}

export default {
  schema,
  Model,
  handler,
};
