import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express(); // create a new server
console.log(process.cwd() + "/src/public");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/public", express.static(process.cwd() + "/src/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on ws://localhost:3000`);

//app.listen(3000); // port number

const httpServer = http.createServer(app); // I have access to server. I can create Websocket on top of this server
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomname, done) => {
    console.log(roomname);
    setTimeout(() => {
      done("hello this is from backend");
    }, 10000);
  });
});

httpServer.listen(3000, handleListen);
