import { NextFunction, Request, Response } from "express";
import { apiConfig } from "./config/api.config";
import { Metronome } from "node-metronome";
const express = require("express");
const socketIO = require("socket.io");

const bodyParser = require("body-parser");
var path = require("path");

const app = express();
const http = require("http").createServer(app);
const io = socketIO(http);

// TODO: type
io.on("connection", (socket: any) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`started on port: ${port}`);
});

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

const projectRoutes = require("./routes/project.routes");
const resourceRoutes = require("./routes/resource.routes");
const tracksPresetRoutes = require("./routes/track-preset.routes");
const configurationRoutes = require("./routes/configuration.routes");

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
