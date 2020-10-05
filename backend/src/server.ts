import { Clock } from "./sequencer/Clock.model";
import { NextFunction, Request, Response } from "express";
import { apiConfig } from "./app/config/api.config";
import { Metronome } from "node-metronome";
const express = require("express");
const socketIO = require("socket.io");

const bodyParser = require("body-parser");
var path = require("path");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req: any, res: any) => {
  let filepath = path.join("data/resources/images/gargouille-amboise.jpg");
  res.sendFile(filepath, { root: __dirname });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  // TODO: choose
  //res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const projectRoutes = require("./app/routes/project.routes");
const resourceRoutes = require("./app/routes/resource.routes");
const tracksPresetRoutes = require("./app/routes/track-preset.routes");
const configurationRoutes = require("./app/routes/configuration.routes");

app.use(apiConfig.apiRoot + "/project", projectRoutes);
app.use(apiConfig.apiRoot + "/resource", resourceRoutes);
app.use(apiConfig.apiRoot + "/track-preset", tracksPresetRoutes);
app.use(apiConfig.apiRoot + "/configuration", configurationRoutes);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(apiConfig.port, function () {
  console.log("app listening on port " + apiConfig.port);
});

module.exports = app;

// -----------------------------------

// const player = require('play-sound')();
// player.play('src/assets/metronome/metronom-beat.wav', (err: any) => {
//     if (err) console.log(`Could not play sound: ${err}`);
// });

// var sFile = 'hello.wav';

// // access the node child_process in case you need to kill it on demand
// var audio = player.play(sFile, function(err) {
//   if (err && !err.killed) throw err
// });

// setTimeout(function() {
//     audio.kill()
// }, 3000);

const clock = new Clock(100, () => {
  // console.log("tick");
});

// clock.start();

// var port = require('port');

// port({
// 	'read': 8004,
// 	'write': 8005,
// 	'basepath': 'C:\\wamp64\\www\\magiamerlini\\puredata',
// 	'flags': {
// 		'nogui': true,
// 		'stderr': true,
// 		'send': 'pd dsp 1, dsp 0',
// 		'path': 'relative/to/basepath',
// 		'open': 'patch.pd'
// 	}
// })
// .on('connect', function(){
// 	// this.write('Hello [netreceive]!;\n');
// })
// .on('data', function(data:any){
// 	console.log('data receiving from [netsend]', data);
// })
// .on('stderr', function(buffer:any){
// 	console.log(buffer.toString());
// })
// .create();

// const midi = require("midi");

// // Set up a new output.
// const output = new midi.Output();

// // Count the available output ports.
// output.getPortCount();

// // Get the name of a specified output port.
// output.getPortName(0);

// // Open the first available output port.
// output.openPort(0);

// // Send a MIDI message.
// output.sendMessage([176, 22, 1]);

// // Close the port when done.
// output.closePort();

// -----------------------

const http = require("http").createServer(app);
const io = socketIO(http);

// TODO: type
io.on("connection", (socket: any) => {
  console.log("user connected");

  socket.on("test", () => {
    console.log("test");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3001;

http.listen(port, () => {
  console.log(`started on port: ${port}`);
});


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

import ioClient from "socket.io-client";

setTimeout(() => {
  const socket = ioClient();

  socket.on("connect", () => {
    console.log(socket.connected); // true
    socket.emit("reconnect_attempt");
  });

  socket.on("disconnect", () => {
    console.log(socket.connected); // false
  });
}, 1000);

// var HOST = 'localhost';
// var PORT = 3000;

// // Create a server instance, and chain the listen function to it
// // The function passed to net.createServer() becomes the event handler for the 'connection' event
// // The sock object the callback function receives UNIQUE for each connection
// net.createServer(function(sock: any) {

//   // We have a connection - a socket object is assigned to the connection automatically
//   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

//   // Add a 'data' event handler to this instance of socket
//   sock.on('data', function(data: any) {
//     console.log(data.toString('utf-8'));
//     pd.write(data.toString('utf-8').charAt(0) + ';\n');
// 		//pd.write(data.toString('utf-8').charAt(0) + ' ' + data.toString('utf-8').charAt(1) + ';\n');
//   });

//   // Add a 'close' event handler to this instance of socket
//   sock.on('close', function(data) {
//     console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
//   });

//   sock.on('error', function(data) {
//     console.log('error has accured');
//   });

// }).listen(PORT, HOST);
