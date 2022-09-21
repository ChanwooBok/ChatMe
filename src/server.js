import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import express from "express";
import { Socket } from "dgram";
// SyntaxError: Cannot use import statement outside a module 에러발생
// 해결법 : package.json상단에 type:"module"적어주기.
// This will ensure that all .js and .mjs files are interpreted as ES modules
// 노드js의 기본모듈은 Common JS

const app = express(); // create a new server
console.log(process.cwd() + "/src/public");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/public", express.static(process.cwd() + "/src/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on ws://localhost:3000`);

//app.listen(3000); // port number

// 포트 3000에 브라우저와 웹소켓을 합쳐서 쓰고 싶다. (웹소켓만 따로 써도 무관함)
const server = http.createServer(app); // I have access to server. I can create Websocket on top of this server
const wss = new WebSocketServer({ server }); // 이렇게 함으로써 http , websocket서버 둘 다 돌릴 수 있음.

// backSocket : 연결된 브라우저를 뜻한다. : 프론트엔드와 백엔드의 real time communication
wss.on("connection", (backSocket) => {
  console.log("Connected to Browser !");
  backSocket.on("close", () => {
    console.log("Disconnected from the server !");
  });
  backSocket.on("message", (message) => {
    console.log("I've got a message from Browser : " + message.toString());
  });
  backSocket.send("hi browser I am server");
});

server.listen(3000, handleListen);
