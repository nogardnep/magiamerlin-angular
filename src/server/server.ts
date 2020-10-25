import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
// let socket2 : any;
// function setup() {
//   // Start a socket connection to the server
//   socket2 = io.connect('localhost' + ':3000');
// async function getISS() {
//     const response = await fetch(api_url);
//     const data = await response.json();
//     console.log(data.timeSeries[2].validTime);
//     var smhiData = {
//       pcat: data.timeSeries[2].parameters[2].level,
//       sunUp: 6,
//       sunDown: 20
//     };
//     socket.emit('smhiToPd', smhiData);
// }
// const ioClient = require("socket.io-client");
// const socket = ioClient("ws://example.com/my-namespace", {
//   reconnectionDelayMax: 10000,
//   query: {
//     auth: "123"
//   }
// });

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  // TODO: choose
  // res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    'Access-Control-Allow-Origin',
    config.url + ':' + config.frontendPort
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

const projectRoutes = require('./routes/project.routes');
const resourceRoutes = require('./routes/resource.routes');
const tracksPresetRoutes = require('./routes/track-preset.routes');
const configurationRoutes = require('./routes/configuration.routes');

app.use(makeRouteFor(config.routes.project), projectRoutes);
app.use(makeRouteFor(config.routes.resource), resourceRoutes);
app.use(makeRouteFor(config.routes.tracksPreset), tracksPresetRoutes);
app.use(makeRouteFor(config.routes.configuration), configurationRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});

app.listen(config.backendPort, () => {
  console.log('app listening on port ' + config.backendPort);
});

module.exports = app;

function makeRouteFor(path: string): string {
  return '/' + config.apiRoot + '/' + path;
}
