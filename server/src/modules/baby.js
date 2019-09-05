import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import shortid from 'shortid';

const familyNames = [
  'Funkelndes Hippo',
  'Softer Löwe',
  'Lustige Giraffe',
  'Geschmeidiger Elefant',
  'Schlaue Maulwurf',
  'Sportliche Reh',
  'Schöne Fuchs',
  'Gewitzte Frosch',
  'Knurrige Hamster',
  'Weise Panda'
];

const roomsNames = {};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getFreeName(room) {
  let roomNames = [];
  if (roomNames.indexOf(room) > -1) {
    roomsNames = roomsNames[room];
  }

  let name = randomItem(familyNames);
  while (name in roomsNames) {
    name = randomItem(familyNames);
  }
  roomNames.push(name);
  roomsNames[room] = roomNames;
  return name;
}

function freeName(room, name) {
  let roomNames = roomsNames[room];
  if (roomNames) {
    roomsNames[room] = roomNames.filter(n => n !== name);
  }
}

export const schema = new Schema(
  {
    name: String,
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: 'invalid email'
      }
    },
    shortId: {
      type: String,
      default: shortid.generate
    }
  },
  {
    timestamps: true
  }
);

export const Model = model('Baby', schema);

export function handler(socket) {
  socket.baby = null;
  socket.name = null;

  socket.on('baby/create', function(name, callback) {
    const baby = new Model({ name });
    baby
      .save()
      .then(doc => {
        socket.emit('baby/new', { baby: doc });
        callback({ msg: 'success', baby: doc });
      })
      .catch(e => {
        console.log(e);
        callback({ msg: e });
      });
  });

  socket.on('baby/get', function(callback) {
    if (socket.baby !== null) {
      callback({ msg: 'success', baby: socket.baby });
    } else {
      callback({ msg: 'you need to join a baby first.' });
    }
  });

  socket.on('baby/update', function(baby) {
    if (socket.baby !== null) {
      socket.baby = {
        ...socket.baby,
        ...baby,
        ...socket.baby._id,
        ...socket.baby.shortId
      };
      socket.baby.save().then(() => {
        socket
          .to(socket.baby.shortId)
          .emit('baby/updated', { baby: socket.baby });
      });
    }
  });

  socket.on('baby/join', function(shortId, callback) {
    Model.findOne({ shortId })
      .then(baby => {
        socket.baby = baby;
        socket.name = getFreeName(shortId);
        socket.join(baby.shortId);
        socket.to(baby.shortId).emit('baby/joined', { name: socket.name });
        callback({ msg: 'success', baby });
      })
      .catch(() => {
        callback({ msg: 'baby not found' });
      });
  });

  socket.on('baby/leave', function(callback) {
    if (socket.baby !== null) {
      socket.leave(socket.baby.shortId);
    }
    callback({ msg: 'success' });
  });

  socket.on('disconnect', function() {
    if (socket.baby !== null) {
      socket.to(socket.baby.shortId).emit('baby/leaved', { name: socket.name });
      freeName(socket.baby.shortId, socket.name);
    }
  });
}

export default {
  schema,
  Model,
  handler
};
