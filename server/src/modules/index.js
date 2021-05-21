import baby from './baby';
import diaper from './diaper';
import nursing from './nursing';
import sleep from './sleep';
import food from './food';
import measurement from './measurement';

export function eventHandler(socket, socketPrefix, Model) {
  socket.on(`${socketPrefix}/summary`, function (start, end, callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;

    if (start === null) {
      start = new Date();
      start.setHours(0, 0, 0, 0);
    }

    if (end === null) {
      end = new Date();
      end.setHours(23, 59, 59);
    }

    Model.find({ babyId, date: { $gte: start, $lte: end } })
      .sort({ date: -1 })
      .then((docs) => {
        let last = null;
        if (docs.length > 0) {
          last = docs[0];
        }

        callback({
          msg: 'success',
          summary: {
            number: docs.length,
            last,
            events: docs,
          },
        });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });

  socket.on(`${socketPrefix}/latest`, function (callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;
    Model.findOne({ babyId })
      .sort({ date: -1 })
      .then((doc) => {
        callback({ msg: 'success', event: doc });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });

  socket.on(`${socketPrefix}/get`, function (callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;
    Model.find({ babyId })
      .sort({ date: -1 })
      .limit(30)
      .then((docs) => {
        callback({ msg: 'success', events: docs });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });

  socket.on(`${socketPrefix}/getall`, function (callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;
    Model.find({ babyId })
      .sort({ date: -1 })
      .then((docs) => {
        callback({ msg: 'success', events: docs });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });

  socket.on(`${socketPrefix}/create`, function (eventData, callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;
    const event = new Model({ ...eventData, babyId });
    event
      .save()
      .then((doc) => {
        socket
          .to(socket.baby.shortId)
          .emit(`${socketPrefix}/created`, { event: doc });
        callback({ msg: 'success', event: doc });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });

  socket.on(`${socketPrefix}/delete`, function (id, callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;
    Model.deleteOne({ babyId, _id: id })
      .then(() => {
        socket.to(socket.baby.shortId).emit(`${socketPrefix}/deleted`, { id });
        callback({ msg: 'success' });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });

  socket.on(`${socketPrefix}/update`, function (id, event, callback) {
    if (!socket.baby) {
      callback({ msg: 'no baby' });
      return;
    }
    const babyId = socket.baby._id;
    Model.findOneAndUpdate({ babyId, _id: id }, event, { new: true })
      .then((doc) => {
        socket.to(socket.baby.shortId).emit(`${socketPrefix}/updated`, doc);
        callback({ msg: 'success', event: doc });
      })
      .catch((e) => {
        callback({ msg: e });
      });
  });
}

export default {
  baby,
  diaper,
  food,
  nursing,
  measurement,
  sleep,
};
