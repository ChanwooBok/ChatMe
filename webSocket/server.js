import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import express from "express";
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

const sockets = [];
// 한개의 브라우저만이 아닌, 모든 브라우저에서 메시지를 받아 볼 수 있도록 하려고 각종 브라우저와 연결된 소켓을 배열에 넣어두기 위함.

// backSocket : 연결된 브라우저를 뜻한다. : 프론트엔드와 백엔드의 real time communication
wss.on("connection", (backSocket) => {
  backSocket["nickname"] = "Anonymous"; // object에는 얼마든지 property 추가 할 수 있다.
  // socket의 property로 nickname 추가해주고 기본값으로 익명유저준다. 닉넴입력 안할 시, Anonymous로 나옴.
  console.log("Connected to Browser ✅ ");
  sockets.push(backSocket); // 각 브라우저에 연결된 소켓을 배열에 넣어두고 이후에 forEach로 각 브라우저로 메시지를 보내서 어디서든 볼 수 있게한다.

  backSocket.on("close", () => {
    console.log("Disconnected from the server !");
  });
  // JSON.stringify() -> javascript object 를 string으로 보내는 이유? : 백엔드에서 이해하지 못 할 수 있어서!
  // 만약, 백엔드서버는 Go server or JAVA server 라면? javascript object 를 이해하지 못하고 오류가 날 것이다.
  // 따라서, 무조건 string으로 일단 보내고나면, 백엔드서버에서 string으로 뭘 할지 그때가서 알아서 정한다.
  // JSON.parse() -> string -> object
  backSocket.on("message", (msg) => {
    // browser에서 온 msg는 string으로 왔다. stringify()
    const message = JSON.parse(msg); // string -> object
    switch (message.type) {
      case "new_message":
        sockets.forEach(
          (aSocket) =>
            aSocket.send(`${backSocket.nickname} : ${message.payload}`) // payload는 내용물 같은 느낌. 반면 type은 종류..
        );
      case "nickname":
        backSocket["nickname"] = message.payload; // nickname이 왔으면 socket이란 Object에 property로 추가해준다.
    }
  });
});

server.listen(3000, handleListen);
