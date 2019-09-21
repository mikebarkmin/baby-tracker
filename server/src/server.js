import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import socketIO from 'socket.io';
import connectDB from './database';

import modules from './modules';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { origins: '*:*' });
connectDB();

app.use(cors());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client')));
}

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

io.on('connection', socket => {
  modules.baby.handler(socket);
  modules.diaper.handler(socket);
  modules.food.handler(socket);
  modules.nursing.handler(socket);
  modules.sleep.handler(socket);
  modules.measurement.handler(socket);

  socket.on('error', error => {
    console.error(error);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `client/index.html`));
  });
}
